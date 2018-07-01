import * as React from "react"
import { system } from "../../../system"
import { TabChanged } from "../../../messages/hn"
import { Pivot, PivotItem, PivotLinkSize } from "office-ui-fabric-react"


export default (selectedKey: string) =>
  <Pivot selectedKey={selectedKey} linkSize={PivotLinkSize.large} onLinkClick={linkClick}>
    <PivotItem linkText="newstories" itemKey="1"></PivotItem>
    <PivotItem linkText="topstories" itemKey="2"></PivotItem>
    <PivotItem linkText="beststories" itemKey="3"></PivotItem>
  </Pivot>

function linkClick(item?: PivotItem) {
  system.dispatch(new TabChanged(item!.props.linkText!, item!.props.itemKey!))
}
