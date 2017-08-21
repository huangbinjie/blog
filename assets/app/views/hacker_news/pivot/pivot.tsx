import * as React from "react"
import Store from "meng"
import { Pivot, PivotItem, PivotLinkSize } from "office-ui-fabric-react"


export default () =>
	<Pivot linkSize={PivotLinkSize.large} onLinkClick={linkClick}>
		<PivotItem linkText="newstories"></PivotItem>
		<PivotItem linkText="topstories"></PivotItem>
		<PivotItem linkText="beststories"></PivotItem>
	</Pivot>

function linkClick(item: PivotItem) {
	Store.children.HN.setState({ display: item.props.linkText, posts: null })
}
