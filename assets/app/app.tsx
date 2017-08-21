import * as React from "react"
import { render } from "react-dom"
import Store from "meng"
import App from "./views/view"
import { socket } from "./socket/socket"

console.log("这是整个被meng托管的整个程序状态", Store)

socket.connect()

render(<App />, document.getElementById("root"))
