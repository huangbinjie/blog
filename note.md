# elixir学习笔记

## ets vs agent vs genServer ?

### ets

Warning! Don’t use ETS as a cache prematurely! Log and analyze your application performance and identify which parts are bottlenecks, so you know whether you should cache, and what you should cache. This chapter is merely an example of how ETS can be used, once you’ve determined the need.

### agent

Agent is a simple solution that could work for smaller loads and a few client processes. ETS table should usually perform better, and can support concurrent clients, i.e. you could have simultaneous multiple readers/writers - something not possible with Agent/GenServer. It is however very limited in terms of atomic operations, so it's mostly suitable for simple k-v stuff, and some concurrent counters.

Personally, if I know that there will be multiple clients of a key-value store, I just go for ETS immediately, because I believe this is what it was made for. That being said, some cases are in the grey area, so starting with a simple Agent is a somewhat simpler and more flexible solution. Assuming you encapsulate cache operations with some module, switching to ETS should be easy, because you'll likely need to change the implementation in only one module (the cache wrapper).

Finally, as others have pointed out, think carefully whether you even need a cache. All other things being equal, cacheless is better than cacheful (because of less complexity), so if you can get away without it, it will be the simplest solution :slight_smile:

### genServer

Using a GenServer you can hold state and build a layer of abstraction around it for accessing the state.

Just consider some software that does manage bank accounts.

When you just read and write into an ETS, then you can't guarantee reads and writes happen in order. You can't even guarantee atomicity of some requests, which would blow up consistency of your database.

Using a GenServer on the other hand side, does guarantee, that everything happens in the right order, as well as atomicity of transfering money from one account to another. At least it does seem like this from external processes.

You could write a wrapper around an ETS, but as soon as someone else finds out the name of the table, he can at least read at will, while there is no way to read from an GenServers state without using its official API and waiting for beeing the next one beeing processed.

Also one thing to consider when trying to decide between them, is that the state of a GenServer is garbage collected automatically, while you have to remember yourself to drop columns in an ETS when they are not needed any more.

Next thing to consider is, that an ETS is only accessible from the node it is running on (IIRC), while you can send messages to an GenServer across nodes.

Last but not least, there might be kinds of states that do not fit into a table like structure as an ETS provides it (or would generate a huge overhead in flatteing it down until it fits), such data might fit perfectly into a single GenServer. (Or the state itself is so small, that a table would be overkill; consider a simple integer-value that does count something)

From erlang point of view, most of the time, I create a GenServer first and just use it. When I realize that it is a bottleneck, I keep its API and create an ETS which I do access over the GenServers API. This way, most of the time I do only need to change code in the GenServer when I need to restructure the data in the state (beeing it passed around as state or beeing it stored into an ETS). When working with an ETS directly from the beginning, you might to change code across multiple modules to make it fit your new data structure. If your test coverage isn't good, you might even miss some parts until you went into production and your clients start to loose money and blame you :wink: