import * as React from "react"
import { render } from "react-dom"
import { Provider } from "ractor-react"
import { Router } from "react-router"
import { system } from "./system"
import { stores } from "./stores"
import { history } from "./stores/HistoryStore"
import Layout from "./views/layout"

render(
  <Provider system={system} stores={stores}>
    <Router history={history}>
      <Layout />
    </Router>
  </Provider>,
  document.getElementById("root")
)
