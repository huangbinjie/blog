import * as React from "react"
import { render } from "react-dom"
import { Provider } from "ractor-react"
import { createBrowserHistory } from "history"
import { Router } from "react-router"
import { createHistoryStore } from "react-router-ractor"
import { system } from "./system"
import { SlackStore } from "./stores/SlackStore"
import Layout from "./views/layout"
import { socket } from "./socket/socket"

socket.connect()

const history = createBrowserHistory()
const HistorySotre = createHistoryStore(history)

render(<Provider system={system} stores={[HistorySotre, SlackStore]}>
  <Router history={history}>
    <Layout />
  </Router>
</Provider>, document.getElementById("root"))
