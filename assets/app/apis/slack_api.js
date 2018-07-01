"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const input$ = new Subject()
// export const connect = new Observable(observer => {
//   const channel = socket.channel("slack:lobby", {})
//   channel.join()
//     .receive("ok", resp => console.info("已连接slack频道"))
//     .receive("error", resp => observer.error(resp.response))
//   channel.on("new:msg", payload => observer.next(payload))
//   const subscription = input$.subscribe(msg => channel.push("new:msg", msg))
//   return () => {
//     channel.leave()
//     subscription.unsubscribe()
//   }
// })
//   .scan((acc: Array<object>, x) => [x, ...acc], [])
// export const push = (message: string) => input$.next(message)
exports.list = (channel, latest) => fetch(`/slack?channel=${channel}&latest=${latest}`, {
    method: "GET",
    headers: {
        "if-api": "true"
    }
})
    .then(res => res.json());
exports.user = () => fetch("/slack/user", {
    method: "GET",
    headers: {
        "if-api": "true"
    }
})
    .then(res => res.json());
