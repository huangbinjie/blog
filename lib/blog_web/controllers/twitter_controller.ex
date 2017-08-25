defmodule BlogWeb.TwitterController do
	use BlogWeb, :controller

	"""
		doc: https://dev.twitter.com/rest/reference/get/statuses/user_timeline
	"""
	def index(conn, %{"name" => name} = params) do
		content = ExTwitter.user_timeline([screen_name: name, count: 100, exclude_replies: true]) 
		json conn, content
	end

	"""
		doc: https://dev.twitter.com/rest/public/search
	"""
	def search(conn, _) do
		content = ExTwitter.search("from:dan_abramov", [count: 5]) 
					 |> Enum.map(fn(tweet) -> tweet.text end) 
					 |> Enum.join("\n-----\n")
		text conn, content
	end
end