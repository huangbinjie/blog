import { SlackStore } from "./SlackStore"
import { RedditStore } from "./RedditStore"
import { LoggerStore } from "./LoggerStore"
import { HNStore } from "./HNStore"
import { HistoryStore } from "./HistoryStore"
import { TwitterStore } from "./TwitterStore";

export const stores = [SlackStore, RedditStore, HNStore, TwitterStore, LoggerStore, HistoryStore]