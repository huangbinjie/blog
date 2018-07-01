"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const cts_to_date_1 = require("../../../utils/cts_to_date");
const style = require("./message_style");
class Message extends React.Component {
    render() {
        return (React.createElement("li", { className: style.LIST_ITEM },
            React.createElement("img", { className: style.LIST_AVATAR, src: this.props.tweet.user.profile_image_url }),
            React.createElement("div", { className: style.LIST_CONTENT },
                React.createElement("header", null,
                    this.props.tweet.retweeted_status ? "转推" : "推文",
                    "\u00A0|\u00A0",
                    this.props.tweet.user.screen_name,
                    "\u00A0|\u00A0",
                    cts_to_date_1.parse(this.props.tweet.created_at)),
                React.createElement("main", { dangerouslySetInnerHTML: { __html: this.genText(this.props.tweet) } }))));
    }
    genText(tweet) {
        let text = tweet.text;
        if (tweet.extended_entities) {
            tweet.extended_entities.media.forEach(media => {
                if (media.type === "photo") {
                    text = text.replace(media.url, `\n<img src="${media.media_url}" alt="${media.display_url}" style="max-width: 100%" />`);
                }
                if (media.type === "video") {
                    text = text.replace(media.url, `\n<video controls style="max-width: 100%">
                <source src="${media.video_info.variants[0].url}" type="${media.video_info.variants[0].content_type}">
            </video>`);
                }
            });
        }
        else if (tweet.entities.media) {
            tweet.entities.media.forEach(media => {
                if (media.type === "photo") {
                    text = text.replace(media.url, `\n<img src="${media.media_url}" alt="${media.display_url}" style="max-width: 100%" />`);
                }
            });
        }
        if (tweet.entities.urls.length > 0) {
            tweet.entities.urls.forEach(url => {
                text = text.replace(url.url, `<a href="${url.expanded_url}">${url.display_url}</a>`);
            });
        }
        if (tweet.retweeted_status) {
            return this.genText(tweet.retweeted_status);
        }
        return text;
    }
}
exports.Message = Message;
