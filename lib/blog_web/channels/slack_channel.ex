defmodule Blog.SlackChannel do
  use BlogWeb, :channel

  def join("slack:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (chat:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    slack = Agent.get(:slack, fn slack -> slack end)
		send slack, {:message, msg, "#general"}
    # SlackBot没办法返回机器人说的话，所以这里主动生成信息
    broadcast! socket, "new:msg", %{user: "U4FQUT4CQ", type: "message", text: msg, ts: :os.system_time(:seconds)}
    {:reply, {:ok, %{}}, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
