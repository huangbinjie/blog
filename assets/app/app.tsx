import * as React from "react"
import { render } from "react-dom"
import { Provider } from "ractor-react"
import { system } from "./system"
import { SlackStore } from "./stores/SlackStore"
import App from "./views/view"
import { socket } from "./socket/socket"

socket.connect()

render(<Provider system={system} stores={[SlackStore]}><App /></Provider>, document.getElementById("root"))
