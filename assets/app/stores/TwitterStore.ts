import { CallbagStore } from "ractor-callbag"
import { FetchTwitterUser } from "../messages/twitter/FetchTwitterUser"
import { pipe, fromPromise, map, filter } from "callbag-basics"
const switchMap = require("callbag-flat-map-operator")
import { list } from "../apis/twitter_api"
import { Twitter } from "../types/twitter_type"

export class TwitterStore extends CallbagStore<{ tweets: Twitter[] }> {
  public state = { tweets: [], name: "" }
  public createReceive() {
    return this.receiveBuilder()
      .match(FetchTwitterUser, user$ => pipe(
        user$,
        filter((user: FetchTwitterUser) => user.name !== this.state.name),
        switchMap((user: FetchTwitterUser) => pipe(
          fromPromise(list(user.name)),
          map((tweets: Twitter[]) => ({ tweets, name: user.name }))
        ))
      ))
      .build()
  }
}