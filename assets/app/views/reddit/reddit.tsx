import * as React from "react"
import { FocusZone, FocusZoneDirection, List, TextField, Spinner, SpinnerType, Link } from "office-ui-fabric-react"
import { Providers } from "ractor-react"
import { system } from "../../system"
import { FetchData } from "../../messages/reddit"
import { RedditState, RedditStore } from "../../stores/RedditStore"
import Space from "../../components/space/space"
import { IRedditType, IRedditListType } from "../../types/reddit_type"
import { friendlyDate } from "../../utils/unix_time_to_date"
import * as Style from "./reddit_style"

@Providers([RedditStore])
export default class Reddit extends React.Component<RedditState, {}> {
  public componentDidMount() {
    system.dispatch(new FetchData())
  }
  public render() {
    return (
      <FocusZone direction={FocusZoneDirection.vertical}>
        <TextField value={this.props.slag} label="频道" />
        {!this.props.posts.length && <Spinner type={SpinnerType.large} label="正在努力加载中..." />}
        {!!this.props.posts.length && <List items={this.props.posts} onRenderCell={this.renderCell} />}
      </FocusZone>
    )
  }

  private renderCell = (item: IRedditListType, index?: number) => {
    return (
      <div key={item.data.id} className={Style.LI}>
        <div className={Style.LI_NUM}>{index! + 1}</div>
        <div className={Style.LI_UPS}>{item.data.ups}</div>
        <div className={Style.LI_CONTENT}>
          <header className={Style.LI_CONTENT_HEADER}>
            <Link className={Style.LI_CONTENT_TITLE} href={item.data.url}>{item.data.title}</Link>
            <Space num={3} />
            <Link
              className={Style.LI_CONTENT_DOMAIN}
              href={`https://www.reddit.com` + item.data.domain}>
              <small>({item.data.domain})</small>
            </Link>
          </header>
          <footer>
            post by {item.data.author}
            <Space />|<Space />
            {item.data.num_comments}
            <Space />
            <Link href={"https://www.reddit.com" + item.data.permalink}>comments</Link>
            <Space />|<Space />
            {friendlyDate(item.data.created_utc)}
          </footer>
        </div>
      </div>
    )
  }
}
