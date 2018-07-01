"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ractor_1 = require("ractor");
const slack_api_1 = require("../apis/slack_api");
const FetchData_1 = require("../messages/slack/FetchData");
const NextPage_1 = require("../messages/slack/NextPage");
const MessageScroll_1 = require("../messages/slack/MessageScroll");
const outgoingBotIcon = "https://fst.slack-edge.com/12b5a/plugins/tester/assets/service_48.png";
class SlackStore extends ractor_1.Store {
    constructor() {
        super(...arguments);
        this.state = {
            messages: [],
            latest: "0",
            channel: "C0PKC07FB",
            initialScrollTop: 0,
            cache: []
        };
    }
    createReceive() {
        return this.receiveBuilder()
            .match(FetchData_1.FetchData, fetchData => {
            slack_api_1.list(this.state.channel, this.state.latest)
                .map(response => response.messages)
                .combineLatest(slack_api_1.user(), (messages, users) => ({ messages: this.mergeUser2Message(messages, users), users }))
                .subscribe(data => this.setState({ messages: data.messages, users: data.users, latest: data.messages.slice(-1)[0].ts }));
        })
            .match(NextPage_1.NextPage, () => {
            slack_api_1.list(this.state.channel, this.state.latest)
                .map(response => this.mergeUser2Message(response.messages, this.state.users))
                .subscribe(messages => this.setState({ messages: this.state.messages.concat(messages), latest: messages.slice(-1)[0].ts }));
        })
            .match(MessageScroll_1.MessageScroll, messageScroll => {
            this.state.initialScrollTop = messageScroll.scrollTop;
        })
            .build();
    }
    mergeUser2Message(messages, user) {
        return messages.map(message => {
            const userinfo = message.user ? user.members.find(member => member.id === message.user) : {
                name: message.username,
                profile: {
                    image_48: message.icons ? message.icons.image_48 : outgoingBotIcon
                }
            };
            message.user = userinfo;
            return message;
        });
    }
}
exports.SlackStore = SlackStore;
