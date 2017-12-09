import * as firebase from "firebase"
import { Store } from "ractor"
import { system } from "../system"
import { TabChanged } from "../messages/hn/TabChanged"
import { IHNTopic } from "../types/hn_type"

firebase.initializeApp({ databaseURL: "hacker-news.firebaseio.com" })

export type State = {
  values: IHNTopic[]
  tab: string
}

export class HNStore extends Store<State> {
  public state = { values: [], tab: "newstories" }
  private database: firebase.database.Database
  private app: firebase.database.Reference

  public preStart() {
    this.database = firebase.database()
    this.app = this.database.ref("/v0")
    system.dispatch(new TabChanged(this.state.tab))
  }

  public postStop() {
    this.database.goOffline()
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(TabChanged, tabChanged => {
        this.app.child(tabChanged.tab).off()
        this.app.child(tabChanged.tab).on("value", snapshot => {
          const ids: number[] = snapshot!.val()
          const promiseIds = ids.map(id => new Promise<IHNTopic>((resolve, reject) => {
            this.app.child("/item/" + id).off()
            this.app.child("/item/" + id).on("value", ss => resolve(ss!.val()))
          }))
          Promise
            .all(promiseIds)
            // 不知道怎么回事firebase第二次查询有可能返回null，先过滤掉
            .then(values => values.filter(value => value !== null))
            .then(values => this.setState({ values }))
        })
      })
      .build()
  }
}