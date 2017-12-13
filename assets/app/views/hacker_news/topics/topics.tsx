import * as React from "react"
import { List, TextField, Spinner, SpinnerType, Link } from "office-ui-fabric-react"
import Space from "../../../components/space/space"

import * as Style from "./topics_style"
import { friendlyDate } from "../../../utils/unix_time_to_date"

import { IHNTopic } from "../../../types/hn_type"

type Props = {
  posts: IHNTopic[]
}

export default ({ posts }: Props) =>
  <div>
    {!posts.length && <Spinner type={SpinnerType.large} label="正在努力加载中..." />}
    {!!posts.length && <List items={posts} onRenderCell={renderCell} />}
  </div>

const renderCell = (item: IHNTopic, index: number) => {
  return (
    <div key={item.id} className={Style.LI}>
      <div className={Style.LI_NUM}>{index + 1}</div>
      <div className={Style.LI_UPS}>{item.score}</div>
      <div className={Style.LI_CONTENT}>
        <header className={Style.LI_CONTENT_HEADER}>
          <Link className={Style.LI_CONTENT_TITLE} href={item.url}>{item.title}</Link>
        </header>
        <footer>
          post by {item.by}
          <Space />|<Space />
          {item.descendants}
          <Space />
          <Link href={"https://news.ycombinator.com/item?id=" + item.id}>comments</Link>
          <Space />|<Space />
          {friendlyDate(item.time)}
        </footer>
      </div>
    </div>
  )
}