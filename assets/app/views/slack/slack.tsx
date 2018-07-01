import * as React from "react"
import { Providers } from "ractor-react"
import { system } from "../../system"
import { FetchSlackData } from "../../messages/slack/FetchSlackData"
import { SlackStore, State } from "../../stores/SlackStore"
import Messages from "./messages/messages"
import Title from "./title/title"
import Users from "./users/users"
import Flex from "../../components/flex/flex"
import * as Style from "./slack_style"

@Providers([SlackStore])
export default class Slack extends React.Component<State, {}> {
  public componentDidMount() {
    if (this.props.messages.length === 0) {
      system.dispatch(new FetchSlackData())
    }
  }
  public render() {
    return (
      <div className={Style.SLACK}>
        <Title />
        <Flex flexGrow={1} flexDirection={"row"} style={{ height: " 100%" }}>
          <Messages cache={this.props.cache} initialScrollTop={this.props.initialScrollTop} messages={this.props.messages} />
          {/* <Users user={this.props.users} /> */}
        </Flex>
      </div>
    )
  }
}
