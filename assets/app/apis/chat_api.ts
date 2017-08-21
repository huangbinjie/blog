import { socket } from "../socket/socket"
import { Observable, Subject } from "rxjs"

const input$ = new Subject()

export const connect = new Observable(observer => {
	const channel = socket.channel("chat:lobby", {})
	channel.join()
		.receive("ok", resp => console.info("已连接聊天室"))
		.receive("error", resp => observer.error(resp.response))
	channel.on("new:msg", payload => observer.next(payload))
	const subscription = input$.subscribe(msg => channel.push("new:msg", msg))
	return () => {
		channel.leave()
		subscription.unsubscribe()
	}
})
	.scan((acc: Array<object>, x) => [...acc, x], [])

export const push = (user: string, body: string) => input$.next({ user, body })
