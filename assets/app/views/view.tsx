import * as React from "react"
import { BrowserRouter } from "react-router-dom"

import Layout from "./layout"

export default class Container extends React.Component<any, any> {
	public render() {
		return (
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		)
	}
}
