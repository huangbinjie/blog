defmodule Blog.SlackWorker do
  import Slack
  
  def start_link() do
    {:ok, bot} = Slack.Bot.start_link(SlackBot, [], Application.get_env(:slack, :api_token))
    Agent.start_link fn -> bot end, name: :slack
  end

  def handle_call(:pop, _from, [h | t]) do
    {:reply, h, t}
  end

  def handle_cast({:push, h}, t) do
    {:noreply, [h | t]}
  end

end