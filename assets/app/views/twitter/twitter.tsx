import * as React from "react"
import { lift, listen, error } from "meng"
import { list } from "../../apis/twitter_api"
import { Twitter } from "../../types/twitter_type"
import { Message } from "./message/message"
import { withRouter, IWithRouter } from "react-router"
import * as style from "./twitter_style"

@error(console.log)
@listen<Props>((currentStore, nextStore) =>
	!currentStore.match || currentStore.match.params.name !== nextStore.match!.params.name
		? list(nextStore.match!.params.name)
		: null
	, "tweets")
@lift({ tweets: [] as Twitter[] })
@withRouter
export default class TwitterView extends React.Component<Props, {}> {
	public render() {
		return (
			<div className={style.TWITTER}>
				<ul>
					{this.props.tweets.map(tweet => <Message key={tweet.id_str} tweet={tweet} />)}
				</ul>
			</div>
		)
	}
}

type Props = {
	tweets: Twitter[]
} & IWithRouter
