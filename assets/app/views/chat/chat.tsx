import * as React from "react"
import { Observable } from "rxjs"
import Store, { lift, inject, listen } from "meng"
import { TextField } from "office-ui-fabric-react"
import UsernameLayout from "./layout/username/username_layout"
import MainLayout from "./layout/main/main_layout"
import * as Style from "./chat_style"

import { connect } from "../../apis/chat_api"
import { TMessage } from "../../types/chat_type"

type Props = {
	messages: TMessage[]
	user: string
	setState(state: object): void
}

type Store = {
	user: string
}

const watchUser = (currentStcore: Props, nextStore: Props) =>
	currentStcore.user !== nextStore.user ? connect : null

@listen(watchUser, "messages")
@inject(Store, (currentState, rootStore: Store) => ({ user: rootStore.user }))
@lift({ messages: [] as TMessage[] }, "Chat")
export default class Chat extends React.Component<Props, {}> {
	public render() {
		const user = this.props.user
		const messages = this.props.messages
		return user ? <MainLayout user={user} messages={messages} /> : <UsernameLayout />
	}
}
