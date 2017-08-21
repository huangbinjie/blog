defmodule BlogWeb.Router do
  use BlogWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :put_layout, {BlogWeb.LayoutView, "app.html"}
    plug :put_view, BlogWeb.PageView
    plug BlogWeb.CheckHeadApiPlug
    plug :accepts, ["json"]
  end

  scope "/", BlogWeb do
    pipe_through :api
    
    get "/slack", SlackController, :index
    get "/slack/user", SlackController, :user

    # # get "/medium", MediumController, :index
    # # get "/medium/tag/:name", MediumController, :tag

    # # get "/medium", MediumController, :tag

    scope "/reddit" do
      resources "/r/:channel", RedditController, only: [:index]
    end

    get "/twitter", TwitterController, :index

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", BlogWeb do
  #   pipe_through :api
  # end
end
