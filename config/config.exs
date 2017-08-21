# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :blog,
  ecto_repos: [Blog.Repo]

# Configures the endpoint
config :blog, BlogWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ObGJrY9g029zBf/yvvh0JvAZwr4QsIaf8d0ca0J6RH6+0PhDVJ1KUfB5J7ZeFh4c",
  render_errors: [view: BlogWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Blog.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# config slack
config :slack, api_token: Base.decode64("eG94Yi0xNTE4NDQ5MjI0MzItTzJma3gyV25zd1BCRmU4cnJvcjE1d3ZH") |> elem(1)

# twitter
config :extwitter, :oauth, [
  consumer_key: Base.decode64("aFZocGRGQUdqSUxvTWRBY0FIZGpqRmFqTQ==") |> elem(1),
  consumer_secret: Base.decode64("cEZSOEl5bTZGMkxBTGgxZGxsbmsyYVZHbEVGOWZ1bVR5VGxKQ1dOakFUVFNPVzhvVEc=") |> elem(1),
  access_token: Base.decode64("MjQ5Nzg3OTk5OS1ZZFhJYzBFcDlxbGs5djdUdGY1ZVAzQUNtVUp1MzNTeWpSOFNIQXM=") |> elem(1),
  access_token_secret: Base.decode64("Y1RQY292b3ZXaG50NlBVblBVS3J2QWJPRFp6M1daeEd5ZEpYMWlKR1ozdGZU") |> elem(1)
]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
