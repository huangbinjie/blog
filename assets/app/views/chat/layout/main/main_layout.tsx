import * as React from "react"
import { lift, inject } from "meng"
import Stage from "../../stage/stage"
import Room from "../../room/room"
import * as Style from "./main_layout_style"
import { TMessage } from "../../../../types/chat_type"

type Props = {
	messages: TMessage[]
	user: string
}

export default class Main extends React.Component<Props, {}> {
	public render() {
		return (
			<div className={Style.MAIN}>
				<Stage />
				<Room user={this.props.user} messages={this.props.messages} />
			</div>
		)
	}
}
