import { Store } from "ractor"
import { list } from "../apis/reddit_api"
import { FetchRedditData } from "../messages/reddit/FetchRedditData"
import { IRedditListType } from "../types/reddit_type"
import { CallbagStore } from "ractor-callbag"
import { pipe, map, fromPromise } from "callbag-basics"
const switchMap = require("callbag-flat-map-operator")

export type RedditState = {
  posts: IRedditListType[]
  slag: string
}
export class RedditStore extends CallbagStore<RedditState> {
  public state = { posts: [], slag: "/r/javascript" }

  public createReceive() {
    return this.receiveBuilder()
      .match(FetchRedditData, fetchData$ =>
        pipe(
          fetchData$,
          switchMap((fetchData: object) => fromPromise(list(this.state.slag))),
          map((data: any) => ({ posts: data.data.children }))
        )
      )
      .build()
  }
}
