import * as firebase from "firebase"
import { Store } from "ractor"
import { system } from "../system"
import { TabChanged, Init, CloseSocket } from "../messages/hn"
import { IHNTopic } from "../types/hn_type"

firebase.initializeApp({ databaseURL: "hacker-news.firebaseio.com" })

export type HNState = {
  posts: IHNTopic[]
  tab: string,
  selectedKey: string
}

export class HNStore extends Store<HNState> {
  public state = { posts: [], tab: "newstories", selectedKey: "0" }
  private database: firebase.database.Database
  private app: firebase.database.Reference

  public preStart() {
    this.database = firebase.database()
    this.app = this.database.ref("/v0")
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(Init, () => {
        this.database.goOnline()
        this.receiveValues(this.state.tab)
      })
      .match(TabChanged, tabChanged => {
        this.setState({ posts: [], tab: tabChanged.tab, selectedKey: tabChanged.key })
        this.receiveValues(tabChanged.tab)
      })
      .match(CloseSocket, () => this.database.goOffline())
      .build()
  }

  public receiveValues(tab: string) {
    this.app.child(tab).off()
    this.app.child(tab).on("value", snapshot => {
      const ids: number[] = snapshot!.val()
      const promiseIds = ids.map(id => new Promise<IHNTopic>((resolve, reject) => {
        this.app.child("/item/" + id).off()
        this.app.child("/item/" + id).on("value", ss => resolve(ss!.val()))
      }))
      Promise
        .all(promiseIds)
        // 不知道怎么回事firebase第二次查询有可能返回null，先过滤掉
        .then(values => values.filter(value => value !== null))
        .then(values => this.setState({ posts: values }))
    })
  }
}