import * as React from "react"
import { list } from "../../apis/twitter_api"
import { Twitter } from "../../types/twitter_type"
import { Message } from "./message/message"
import { withRouter, RouteComponentProps } from "react-router"
import * as style from "./twitter_style"
import { Providers } from "ractor-react"
import { TwitterStore } from "../../stores/TwitterStore"
import { system } from "../../system";
import { FetchTwitterUser } from "../../messages/twitter/FetchTwitterUser";

@Providers([TwitterStore])
class TwitterComponent extends React.Component<Props> {
  public componentWillReceiveProps(nextProps: Props) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      system.dispatch(new FetchTwitterUser(this.props.match.params.name))
    }
  }
  public componentDidMount() {
    system.dispatch(new FetchTwitterUser(this.props.match.params.name))
  }
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

export const TwitterView = withRouter(TwitterComponent)

type Props = RouteComponentProps<{ name: string }> & { tweets: Twitter[] }
type State = {
  tweets: Twitter[]
}
