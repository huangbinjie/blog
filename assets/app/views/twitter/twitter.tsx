import * as React from "react"
import { lift, listen, error } from "meng"
import { list } from "../../apis/twitter_api"
import { Twitter } from "../../types/twitter_type"
import { Message } from "./message/message"
import { withRouter, RouteComponentProps } from "react-router"
import * as style from "./twitter_style"

@withRouter
export default class TwitterView extends React.Component<Props, State> {
  public state: State = { tweets: [] }

  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      list(this.props.match.params.name).subscribe(tweets => this.setState({ tweets }))
    }
  }
  public componentDidMount() {
    list(this.props.match.params.name).subscribe(tweets => this.setState({ tweets }))
  }
  public render() {
    return (
      <div className={style.TWITTER}>
        <ul>
          {this.state.tweets.map(tweet => <Message key={tweet.id_str} tweet={tweet} />)}
        </ul>
      </div>
    )
  }
}

type Props = RouteComponentProps<{ name: string }>
type State = {
  tweets: Twitter[]
}
