import * as React from "react"
import Store from "meng"
import { Spinner, SpinnerType } from "office-ui-fabric-react"
import * as Style from "./message_style"
import { ISlackListType, ISlackUserType, ISlackUserMessage, ISlackBotMessage } from "../../../types/slack_type"

const outgoingBotIcon = "https://fst.slack-edge.com/12b5a/plugins/tester/assets/service_48.png"

type Props = {
	newmsg: Array<ISlackUserMessage & ISlackBotMessage>
	user: ISlackUserType
	post: ISlackListType
	latest: string
}

export default class Messages extends React.Component<Props, {}> {
	public render() {
		const newmsg = this.props.newmsg
		const user = this.props.user
		const post = this.props.post
		const mergedList = user && post && newmsg.concat(post.messages).map(message => {
			const userinfo = message.user ? user.members.find(member => member.id === message.user) : {
				name: message.username,
				profile: {
					image_48: message.icons ? message.icons.image_48 : outgoingBotIcon
				}
			}
			return (
				<li key={message.ts} className={Style.LIST_ITEM}>
					<img className={Style.LIST_AVATAR} src={userinfo!.profile.image_48} />
					<div className={Style.LIST_CONTENT}>
						<header>{userinfo!.name}</header>
						<main>{message.text}</main>
					</div>
				</li>
			)
		})
		return (
			<div className={Style.MESSAGES}>
				<ul>{mergedList}</ul>
				{!mergedList && <Spinner type={SpinnerType.large} label="正在努力加载中..." />}
			</div>
		)
	}

	private onEnd = () => {
		if (this.props.post.has_more) {
			const messages = this.props.post.messages
			const latest = messages[messages.length - 1].ts
			Store.children.Slack.setState({ latest })
		}
	}
}
