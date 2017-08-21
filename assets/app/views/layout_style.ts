import { style, cssRule } from "typestyle"
import { setupPage, normalize, fillParent, horizontal } from "csstips"

normalize()
setupPage("#root")

cssRule("a", {
	textDecoration: "none"
})

cssRule("*", {
	margin: 0,
	padding: 0
})

export const CONTAINER = style(fillParent, horizontal)
