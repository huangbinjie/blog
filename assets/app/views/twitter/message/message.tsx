import * as React from "react"
import { Twitter } from "../../../types/twitter_type"
import { parse } from "../../../utils/cts_to_date"
import * as style from "./message_style"

export class Message extends React.Component<{ tweet: Twitter }, {}>{
  public render() {
    return (
      <li className={style.LIST_ITEM}>
        <img className={style.LIST_AVATAR} src={this.props.tweet.user.profile_image_url} />
        <div className={style.LIST_CONTENT}>
          <header>
            {this.props.tweet.retweeted_status ? "转推" : "推文"}
            &nbsp;|&nbsp;
            {this.props.tweet.user.screen_name}
            &nbsp;|&nbsp;
            {parse(this.props.tweet.created_at)}
          </header>
          <main dangerouslySetInnerHTML={{ __html: this.genText(this.props.tweet) }}></main>
        </div>
      </li>
    )
  }

  private genText(tweet: Twitter): string {
    let text = tweet.text

    if (tweet.extended_entities) {
      tweet.extended_entities.media.forEach(media => {
        if (media.type === "photo") {
          text = text.replace(media.url,
            `\n<img src="${media.media_url}" alt="${media.display_url}" style="max-width: 100%" />`)
        }

        if (media.type === "video") {
          text = text.replace(media.url,
            `\n<video controls style="max-width: 100%">
                <source src="${media.video_info.variants[0].url}" type="${media.video_info.variants[0].content_type}">
            </video>`)
        }
      })
    } else if (tweet.entities.media) {
      tweet.entities.media.forEach(media => {
        if (media.type === "photo") {
          text = text.replace(media.url,
            `\n<img src="${media.media_url}" alt="${media.display_url}" style="max-width: 100%" />`)
        }
      })
    }

    if (tweet.entities.urls.length > 0) {
      tweet.entities.urls.forEach(url => {
        text = text.replace(url.url, `<a href="${url.expanded_url}">${url.display_url}</a>`)
      })
    }

    if (tweet.retweeted_status) {
      return this.genText(tweet.retweeted_status)
    }

    return text
  }
}
