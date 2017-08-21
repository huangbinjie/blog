import * as React from "react"
import Store from "meng"
import { TextField } from "office-ui-fabric-react"

import * as Style from "./username_layout_style"

export default () =>
	<div className={Style.USERNAME}>
		<TextField
			placeholder="皮皮虾我们走"
			maxLength={10}
			required
			label="昵称"
			onKeyDown={onEnter}
		/>
	</div>

function onEnter(event: React.KeyboardEvent<HTMLInputElement>) {
	if (event.keyCode === 13) {
		Store.setState({ user: event.currentTarget.value })
	}
}
