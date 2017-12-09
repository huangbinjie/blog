import { Store } from "ractor"
import { system } from "../system"
import { list } from "../apis/reddit_api"
import { FetchData } from "../messages/reddit/FetchData"
import { IRedditListType } from "../types/reddit_type"

export type State = {
  data: IRedditListType[]
}
export class RedditStore extends Store<State> {
  public state = { data: [] }
  public preStart() {
    system.dispatch(new FetchData("/r/javascript"))
  }
  public createReceive() {
    return this.receiveBuilder()
      .match(FetchData, fetchData => {
        list(fetchData.slag).subscribe(data => this.setState({ data: data.data.children }))
      })
      .build()
  }
}
