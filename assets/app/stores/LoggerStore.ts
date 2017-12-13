import { Store } from "ractor"

export class LoggerStore extends Store<{}> {
  public preStart() {
    this.context.system.eventStream.onAny((_, obj) => {
      const date = new Date()
      console.info(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), obj)
    })
  }
  public createReceive() {
    return this.receiveBuilder().build()
  }
}
