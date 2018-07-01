"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const twitter_api_1 = require("../../apis/twitter_api");
const message_1 = require("./message/message");
const react_router_1 = require("react-router");
const style = require("./twitter_style");
class TwitterComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { tweets: [] };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.name !== nextProps.match.params.name) {
            twitter_api_1.list(this.props.match.params.name).then(tweets => this.setState({ tweets }));
        }
    }
    componentDidMount() {
        twitter_api_1.list(this.props.match.params.name).then(tweets => this.setState({ tweets }));
    }
    render() {
        return (React.createElement("div", { className: style.TWITTER },
            React.createElement("ul", null, this.state.tweets.map(tweet => React.createElement(message_1.Message, { key: tweet.id_str, tweet: tweet })))));
    }
}
exports.TwitterView = react_router_1.withRouter(TwitterComponent);
