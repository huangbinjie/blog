declare module "react-router" {
	export interface IMatch {
		isExact: boolean
		params: { [key: string]: string }
		path: string
		url: string
	}

	export interface ILocation {
		hash: string
		key: string
		pathname: string
		search: string
		state: object
	}

	export interface IHistory {
		push: (url: string) => void
	}

	type mixinRouter = IMatch & ILocation & IHistory

	export interface IWithRouter {
		match: IMatch
		location: ILocation
		history: IHistory
	}

	export function withRouter<T, C>(conponent: any): new (props?: T, context?: C) => any
}