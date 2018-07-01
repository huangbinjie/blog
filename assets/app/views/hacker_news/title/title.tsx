import * as React from "react"
import { Link } from "office-ui-fabric-react"
import * as Emoji from "../../../components/emotion"
import * as Style from "./title_style"

export default class Title extends React.Component<{}, {}> {
  public render() {
    return (
      <h3 className={Style.TITLE}>
        <span>hn接口使用的</span>
        <Link href="https://firebase.google.com/">firebase</Link>
        <span>，可能需要翻墙</span><Emoji.Interesting />
      </h3>
    )
  }
}
