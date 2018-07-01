import { Store } from "ractor"
import { list } from "../apis/reddit_api"
import { FetchRedditData } from "../messages/reddit/FetchRedditData"
import { IRedditListType } from "../types/reddit_type"
import { CallbagStore } from "ractor-callbag"
import { } from "callbag-basics"
import switchMap from "callbag-flat-map-operator"

export type RedditState = {
  posts: IRedditListType[]
  slag: string
}
export class RedditStore extends CallbagStore<RedditState> {
  public state = { posts: [], slag: "/r/javascript" }

  public createReceive() {
    return this.receiveBuilder()
      .match(FetchRedditData, fetchData$ => list(this.state.slag).then(data => this.setState({ posts: data.data.children })))
      .build()
  }
}
