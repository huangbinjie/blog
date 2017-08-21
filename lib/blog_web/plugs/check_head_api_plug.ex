defmodule BlogWeb.CheckHeadApiPlug do
  use BlogWeb, :plug
  import Plug.Conn

  def init(options), do: options

  def call(conn, _opts) do
    if get_req_header(conn, "if-api") == [], do: conn |> render("index.html") |> halt, else: conn
  end

end