import { Observable } from "rxjs"
import { Twitter } from "../types/twitter_type"

export function list(name: string): Observable<Twitter[]> {
	return Observable.ajax.get("/twitter/" + name, { "if-api": true })
		.map(res => res.response)
}