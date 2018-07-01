import * as React from "react"
import { Nav as Navv, INavLink } from "office-ui-fabric-react"
import { Push, HistoryStoreState } from "react-router-ractor"
import { Providers } from "ractor-react"
import { HistoryStore } from "../../stores/HistoryStore"
import { system } from "../../system"

import { groups } from "./nav_config"
import * as Style from "./nav_style"

@Providers([HistoryStore])
export default class Nav extends React.Component<Partial<HistoryStoreState>, {}> {
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

  private linkClick = (event?: React.MouseEvent<HTMLElement>, nav?: INavLink) => {
    event!.preventDefault()
    nav!.url.indexOf("http") === 0 ? location.href = nav!.url : system.dispatch(new Push(nav!.url))
  }
}