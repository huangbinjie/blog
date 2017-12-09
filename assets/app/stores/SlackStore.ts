import { Store } from "ractor"
import { system } from "../system"
import { list, user } from "../apis/slack_api"
import { FetchData } from "../messages/slack/FetchData"
import { NextPage } from "../messages/slack/NextPage"
import { MessageScroll } from "../messages/slack/MessageScroll"
import { Cache } from "../components/scroll"
import { ISlackListType, ISlackUserMessage, ISlackBotMessage, ISlackUserType, ISlackMember } from "../types/slack_type"

export type State = {
  messages: Array<ISlackUserMessage & ISlackBotMessage>
  users?: ISlackUserType
  latest: string
  channel: string,

  cache: Cache
  initialScrollTop: number
}

const outgoingBotIcon = "https://fst.slack-edge.com/12b5a/plugins/tester/assets/service_48.png"

export class SlackStore extends Store<State> {
  public state: State = {
    messages: [],
    latest: "0",
    channel: "C0PKC07FB",

    initialScrollTop: 0,
    cache: []
  }

  public createReceive() {
    return this.receiveBuilder()
      .match(FetchData, fetchData => {
        list(this.state.channel, this.state.latest)
          .map(response => response.messages)
          .combineLatest(user(), (messages, users) => ({ messages: this.mergeUser2Message(messages, users), users }))
          .subscribe(data => this.setState({ messages: data.messages, users: data.users }))
      })
      .match(NextPage, () => {
        const latest = this.state.messages[this.state.messages.length - 1].ts
        list(this.state.channel, this.state.latest)
          .map(response => this.mergeUser2Message(response.messages, this.state.users!))
          .subscribe(messages => this.setState({ messages: this.state.messages.concat(messages) }))
      })
      .match(MessageScroll, messageScroll => {
        this.state.initialScrollTop = messageScroll.scrollTop
      })
      .build()
  }

  public mergeUser2Message(messages: Array<ISlackUserMessage & ISlackBotMessage>, user: ISlackUserType) {
    return messages.map(message => {
      const userinfo = message.user ? user.members.find(member => member.id === message.user) : {
        name: message.username,
        profile: {
          image_48: message.icons ? message.icons.image_48 : outgoingBotIcon
        }
      } as ISlackMember
      message.user = userinfo!
      return message
    })
  }
}
