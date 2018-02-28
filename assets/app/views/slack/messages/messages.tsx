import * as React from "react"
import Store from "meng"
import { Spinner, SpinnerType } from "office-ui-fabric-react"
import { system } from "../../../system"
import { InfiniteScroller, Cache } from "react-iscroller"
import * as Style from "./message_style"
import { ISlackMember, ISlackUserMessage, ISlackBotMessage } from "../../../types/slack_type"
import { MessageScroll, NextPage } from "../../../messages/slack"

type Props = {
  cache: Cache[]
  initialScrollTop: number
  messages: Array<ISlackUserMessage & ISlackBotMessage>
}

export default class Messages extends React.Component<Props, {}> {
  private scrollTop: number
  private scrollerHeight = window.innerHeight - 69
  public componentWillUnmount() {
    system.dispatch(new MessageScroll(this.scrollTop))
  }
  public render() {
    return (
      <div className={Style.MESSAGES}>
        {!!this.props.messages.length && <InfiniteScroller
          containerHeight={this.scrollerHeight}
          itemAverageHeight={48}
          items={this.props.messages}
          itemKey="ts"
          onRenderCell={this.renderCell}
          onScroll={div => this.scrollTop = div.scrollTop}
          onEnd={() => system.dispatch(new NextPage())}
          initialScrollTop={this.props.initialScrollTop}
          cache={this.props.cache} />}
        {!this.props.messages.length && <Spinner type={SpinnerType.large} label="正在努力加载中..." />}
      </div>
    )
  }

  public renderCell(message: ISlackUserMessage & ISlackBotMessage, index: number) {
    const userinfo = message.user as ISlackMember
    return (
      <li key={message.ts} className={Style.LIST_ITEM}>
        <img className={Style.LIST_AVATAR} src={userinfo.profile.image_48} />
        <div className={Style.LIST_CONTENT}>
          <header>{userinfo.name} {index}</header>
          <main>{message.text}</main>
        </div>
      </li>
    )
  }
}
