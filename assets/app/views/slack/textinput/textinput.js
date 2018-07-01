"use strict";
// import * as React from "react"
// import { TextField } from "office-ui-fabric-react"
// import { push } from "../../../apis/slack_api"
// export default class TextInput extends React.Component<{}, { text: string }> {
// 	public state = { text: "" }
// 	public render() {
// 		return (
// 			<TextField
// 				placeholder="快和我们聊聊吧~"
// 				maxLength={100}
// 				onKeyDown={this.onEnter}
// 				onChanged={this.onChange}
// 				value={this.state.text} />
// 		)
// 	}
// 	public onChange = (value: string) => this.setState({ text: value })
// 	public onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
// 		const value = event.currentTarget.value
// 		if (value && event.keyCode === 13) {
// 			push(value)
// 			this.setState({ text: "" })
// 		}
// 	}
// }
