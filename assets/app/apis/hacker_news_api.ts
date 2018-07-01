// import { Observable, AjaxResponse } from "rxjs"
// import * as firebase from "firebase"

// firebase.initializeApp({ databaseURL: "hacker-news.firebaseio.com" })

// export const list = (page: string) => new Observable(observer => {
// 	const database = firebase.database()

// 	const app = database.ref("/v0")

// 	app.child(page).off()
// 	app.child(page).on("value", snapshot => {
// 		const ids: number[] = snapshot!.val()

// 		const promiseIds = ids.map(id => new Promise((resolve, reject) => {
// 			app.child("/item/" + id).off()
// 			app.child("/item/" + id).on("value", ss => resolve(ss!.val()))
// 		}))

// 		Promise
// 			.all(promiseIds)
// 			// 不知道怎么回事firebase第二次查询有可能返回null，先过滤掉
// 			.then(values => values.filter(value => value !== null))
// 			.then(values => observer.next(values))
// 			.catch(error => observer.error(error))

// 		return () => database.goOffline()
// 	})
// })
