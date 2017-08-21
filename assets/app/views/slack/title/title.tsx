import * as React from "react"
import * as Style from "./title_style"

export default class Title extends React.Component<{}, {}> {
	public render() {
		return (
			<h3 className={Style.TITLE}>今日的五年二班</h3>
		)
	}
}
