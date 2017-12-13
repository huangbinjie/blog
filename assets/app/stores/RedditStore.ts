import { Store } from "ractor"
import { list } from "../apis/reddit_api"
import { FetchData } from "../messages/reddit/FetchData"
import { IRedditListType } from "../types/reddit_type"

export type RedditState = {
  posts: IRedditListType[]
  slag: string
}
export class RedditStore extends Store<RedditState> {
  public state = { posts: [], slag: "/r/javascript" }

  public createReceive() {
    return this.receiveBuilder()
      .match(FetchData, fetchData => list(this.state.slag).subscribe(data => this.setState({ posts: data.data.children })))
      .build()
  }
}
