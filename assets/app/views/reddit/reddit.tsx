import * as React from "react"
import { lift, inject } from "meng"
import { FocusZone, FocusZoneDirection, List, TextField, Spinner, SpinnerType, Link } from "office-ui-fabric-react"
import Space from "../../components/space/space"
import { list } from "../../apis/reddit_api"
import { IRedditType, IRedditListType } from "../../types/reddit_type"
import { friendlyDate } from "../../utils/unix_time_to_date"
import * as Style from "./reddit_style"

const hostname = "https://www.reddit.com"

type Props = {
	posts: IRedditType
}

@inject(list, "posts")
@lift({ posts: {} }, "Reddit")
export default class Reddit extends React.Component<Props, {}> {
	public render() {
		const list = this.props.posts.data ? this.props.posts.data.children : null
		return (
			<FocusZone direction={FocusZoneDirection.vertical}>
				<TextField defaultValue="/r/javascript" label="频道" />
				{!list && <Spinner type={SpinnerType.large} label="正在努力加载中..." />}
				{list && <List items={list} onRenderCell={this.renderCell} />}
			</FocusZone>
		)
	}

	private renderCell = (item: IRedditListType, index: number) => {
		return (
			<div key={item.data.id} className={Style.LI}>
				<div className={Style.LI_NUM}>{index + 1}</div>
				<div className={Style.LI_UPS}>{item.data.ups}</div>
				<div className={Style.LI_CONTENT}>
					<header className={Style.LI_CONTENT_HEADER}>
						<Link className={Style.LI_CONTENT_TITLE} href={item.data.url}>{item.data.title}</Link>
						<Space num={3} />
						<Link
							className={Style.LI_CONTENT_DOMAIN}
							href={`${hostname}/domain/` + item.data.domain}>
							<small>({item.data.domain})</small>
						</Link>
					</header>
					<footer>
						post by {item.data.author}
						<Space />|<Space />
						{item.data.num_comments}
						<Space />
						<Link href={hostname + item.data.permalink}>comments</Link>
						<Space />|<Space />
						{friendlyDate(item.data.created_utc)}
					</footer>
				</div>
			</div>
		)
	}
}
