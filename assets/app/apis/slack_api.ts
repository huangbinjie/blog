import { Observable, Subject } from "rxjs"
import { ISlackListType, ISlackUserType } from "../types/slack_type"
import { socket } from "../socket/socket"

const input$ = new Subject()

export const connect = new Observable(observer => {
	const channel = socket.channel("slack:lobby", {})
	channel.join()
		.receive("ok", resp => console.info("已连接slack频道"))
		.receive("error", resp => observer.error(resp.response))
	channel.on("new:msg", payload => observer.next(payload))
	const subscription = input$.subscribe(msg => channel.push("new:msg", msg))
	return () => {
		channel.leave()
		subscription.unsubscribe()
	}
})
	.scan((acc: Array<object>, x) => [x, ...acc], [])

export const push = (message: string) => input$.next(message)

export const list = (channel: string, latest: string) =>
	Observable
		.ajax
		.get(`/slack?channel=${channel}&latest=${latest}`, { "if-api": true })
		.map(response => response.response)

export const user = () =>
	Observable
		.ajax
		.get("/slack/user", { "if-api": true })
		.map(response => response.response)
