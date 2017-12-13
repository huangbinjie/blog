import { Observable, AjaxResponse } from "rxjs"
import { ajax } from "rxjs/observable/dom/ajax"
import { IRedditType } from "../types/reddit_type"

export const list = (slag: string): Observable<IRedditType> =>
  ajax.get("/reddit/r/javascript", { "if-api": true }).map(response => response.response)
