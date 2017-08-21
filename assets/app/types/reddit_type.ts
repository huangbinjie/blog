export interface IRedditType {
	kind: string,
	data: {
		after: string
		before: Optional<string>
		children: IRedditListType[]
		modhash: Object
	}
}

export interface IRedditListType {
	kind: string,
	data: {
		approved_by: Optional<string>
		archived: boolean
		author: string
		author_flair_css_class: Optional<string>
		author_flair_text: Optional<string>
		banned_by: Optional<string>
		brand_safe: boolean | true
		clicked: boolean
		contest_mode: boolean
		created: number
		created_utc: number
		distinguished: string
		domain: string
		downs: number
		edited: number
		gilded: number
		hidden: boolean
		hide_score: boolean
		id: string
		is_self: boolean
		likes: Optional<string>
		link_flair_css_class: Optional<string>
		link_flair_text: Optional<string>
		locked: boolean
		media: Optional<string>
		media_embed: object
		mod_reports: Array<object>
		name: string
		num_comments: number
		num_reports: Optional<string>
		over_18: boolean
		permalink: string
		quarantine: boolean
		removal_reason: Optional<string>
		report_reasons: Optional<string>
		saved: boolean
		score: number
		secure_media: Optional<string>
		secure_media_embed: object
		selftext: string
		selftext_html: string
		spoiler: boolean
		stickied: boolean
		subreddit: string
		subreddit_id: string
		subreddit_name_prefixed: string
		subreddit_type: string
		suggested_sort: Optional<string>
		thumbnail: string
		title: string
		ups: number
		url: string
		user_reports: Array<object>
		visited: boolean
	}
}
