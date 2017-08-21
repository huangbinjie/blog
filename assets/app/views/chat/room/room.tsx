import * as React from "react"
import { Label, TextField, List } from "office-ui-fabric-react"
import * as Style from "./room_style"

import { push } from "../../../apis/chat_api"
import { TMessage } from "../../../types/chat_type"

type Props = {
	messages: TMessage[]
	user: string
}

type State = {
	text: string
}

export default class Room extends React.Component<Props, State> {
	public state = { text: "" }
	private main: HTMLElement

	public componentDidUpdate(prevProps: Props) {
		if (this.props.messages.length !== prevProps.messages.length) {
			this.main.scrollTop = this.main.scrollHeight
		}
	}
	public render() {
		const messages = this.props.messages.map((message, index) =>
			<section key={index}>
				<Label style={{ display: "inline-block" }}>{message.user}</Label>
				<span>: {message.body}</span>
			</section>
		)
		return (
			<div className={Style.ROOM}>
				<main className={Style.LIST} ref={main => this.main = main!}>{messages}</main>
				<footer className={Style.FOOTER}>
					<Label>{this.props.user}</Label>
					<TextField onKeyDown={this.onEnter} maxLength={20} value={this.state.text} />
				</footer>
			</div>
		)
	}

	private onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const textNode = event.currentTarget
		if (event.keyCode === 13 && textNode.value) {
			push(this.props.user, textNode.value.trim())
			this.setState({ text: "" })
		}
	}
}
