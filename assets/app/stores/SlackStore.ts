import { Store } from "ractor"
import { system } from "../system"
import { list, user } from "../apis/slack_api"
import { FetchSlackData } from "../messages/slack/FetchSlackData"
import { NextPage } from "../messages/slack/NextPage"
import { MessageScroll } from "../messages/slack/MessageScroll"
import { Cache } from "react-iscroller"
import { ISlackListType, ISlackUserMessage, ISlackBotMessage, ISlackUserType, ISlackMember } from "../types/slack_type"

export type State = {
  messages: Array<ISlackUserMessage & ISlackBotMessage>
  users?: ISlackUserType
  latest: string
  channel: string,

  cache: Cache[]
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
      .match(FetchSlackData, fetchData => {
        Promise
          .all([list(this.state.channel, this.state.latest).then(response => response.messages), user()])
          .then(([messages, users]) => ({ messages: this.mergeUser2Message(messages, users), users }))
          .then(data => this.setState({ messages: data.messages, users: data.users, latest: data.messages.slice(-1)[0].ts }))
      })
      .match(NextPage, () => {
        list(this.state.channel, this.state.latest)
          .then(response => this.mergeUser2Message(response.messages, this.state.users!))
          .then(messages => this.setState({ messages: this.state.messages.concat(messages), latest: messages.slice(-1)[0].ts }))
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
