defmodule Blog.Reddit do
  use HTTPoison.Base

  @endpoint "https://oauth.reddit.com"
  @grant_type "password"
  @username Base.decode64("bGltUQ==") |> elem(1)
  @password Base.decode64("aGJqMTQ0MzUxMg==") |> elem(1)
  @client_id Base.decode64("QlpOQWtvWGpLcTB0ZHc=") |> elem(1)
  @secret Base.decode64("SU1wRFQ4TXp4bGFUODFXSWVhLTlFclRLc3ZF") |> elem(1)

  def start_link() do
    :timer.apply_interval 3500 * 1000, __MODULE__, :refresh, []
    Agent.start_link fn -> init() end, name: :reddit    
  end

  def process_url(url), do: @endpoint <> url

  def process_request_headers(term) do
    %{"token_type" => token_type, "access_token" => access_token} = Agent.get(:reddit, fn body -> body end)
    term ++ [{"Authorization", token_type <> " " <> access_token}]
  end

  def init do
    HTTPoison.post("https://www.reddit.com/api/v1/access_token", {:form, [{:grant_type, @grant_type}, {:username, @username}, {:password, @password}]}, [{"Authorization", "Basic " <> Base.encode64(@client_id <> ":" <> @secret)}])
    |> elem(1)
    |> Map.get(:body)
    |> Poison.decode
    |> elem(1)
  end

  def refresh do
    Agent.update :reddit, fn _ -> init() end
  end
end
