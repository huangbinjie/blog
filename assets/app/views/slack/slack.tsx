import * as React from "react"
import Store, { lift, inject, listen } from "meng"
import Messages from "./messages/messages"
import Title from "./title/title"
import TextInput from "./textinput/textinput"
import Users from "./users/users"
import Flex from "../../components/flex/flex"
import * as Style from "./slack_style"

import { list, user, connect } from "../../apis/slack_api"
import { ISlackListType, ISlackUserType, ISlackUserMessage, ISlackBotMessage } from "../../types/slack_type"

type Props = {
	newmsg: Array<ISlackUserMessage & ISlackBotMessage>
	user: ISlackUserType
	post: ISlackListType
	latest: string
}

const listenList = (currentStore: Partial<Props>, nextStore: Partial<Props>) => {
	return currentStore.latest !== nextStore.latest ? list("C0PKC07FB", nextStore.latest!) : null
}

const listSelector = (state: ISlackListType, currentState: Props) => {
	const previousMessages = (currentState.post && currentState.post.messages) || []
	state.messages = previousMessages.concat(state.messages)
	return { post: state }
}

@inject(connect, "newmsg")
@listen(listenList, listSelector)
@inject(user, "user")
@lift({ latest: "0", newmsg: [] as Array<ISlackUserMessage & ISlackBotMessage> }, "Slack")
export default class Slack extends React.Component<Props, {}> {
	public render() {
		return (
			<div className={Style.SLACK}>
				<Title />
				<TextInput />
				<Flex flexGrow={1} flexDirection={"row"}>
					<Messages newmsg={this.props.newmsg} post={this.props.post} user={this.props.user} latest={this.props.latest} />
					<Users user={this.props.user} />
				</Flex>
			</div>
		)
	}
}
