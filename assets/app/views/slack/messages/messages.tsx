import * as React from "react"
import Store from "meng"
import { Spinner, SpinnerType } from "office-ui-fabric-react"
import { system } from "../../../system"
import { InfiniteScroll, Cache } from "../../../components/scroll"
import * as Style from "./message_style"
import { ISlackMember, ISlackUserMessage, ISlackBotMessage } from "../../../types/slack_type"
import { MessageScroll } from "../../../messages/slack/MessageScroll"

type Props = {
  cache: Cache
  initialScrollTop: number
  messages: Array<ISlackUserMessage & ISlackBotMessage>
}

export default class Messages extends React.Component<Props, {}> {
  public render() {
    return (
      <div className={Style.MESSAGES}>
        <InfiniteScroll
          containerHeight={window.innerHeight - 69}
          itemAverageHeight={48}
          items={this.props.messages}
          onRenderCell={this.renderCell}
          onScroll={div => system.dispatch(new MessageScroll(div.scrollTop))}
          initialScrollTop={this.props.initialScrollTop}
          cache={this.props.cache} />
        {!this.props.messages.length && <Spinner type={SpinnerType.large} label="正在努力加载中..." />}
      </div>
    )
  }

  public renderCell(message: ISlackUserMessage & ISlackBotMessage) {
    const userinfo = message.user as ISlackMember
    return (
      <li key={message.ts} className={Style.LIST_ITEM}>
        <img className={Style.LIST_AVATAR} src={userinfo.profile.image_48} />
        <div className={Style.LIST_CONTENT}>
          <header>{userinfo.name}</header>
          <main>{message.text}</main>
        </div>
      </li>
    )
  }
}
