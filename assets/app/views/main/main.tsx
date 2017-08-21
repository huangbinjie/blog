import * as React from "react"
import * as Emoji from "../../components/emotion"

import * as Style from "./main_style"

export default class Main extends React.Component<void, {}> {
	public render() {
		return (
			<div className={Style.MAIN}>おかえりなさい<Emoji.Interesting />
				<a href="http://www.reactivemanifesto.org/">
					<img
						style={{ border: 0, position: "fixed", right: 0, top: 0, zIndex: 9000 }}
						src="//d379ifj7s9wntv.cloudfront.net/reactivemanifesto/images/ribbons/we-are-reactive-white-right.png" />
				</a>
			</div>
		)
	}
}
