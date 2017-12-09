import * as React from "react"
import { style } from "typestyle"
import { flex } from "csstips"

type Props = {
	flex?: string
	flexAlign?: "center"
	flexBasis?: number
	flexDirection?: "row" | "column"
	flexGrow?: number
	flexWrap?: "wrap" | "nowrap"
	children?: React.ReactNode[]
	style?: React.CSSProperties
}

export default function Flex(props: Props) {
	const css = {
		flex: props.flex,
		flexAlign: props.flexAlign,
		flexBasis: props.flexBasis,
		flexDirection: props.flexDirection,
		flexGrow: props.flexGrow,
		flexWrap: props.flexWrap
	}
	return <div className={style(flex)} style={props.style || {}}>{props.children}</div>
}
