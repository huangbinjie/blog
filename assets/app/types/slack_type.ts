export interface ISlackListType {
	has_more: boolean
	is_limited: boolean
	messages: Array<ISlackUserMessage & ISlackBotMessage>
	ok: boolean
	warning: string
}

export interface ISlackUserMessage {
	text: string
	ts: string
	type: "message"
	user: string | Optional<ISlackMember>
}

export interface ISlackBotMessage {
	bot_id: string
	icons?: {
		image_32: string
		image_48: string
		image_72: string
	}
	subtype: "bot_message"
	text: string
	ts: string
	type: "message"
	username: string
}

export interface ISlackUserType {
	cache_ts: number
	members: ISlackMember[]
	ok: boolean
	warning: string
}

export interface ISlackMember {
	color: string
	deleted: boolean
	id: string
	is_admin: boolean
	is_bot: boolean
	is_owner: boolean
	is_primary_owner: boolean
	is_restricted: boolean
	is_ultra_restricted: boolean
	name: string
	profile: {
		avatar_hash: string
		email: string
		first_name: string
		image_24: string
		image_32: string
		image_48: string
		image_72: string
		image_192: string
		image_512: string
		iamge_1024: string
		image_original: string
		last_name: string
		phone: string
		real_name: string
		real_name_normalized: string
		skype: string
		title: string
	}
	real_name: string
	status: Optional<string>
	team_id: string
	tz: string
	tz_label: string
	tz_offset: number
	updated: number
}
