import * as React from "react"
import { Nav as Navv, INavLink } from "office-ui-fabric-react"
import { Link } from "react-router-dom"
import { withRouter, IWithRouter } from "react-router"

import { groups } from "./nav_config"
import * as Style from "./nav_style"

@withRouter
export default class Nav extends React.Component<Partial<IWithRouter>, {}> {
	public render() {
		const pathname = this.props.location!.pathname.substr(1)
		return (
			<Navv
				className={Style.NAV}
				groups={groups}
				selectedKey={pathname}
				onLinkClick={this.linkClick}
			/>
		)
	}

	private linkClick = (event: React.MouseEvent<HTMLDivElement>, nav: INavLink) => {
		event.preventDefault()
		nav.url.indexOf("http") === 0 ? location.href = nav.url : this.props.history!.push(nav.url)
	}
}
