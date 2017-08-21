import { Socket } from "phoenix"

export const socket = new Socket("/socket", {
	// logger: ((kind: any, msg: any, data: any) => { console.log(`${kind}: ${msg}`, data) })
})

// socket.onOpen((ev: any) => console.log("OPEN", ev))
// socket.onError((ev: any) => console.log("ERROR", ev))
// socket.onClose((e: any) => console.log("CLOSE", e))
