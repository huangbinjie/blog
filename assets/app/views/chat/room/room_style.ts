import { style } from "typestyle"
import { width, height, padding, vertical, horizontal, centerCenter, flex1 } from "csstips"

export const ROOM = style(width(300), padding(10), vertical)

export const LIST = style(flex1, padding(10), {
	overflow: "auto"
})

export const FOOTER = style(horizontal, centerCenter, height(32), {
	$nest: {
		"& > div": {
			flex: 1,
			margin: 0,
			marginLeft: 10
		}
	}
})