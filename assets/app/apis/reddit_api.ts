import { Observable, AjaxResponse } from "rxjs"
import { ajax } from "rxjs/observable/dom/ajax"

export const list = ajax.get("/reddit/r/javascript", { "if-api": true }).map(response => response.response)
