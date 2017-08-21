export type Twitter = {
	// tslint:disable-next-line:variable-name
	created_at: string
	id: number
	id_str: string
	text: string
	truncated: boolean
	entities: {
		hashtags: string[]
		symbols: string[]
		user_mentions: TwitterUserMention[]
		urls: TwitterUrl[]
		media: TwitterMedia[]
	}
	source: string
	in_reply_to_status_id: null
	in_reply_to_status_id_str: null
	in_reply_to_user_id: null
	in_reply_to_user_id_str: null
	in_reply_to_screen_name: null
	user: TwitterUser
	geo: null
	coordinates: null
	place: null
	contributors: null
	retweeted_status: Twitter
	is_quote_status: boolean,
	retweet_count: number,
	favorite_count: number,
	favorited: boolean,
	retweeted: boolean,
	possibly_sensitive: boolean,
	lang: string
}

export type TwitterUserMention = {
	screen_name: string
	name: string
	id: number
	id_str: string
	indices: number[]
}

export type TwitterUrl = {
	url: string
	expanded_url: string
	display_url: string
	indices: number[]
}

export type TwitterUser = {
	id: number,
	id_str: string,
	name: string,
	screen_name: string,
	location: string,
	description: string,
	url: string,
	entities: {
		url: {
			urls: TwitterUrl[]
		},
		description: {
			urls: TwitterUrl[]
		}
	}
	protected: boolean,
	followers_count: 6172353,
	friends_count: 46,
	listed_count: 13091,
	created_at: string,
	favourites_count: 26,
	utc_offset: -25200,
	time_zone: string,
	geo_enabled: true,
	verified: true,
	statuses_count: 3583,
	lang: string,
	contributors_enabled: false,
	is_translator: false,
	is_translation_enabled: false,
	profile_background_color: string,
	profile_background_image_url: string,
	profile_background_image_url_https: string
	profile_background_tile: true,
	profile_image_url: string
	profile_image_url_https: string
	profile_banner_url: string
	profile_link_color: string,
	profile_sidebar_border_color: string,
	profile_sidebar_fill_color: string,
	profile_text_color: string,
	profile_use_background_image: boolean,
	has_extended_profile: boolean,
	default_profile: boolean,
	default_profile_image: boolean,
	following: boolean,
	follow_request_sent: boolean,
	notifications: boolean,
	translator_type: string
}

export type TwitterMedia = {
	display_url: string
	expanded_url: string
	id: number,
	id_str: string
	indices: number[]
	media_url: string
	media_url_https: string
	sizes: {

	}
	source_status_id: number
	source_status_id_str: string
	source_user_id: number
	source_user_id_str: string
	type: string
	url: string
}
