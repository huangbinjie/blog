import { createBrowserHistory } from "history"
import { createHistoryStore } from "react-router-ractor"

export const history = createBrowserHistory()
export const HistorySotre = createHistoryStore(history)
