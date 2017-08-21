import { style } from "typestyle"
import { flex, horizontal, center, flex1 } from "csstips"

export const LI = style(flex, horizontal, center, {
	margin: "20px 0"
})

export const LI_UPS = style({
	minWidth: "40px",
	marginRight: "5px",
	fontSize: "21px",
	lineHeight: 1,
	textAlign: "center",
	color: "#30A9DE"
})

export const LI_NUM = style({
	width: "40px",
	textAlign: "center",
	color: "#d3d3d3"
})

export const LI_CONTENT = style(flex1)

export const LI_CONTENT_HEADER = style({
	marginBottom: "8px"
})
export const LI_CONTENT_TITLE = style({
	fontSize: "18px",
	fontWeight: 700
})
export const LI_CONTENT_DOMAIN = style({
	color: "#888"
})
