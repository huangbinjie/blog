import { style } from "typestyle"
import { flex, fillParent, vertical, horizontal } from "csstips"

export const MESSAGES = style(flex, {
  height: "100%"
})

export const LIST = style(flex, fillParent)

export const LIST_ITEM = style(flex, horizontal, {
  padding: "10px 0"
})

export const LIST_AVATAR = style({
  width: "48px",
  height: "48px",
  marginRight: "10px",
  borderRadius: "50%"
})

export const LIST_CONTENT = style(flex, {
  $nest: {
    header: {
      color: "#666"
    },
    main: {
      lineHeight: "30px",
      color: "#333",
      whiteSpace: "pre-wrap"
    }
  }
})
