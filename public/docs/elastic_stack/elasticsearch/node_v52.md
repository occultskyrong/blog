
## 非版权原作者
- 原文查看[elasticsearch/docs/reference/modules/node.asciidoc][modules_node_asciidoc]
- 官方文档地址[Elasticsearch Reference [5.2] » Modules » Node][modules_node_es]

#### 感谢 `ElasticSearch` 团队

***

## Node

> Any time that you start an instance of Elasticsearch, you are starting a _node_.
A collection of connected nodes is  called a [cluster][modules_cluster].
If you are running a single node of Elasticsearch,then you have a cluster of one node.

- 每当你启动Elasticsearch的实例时，都会启动一个node（节点）。
- 连接节点的集合称为“集群”。
- 如果你正在运行Elasticsearch的单个节点，那么你有一个拥有一个节点的集群。

> Every node in the cluster can handle [HTTP][modules_http] and
[Transport][modules_transport] traffic by default. The transport layer
is used exclusively for communication between nodes and the
[Java TransportClient][transport_client]; the HTTP layer is
used only by external REST clients.

- 默认情况下，集群中的每个节点都可以处理HTTP（请求）和Transport（数据传输）。
- Transport专用于节点和Java客户端连接使用。
- HTTP（请求）仅由外部REST full客户端使用。

> All nodes know about all the other nodes in the cluster and can forward client
requests to the appropriate node. Besides that, each node serves one or more
purpose:

- 所有节点都知道集群中的所有其他节点，并可以将客户端请求转发到相应（/适当）的节点。
- 除此以外，每个节点服务于一个或多个目的（/功能）:

### `Master-eligible node` 备选主节点

> A node that has `node.master` set to `true` (default), which makes it eligible
to be [elected as the master node][modules_discovery_zen], which controls
the cluster.

`node.master` 设置为true的节点，它使其（该节点）有资格被选为主节点，从而控制集群。

### `Data node` 数据节点

> A node that has `node.data` set to `true` (default). Data nodes hold data and
perform data related operations such as CRUD, search, and aggregations.

`node.data` 设置为true（默认）的节点。
数据节点保存数据并执行数据相关操作，如CRUD，搜索和聚合。（基本上所有的请求都可以完成）

### `Ingest node` 录入节点

> A node that has `node.ingest` set to `true` (default). Ingest nodes are able
to apply an [ingest pipeline][pipeline] to a document in order to transform
and enrich the document before indexing. With a heavy ingest load, it makes
sense to use dedicated ingest nodes and to mark the master and data nodes as
`node.ingest: false`.

`node.ingest` 设置为true的节点。
录入节点能够对文档应用接收管道，一般在索引之前进行转换和丰富文档。
当有大量录入负载时，使用专门的录入节点，并将主节点和数据节点的 `node.ingest` 标记为 `false` 是有意义的。

### `Tribe node` 部落节点

> A tribe node, configured via the `tribe.*` settings, is a special type  of
coordinating only node that can connect to multiple clusters and perform
search and other operations across all connected clusters.

通过 `tribe.*` 设置的部落节点，是一种特殊类型的仅做协调的节点，
可以连接到多个集群，并在所有连接的集群上执行搜索和其他操作

> By default a node is a master-eligible node and a data node, plus it can
pre-process documents through ingest pipelines. This is very convenient for
small clusters but, as the cluster grows, it becomes important to consider
separating dedicated master-eligible nodes from dedicated data nodes.

默认情况下，一个节点同时是主节点和数据节点，再加上它可以通过入口管道（logstash）来预处理文档。
这（种情况）对于小集群非常方便，但随着集群的增长，考虑将专用主节点与专用数据节点分离将变的越来越重要。

***

> ## coordinating-node
  ##### 协调节点

> Requests like search requests or bulk-indexing requests may involve data held
on different data nodes. A search request, for example, is executed in two
phases which are coordinated by the node which receives the client request --
the _coordinating node_.
- 诸如搜索、批量索引的请求可能涉及存储在不同的数据节点上的数据。
- 例如，搜索请求在由接受客户端请求的（协调）节点中分为两个阶段执行。

> In the _scatter_ phase, the coordinating node forwards the request to the data
nodes which hold the data.  Each data node executes the request locally and
returns its results to the coordinating node. In the _gather_  phase, the
coordinating node reduces each data node's results into a single global
resultset.
- 在`scatter`（分散、分离）阶段，协调节点将请求转发到保存数据的数据节点。
- 每个数据节点在（节点）本地执行请求并将结果返回给协调节点。
- 在`gather`（合并、聚集）阶段，协调节点将每个数据节点的结果简化（合并）为单个全局结果集

> Every node is implicitly a coordinating node. This means that a node that has
all three `node.master`, `node.data` and `node.ingest` set to `false` will
only act as a coordinating node, which cannot be disabled. As a result, such
a node needs to have enough memory and CPU in order to deal with the gather
phase.
- 每个节点隐含的是协调节点。
- 这意味着将 `node.master` 、 `node.data` 和 `node.ingest` 三个值全部设置为 `false`
的节点将只作为协调节点，不能禁用。
- 因此，这样的节点需要具有足够的内存和CPU以便处理`gather`阶段

***

### `Master Eligible Node` 备选主节点

> The master node is responsible for lightweight cluster-wide actions such as
creating or deleting an index, tracking which nodes are part of the cluster,
and deciding which shards to allocate to which nodes. It is important for
cluster health to have a stable master node.

- 主节点负责轻量级集群级操作，例如创建或删除索引，跟踪哪些节点是集群的一部分，
以及决定哪些分片分配给哪些节点。
- 拥有一个稳定的主节点对于集群健康是重要的。

> Any master-eligible node (all nodes by default) may be elected to become the
master node by the [master election process][modules_discovery_zen].

任何（有选举资格的）主节点（默认所有的节点）都可以通过 `master election process`
（选主协议/算法）选举成为主节点。

> IMPORTANT: Master nodes must have access to the `data/` directory (just like
`data` nodes) as this is where the cluster state is persisted between node restarts.

重要提示: 主节点必须访问 `data/` 目录（就像 `data` 节点一样），
因为这是集群状态在节点重新启动之间持久化的地方

> Indexing and searching your data is CPU-, memory-, and I/O-intensive work
which can put pressure on a node's resources. To ensure that your master
node is stable and not under pressure, it is a good idea in a bigger
cluster to split the roles between dedicated master-eligible nodes and
dedicated data nodes.

- 索引和搜索数据是CPU、内存和IO密集型工作，可能会对节点的资源造成压力。
- 为了确保你的主节点稳定且不受压力，在较大的集群中分离出专用主节点和专用数据节点是一个好主意。

> While master nodes can also behave as `coordinating nodes`
and route search and indexing requests from clients to data nodes, it is
better _not_ to use dedicated master nodes for this purpose. It is important
for the stability of the cluster that master-eligible nodes do as little work
as possible.

- 虽然主节点也可以作为协调节点，并将搜索和索引请求从客户端转发到数据节点，但最好不要为此目的使用专用主节点。
（即最好不要让主节点来做协调节点的工作）
- 对于集群的稳定性，主节点做尽可能少的工作是重要的。

> To create a standalone master-eligible node, set:

要创建专用主节点，设置如下:

```
node.master: true <1>
node.data: false <2>
node.ingest: false <3>
```

> <1> The `node.master` role is enabled by default.
<2> Disable the `node.data` role (enabled by default).
<3> Disable the `node.ingest` role (enabled by default).

- 默认情况下启动 `node.master` 角色
- 关闭 `node.data` 角色，默认开启
- 关闭 `node.ingest` 角色，默认开启

## Avoiding split brain with `minimum_master_nodes`
避免因 `minimum_master_nodes` 发生“脑裂”

> To prevent data loss, it is vital to configure the
`discovery.zen.minimum_master_nodes` setting (which defaults to `1`) so that
each master-eligible node knows the _minimum number of master-eligible nodes_
that must be visible in order to form a cluster.

为了防止数据丢失，至关重要的是配置 `discovery.zen.minimum_master_nodes` 设置（默认为1），
以便每个符合主节点的节点知道为了形成集群必须可见的主节点节点的最小数量。

> To explain, imagine that you have a cluster consisting of two master-eligible
nodes. A network failure breaks communication between these two nodes.  Each
node sees one master-eligible node... itself. With `minimum_master_nodes` set
to the default of `1`,  this is sufficient to form a cluster. Each node elects
itself as the new master (thinking that the other master-eligible node has
died) and the result is two clusters, or a _split brain_.  These two nodes
will never rejoin until one node is restarted.  Any data that has been written
to the restarted node will be lost.

为了解释（举个栗子），假设你有一个由两个主节点组成的节点:

  - 网络故障打断了这两个节点之间的通信。
  - 每个节点看到一个备选主节点...其本身。
  - 将 `minimum_master_nodes` 设置为默认值1，这足以形成集群。
  - 每个节点选择自己作为新的主节点（认为另一个符合主节点的节点已经死亡），并且结果是两个集群或脑裂。
  - 这两个节点永远不会重新加入，直到一个节点重新启动。
  - 已写入重新启动的节点的任何数据都将丢失。

> Now imagine that you have a cluster with three master-eligible nodes, and
`minimum_master_nodes` set to `2`.  If a network split separates one node from
the other two nodes, the side with one node cannot see enough master-eligible
nodes and will realise that it cannot elect itself as master.  The side with
two nodes will elect a new master (if needed) and continue functioning
correctly.  As soon as the network split is resolved, the single node will
rejoin the cluster and start serving requests again.

现在假设你有一个具有三个主节点的集群，并且 `minimum_master_nodes` 设置为2。

  - 如果网络故障将一个节点与其他两个节点分离，则具有一个节点的一侧无法看到足够的主节点，
并且将意识到它不能选择自己作为主节点。
  - 具有两个节点的一侧将选择一个新的主节点（如果需要）并继续正常工作。
  - 一旦网络故障解决，单个节点将重新加入群集并再次开始服务请求。

> This setting should be set to a _quorum_ of master-eligible nodes:

```
  (master_eligible_nodes / 2) + 1
```

（所以）此（`minimum_master_nodes`）值应根据备选主节点数量设置为:(备选主节点数量/2)+1

> In other words, if there are three master-eligible nodes, then minimum master
nodes should be set to `(3 / 2) + 1` or `2`:

```
discovery.zen.minimum_master_nodes: 2 <1>
```
<1> Defaults to `1`.

换句话说，如果有三个备选主节点，则 `minimum_master_nodes` 值应设置为 (3/2)+1=2 。
默认设置为1

> This setting can also be changed dynamically on a live cluster with the
[cluster update settings API][cluster_update_settings]:

还可以使用集群设置更新api在活动集群上动态更改此设置

```
PUT _cluster/settings
{
  "transient": {
    "discovery.zen.minimum_master_nodes": 2
  }
}
```

> TIP: An advantage of splitting the master and data roles between dedicated
nodes is that you can have just three master-eligible nodes and set
`minimum_master_nodes` to `2`. You never have to change this setting, no
matter how many dedicated data nodes you add to the cluster.

> 在专用节点之间分离主节点和数据节点的优点是 : 当你只有三个备选主节点时，
将 `minimum_master_nodes` 设置为2。无论（以后）你添加多少专用数据节点到集群中，都不必更改此设置。

***

### Data Node 数据节点

> Data nodes hold the shards that contain the documents you have indexed. Data
nodes handle data related operations like CRUD, search, and aggregations.
These operations are I/O-, memory-, and CPU-intensive. It is important to
monitor these resources and to add more data nodes if they are overloaded.

- 数据节点保存你建立的索引文档的分片。
- 数据节点处理数据相关操作，如CRUD，搜索和聚合。这些操作是IO、内存和CPU密集型操作。
- 重要的是监视这些资源，一旦超载，则添加更多数据节点。

> The main benefit of having dedicated data nodes is the separation of the
master and data roles.

拥有专用数据节点的主要好处是分离主节点和数据节点。

> To create a dedicated data node, set:

```
node.master: false <1>
node.data: true <2>
node.ingest: false <3>
```
> <1> Disable the `node.master` role (enabled by default).
<2> The `node.data` role is enabled by default.
<3> Disable the `node.ingest` role (enabled by default).

***

### Ingest Node 录入节点

> Ingest nodes can execute pre-processing pipelines, composed of one or more
ingest processors. Depending on the type of operations performed by the ingest
processors and the required resources, it may make sense to have dedicated
ingest nodes, that will only perform this specific task.

- 录入节点可以执行由一个或多个录入处理器组成的预处理流水线。
- 根据录入处理器执行的操作类型和所需资源，具有专用摄取节点可能是有意义的，其将仅执行该特定任务。

> To create a dedicated ingest node, set:

```
node.master: false <1>
node.data: false <2>
node.ingest: true <3>
```
> <1> Disable the `node.master` role (enabled by default).
<2> Disable the `node.data` role (enabled by default).
<3> The `node.ingest` role is enabled by default.

***

### Coordinating only node 仅协调节点

> If you take away the ability to be able to handle master duties, to hold data,
and pre-process documents, then you are left with a _coordinating_ node that
can only route requests, handle the search reduce phase, and distribute bulk
indexing. Essentially, coordinating only nodes behave as smart load balancers.

- 如果你失去了能够处理主任务，保存数据和预处理文档的能力，那么你只能使用一个协调节点，
它只能分发路由请求，处理搜索聚合阶段并分发批量索引。
- 实质上，仅协调节点表现为智能负载平衡器。

> Coordinating only nodes can benefit large clusters by offloading the
coordinating node role from data and master-eligible nodes.  They join the
cluster and receive the full [cluster state][cluster_state], like every other
node, and they use the cluster state to route requests directly to the
appropriate place(s).

- 仅协调节点可以通过从数据和备选主节点去除协调节点角色而使大型集群受益。
- 它们加入集群并接收完整的集群状态，与其他所有节点一样，它们使用集群状态将路由请求转发到适当的位置。

> WARNING: Adding too many coordinating only nodes to a cluster can increase the
burden on the entire cluster because the elected master node must await
acknowledgement of cluster state updates from every node! The benefit of
coordinating only nodes should not be overstated -- data nodes can happily
serve the same purpose.

- 向集群添加过多的仅协调节点会增加整个集群的负担，因为选举的主节点必须等待来自每个节点的集群状态更新的确认！
- 仅协调节点的好处不应被夸大 —— 数据节点可以愉快地服务于（提供）相同的目的（功能）。

> To create a coordinating only node, set:

```
node.master: false <1>
node.data: false <2>
node.ingest: false <3>
```
> <1> Disable the `node.master` role (enabled by default).
<2> Disable the `node.data` role (enabled by default).
<3> Disable the `node.ingest` role (enabled by default).

***

### Node data path settings 节点数据路径设置

## `path.data`

> Every data and master-eligible node requires access to a data directory where
shards and index and cluster metadata will be stored. The `path.data` defaults
to `$ES_HOME/data` but can be configured in the `elasticsearch.yml` config
file an absolute path or a path relative to `$ES_HOME` as follows:

- 每个数据和备选主节点都需要访问存储分片、索引和集群元数据的数据目录。
- `path.data` 默认为 `$ES_HOME/data`
- 但可以在elasticsearch.yml配置文件中配置绝对路径或基于 `$ES_HOME` 的相对路径，如下所示：

```
path.data:  /var/elasticsearch/data
```

> Like all node settings, it can also be specified on the command line as:

和所有节点设置一样，他也可以在命令行上通过命令实现:

```
./bin/elasticsearch -Epath.data=/var/elasticsearch/data
```

> TIP: When using the `.zip` or `.tar.gz` distributions, the `path.data` setting
should be configured to locate the data directory outside the Elasticsearch
home directory, so that the home directory can be deleted without deleting
your data! The RPM and Debian distributions do this for you already.

- 使用.zip或.tar.gz发行版时，应配置path.data设置，
- 以便在Elasticsearch主目录外找到数据目录，以便删除主目录时不会误删数据！
- RPM和Debian发行版已经为你做了这个。

***

## `node.max_local_storage_nodes`

> The [data path][data_path] can be shared by multiple nodes, even by nodes from different
clusters. This is very useful for testing failover and different configurations on your development
machine. In production, however, it is recommended to run only one node of Elasticsearch per server.

- 数据路径可以由多个节点共享，甚至由来自不同集群的节点共享。
- 这对于测试开发机器上的故障转移和不同配置非常有用。
- 但是，在生产中，建议每个服务器只运行一个Elasticsearch节点。

> By default, Elasticsearch is configured to prevent more than one node from sharing the same data
path. To allow for more than one node (e.g., on your development machine), use the setting
`node.max_local_storage_nodes` and set this to a positive integer larger than one.

- 默认情况下，Elasticsearch配置为防止多个节点共享同一数据路径。
- 要允许多个节点在同一台物理机上（例如，在开发计算机上）
- 请使用设置node.max_local_storage_nodes并将其设置为大于1的正整数。

> WARNING: Never run different node types (i.e. master, data) from the same data directory. This can
lead to unexpected data loss.

警告：不要在同一数据目录运行不同的节点类型（即主数据，数据）。这可能导致意外的数据丢失。

***

### Other node settings

> More node settings can be found in [Modules][modules].  Of particular note are
the [cluster.name][cluster_name], the [node.name][node_name] and the
[network settings][modules_network].

更多节点设置可以在 `modules` 中找到。 特别注意的是 `cluster.name` ，`node.name` 和网络设置。

***

以下为译者注释:

- 【1】 master-node,Master-eligible node
  - 前者为主节点，后者为拥有被选举资格的备选主节点；
  - 多个备选主节点可以通过竞主协议或算法来实现主节点的竞选；
  - 某个备选主节点成为主节点后，其他备选主节点依然备选；
  - 一旦发生主节点宕机，其他备选主节点会通过再次选举竞主成为新的主节点


***
参考文献
[modules_node_asciidoc]: https://github.com/elastic/elasticsearch/blob/5.2/docs/reference/modules/node.asciidoc
[modules_node_es]: https://www.elastic.co/guide/en/elasticsearch/reference/5.2/modules-node.html
[modules_cluster]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-cluster.html
[modules_http]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-http.html
[modules_transport]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-transport.html
[transport_client]: https://www.elastic.co/guide/en/elasticsearch/client/java-api/5.2/transport-client.html
[modules_discovery_zen]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-discovery-zen.html
[pipeline]: https://www.elastic.co/guide/en/elasticsearch/reference/current/pipeline.html
[cluster_update_settings]: https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-update-settings.html
[cluster_state]: https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-state.html
[data_path]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-node.html#data-path
[modules]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules.html
[cluster_name]: https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#cluster.name
[node_name]: https://www.elastic.co/guide/en/elasticsearch/reference/current/important-settings.html#node.name
[modules_network]: https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-network.html
