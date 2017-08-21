import * as React from "react"
import { lift, inject, listen } from "meng"
import { FocusZone, FocusZoneDirection, List, TextField, Spinner, SpinnerType } from "office-ui-fabric-react"
import Title from "./title/title"
import Pivot from "./pivot/pivot"
import Topics from "./topics/topics"
import { list } from "../../apis/hacker_news_api"
import { IHNTopic } from "../../types/hn_type"

type Props = {
	posts: IHNTopic[]
	display: string
}

const watchDisplayApi = (currentStore: Props, nextStore: Props) =>
	currentStore.display !== nextStore.display ? list(nextStore.display) : null

@listen(watchDisplayApi, "posts")
@lift({ display: "newstories" }, "HN")
export default class HN extends React.Component<Props, {}> {
	public render() {
		return (
			<FocusZone direction={FocusZoneDirection.vertical}>
				<Title />
				<Pivot />
				<Topics posts={this.props.posts} />
			</FocusZone>
		)
	}
}
