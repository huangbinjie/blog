defmodule BlogWeb.RedditController do
	use BlogWeb, :controller
	alias Blog.Reddit

	@doc """
		get topic by channel_url, default "/r/javascript"
	"""
	def index(conn, %{"channel" => channel} = _params) do
		case Reddit.get "/r/" <> channel do
			{:ok, %HTTPoison.Response{status_code: status_code, body: body}} when status_code >= 400 ->
				conn |> put_status(500) |> put_resp_content_type("javascript/json") |> text(body)
			{:ok, %HTTPoison.Response{status_code: status_code, body: body}} when status_code < 400 ->
				conn |> put_resp_content_type("javascript/json") |> text(body)
			_ -> send_resp conn, 500, "internal error"
		end
	end

end