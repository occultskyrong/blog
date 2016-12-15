
# 搜索实现的简单说明

## 参考资料
- [elastic/elasticsearch-definitive-guide](https://github.com/elastic/elasticsearch-definitive-guide)
- [《Elasticsearch: 权威指南》](http://106.186.120.253/preview/foreword_id.html)
- [Elasticsearch 权威指南（中文版）](http://es.xiaoleilu.com/)
- 《Elasticsearch服务器开发(第2版)》

## ElasticSearch
- 前言
  - 以下节选自 [Elasticsearch: 权威指南 » 基础入门 » 你知道的, 为了搜索…](http://106.186.120.253/preview/intro.html)
  
  > Elasticsearch 是一个分布式、可扩展、实时的搜索与数据分析引擎。 
  
  > 它能从项目一开始就赋予你的数据以搜索、分析和探索的能力，这是通常没有预料到的。 
  
  > 它存在还因为原始数据如果只是躺在磁盘里面根本就毫无用处。
  
  > Elasticsearch 不仅仅只是全文搜索，我们还将介绍结构化搜索、数据分析、复杂的语言处理、地理位置和对象间关联关系等。 
  
  >   我们还将探讨如何给数据建模来充分利用 Elasticsearch 的水平伸缩性，以及在生产环境中如何配置和监视你的集群。

  > 然而，Elasticsearch 不仅仅是 Lucene，并且也不仅仅只是一个全文搜索引擎。 它可以被下面这样准确的形容：
  > - 一个分布式的实时文档存储，每个字段 可以被索引与搜索
  > - 一个分布式实时分析搜索引擎
  > - 能胜任上百个服务节点的扩展，并支持 PB 级别的结构化或者非结构化数据
  
- NoSQL
  - 非关系、无级联
  - SQL转换
    - SQL转换为ES查询
    
      > [Day4: 《将sql转换为es的DSL》](http://elasticsearch.cn/article/114)
      
    - 如何处理关联关系？
      - 例如订单和订单详情，将订单详情合并在订单的字段(非规范化你的数据)
      
      > [Elasticsearch: 权威指南 » 数据建模 » 关联关系处理](http://106.186.120.253/preview/relations.html)
      
  - 面向文档：JSON
    > [Elasticsearch: 权威指南 » 基础入门 » 你知道的, 为了搜索… » 面向文档](http://106.186.120.253/preview/_document_oriented.html) 
    
- Basic Concepts
  > [Elasticsearch Reference [5.1] » Getting Started » Basic Concepts](https://www.elastic.co/guide/en/elasticsearch/reference/current/_basic_concepts.html#_cluster)
  
  > [基本概念](https://endymecy.gitbooks.io/elasticsearch-guide-chinese/content/getting-started/basic-concepts.html)
  
  - Node、Shards、Replicas
  > Relational DB -> Databases -> Tables -> Rows -> Columns
  > 
  > Elasticsearch -> Indices   -> Types  -> Documents -> Fields
  > 
  > [Lucene学习总结之一：全文检索的基本原理](http://blog.csdn.net/forfuture1978/article/details/4711308)
  > - 建议阅读 章节 “三、如何创建索引”
  
  - Document
    - 以下节选自《Elasticsearch 服务器开发(第2版)》 1.1.1小节，有改动
    
    > - *文档*（document）：索引和搜索时使用的主要数据载体，包含一个或多个存有数据的字段
    > - *字段*（field）：文档的一部分，包含名称和值两部分
    > - *词*（term）：一个搜索单元，表示文本中的一个词
    > - *标记*（token）：表示在字段文本中出现的词，由这个词的文本、开始和结束偏移量以及类型组成
    
  - Indices/Index
    > ▲ [倒排索引](http://es.xiaoleilu.com/052_Mapping_Analysis/35_Inverted_index.html)
    - Analyzer/Analysis
      > [分析和分析器](http://es.xiaoleilu.com/052_Mapping_Analysis/40_Analysis.html) 
      > [Elasticsearch Reference [5.1] » Analysis](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis.html)
      - 以下节选自《Elasticsearch 服务器开发(第2版)》 1.1.2小节，有改动
      > 传入文档中的数据怎样转化成倒排索引，查询文本怎么变成可被搜索的词？
      > 这个数据转化的过程被称为分析。
      > 
      > *分析*（analysis）的工作由*分析器*（analyzer）完成，它由以下内容组成：
      > - 一个*分词器*（tokenizer）
      > - 零个或多个*标记过滤器*（token filter）
      > - 零个或多个*字符映射器*（character mapper）
      
      - Analyzers
        - Pinyin
          - 中文 >> 拼音 
          - [内网测试](http://192.168.1.101:9200/goods_shelf/_analyze?analyzer=only_pinyin_analyzer&pretty=true&text=中文分词)
        - IK
          - 中文分词
          - [内网测试](http://192.168.1.101:9200/goods_shelf/_analyze?analyzer=ik_max_word&pretty=true&text=中文分词)
          
      - Tokenizers、Token Filters、Character Filters
      
        > - 分词器把文本分割成多个标记，基本就是词加上一些额外信息，比如该词在原始文本中的位置和长度。
        >   - 分词器的处理结果成为*标记流*（token stream），它是一个接一个的标记，准备被过滤器处理
        
        > - 标记过滤器用来处理标记流中的标记
        
        > - 最后，字符映射器对未经分析的文本起作用，它们在分词器之前工作。
        >   - 因此，我们可以很容易地从文本的整体部分去除HTML标签而无需担心它们被标记
  
  - Mapping、Type
    - Index:Type 1:1
      > [Index vs. Type](https://www.elastic.co/blog/index-vs-type)
    - Mapping 自动猜测
    - Mapping 变更、reIndex
    - Mapping 增加 
    - Feild Type
      > [Elasticsearch Reference [5.1] » Mapping » Field datatypes](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html)

- Search
  - bool
    > [Elasticsearch Reference [master] » Query DSL » Compound queries » Bool Query](https://www.elastic.co/guide/en/elasticsearch/reference/master/query-dsl-bool-query.html) 
    
- Aggregations
  > - [Elasticsearch Reference [master] » Aggregations » Metrics Aggregations » Sum Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/master/search-aggregations-metrics-sum-aggregation.html) 
  > - [Elasticsearch Reference [master] » Aggregations » Metrics Aggregations » Top hits Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/master/search-aggregations-metrics-top-hits-aggregation.html)
  > - [Elasticsearch Reference [master] » Aggregations » Metrics Aggregations » Value Count Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/master/search-aggregations-metrics-valuecount-aggregation.html)
  - 数据分析 
- Suggester
  > - [Elasticsearch Reference [master] » Search APIs » Suggesters » Completion Suggester](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters-completion.html) 
  > - [Elasticsearch Reference [master] » Search APIs » Suggesters » Term suggester](https://www.elastic.co/guide/en/elasticsearch/reference/master/search-suggesters-term.html)
  > - [Elasticsearch Reference [master] » Search APIs » Suggesters » Context Suggester](https://www.elastic.co/guide/en/elasticsearch/reference/master/suggester-context.html) 
  - 快速建议（索引级）
- _score

  > [Elasticsearch Reference [5.0] » Breaking changes » Breaking changes in 5.0 » Search and Query DSL changes » Default similarity](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/breaking_50_search_changes.html#_default_similarity) 
  
- 调用
  - ▲ DSL
    > [Elasticsearch Reference [5.1] » Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html) 
    
  - Client
    - RESTful API
    - ElasticSearch.js
    - Java client
    - *SQL client*
      
- ★ 业务实践
  - [Bulk:更省时的批量操作](http://es.xiaoleilu.com/030_Data/55_Bulk.html)
  - [文档局部更新](http://es.xiaoleilu.com/030_Data/45_Partial_update.html)
  - [支持script语法](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html)
  - [动态（方法）评分](https://www.elastic.co/guide/en/elasticsearch/reference/5.0/breaking_50_search_changes.html#_default_similarity)
  
### 搜索实现
> - [GitHub [MIT] : 搜索需求调研](https://github.com/occultskyrong/zzone/blob/master/doc/3.0_ElasticSearch/3.0_/ik%2Bpinyin.md)
> - [GitHub [MIT] : 搜索实现方案](https://github.com/diandainfo/ess_api/blob/master/doc/elasticsearch/search/readme.md)

- 业务需求：
  - 搜索“康师”，应能获得“康师傅”相关商品
  - 搜索“金典”、“苏小呵”等新品牌，应能获得相关商品
  - 搜索“洋河”大类品牌，应能获得“海之蓝”小类商品

- 搜索联想、autoComplete
  1. 需求描述：根据用户输入的内容进行猜测，并进行相关词的排序推荐
    - 若用户输入中文汉字，则应推荐基于前缀索引的词汇
    - 若用户输入英文字母/拼音字母，则应推荐基于“拼音（全拼、首拼） + 英文”混杂的前缀索引
    - 若用户输入中英混合，则应推荐基于“拼音+英文”混杂的前缀索引 + 基于中文字的筛选
  2. 举个栗子：
    - 中文：可乐，乐（le、yue）
    - 英文：kele，kelea，leqi（乐奇、乐器）
    - 混合：可乐d，lq
  3. 功能目标：在用户输入过程中猜测最符合用户倾向的搜索抽象词
    - 补全：在用户输入时进行建议，让用户输入更少的内容就可以完成搜索
    - 排序、推荐：提现当前的搜索趋势，根据热搜词来排序、匹配，推荐
    - 有限数量级（10）
  4. 存在问题：
    - 多音字：乐（le、yue）
    - 拼音全拼、首拼，英文的混合导致“答非所问”
    - 词汇抽象与实时状态
    - refresh Bug
    - IOS、Android缺失该功能
  5. 当下解决：
    - 将所有商品名称根据全拼、首拼的拼音拆分为两个字段A、B
    - 基于前缀匹配，将用户输入搜索词匹配A、B中至少一个
    - 前端显示搜索联想结果
  6. 规划：
    - completion suggester
      - 使用completion suggester 快速索引完成搜索
    - 搜索建议词库的维护
      - 根据用户搜索行为进行分析
        - A. 用户触发搜索行为后记录搜索结果日志
        - B. 同时记录（埋点）用户行为
          - 若用户点击“加入购物车”、或进入详情页进行查看，则说明该搜索结果满足用户期许，将该关键词搜索分+1
          - 若用户二次搜索（再次输入关键词后重新触发了搜索行为），则说明该搜索结果不满足用户期许，该关键词不准确，搜索分-1
          - 若用户（某个时间范围内）无任何动作（可能存在跳出行为），则判定同一上条
        - C. 聚合所有关键词，合计搜索分
        - D. 根据搜索分进行关键词的筛选，将合适的关键词放入词库
      - 人工干预
      - 基于推荐
    - 分词库更新与索引重建
      - 定时更新自定义词库，重建建议词索引
      - 排序的实现？   使用ES的
      - score，人工干预、推荐采取队头插入
    - 搜索词状态实时性？
      - 如何保证某个搜索词对应的商品是处于在售状态？   不关心
      - 搜索词是否需要和商品销售状态脱离？     需要脱离
    - 增加多音字词库支持
  7. *数学建模、机器学习*
          
- 关键词搜索
  1. 需求描述：根据用户搜索关键词，返回含销售状态的排序、个性化推荐的商品
  2. 举个栗子：见上*业务需求*
  3. 功能目标：
    - 返回用户搜索关键词匹配的最优解列表
    - 有限约束集，需要分页、需要区分销售状态
    - 基于既往历史的分析推荐，用户常购买、历史购买、购物车已有商品，rank在前
    - 高亮显示命中的关键词
  4. 存在问题：
    - 同义词
    - 多级分类
    - 多维度标签 
    - 同步逻辑，轮询同步时失败检测与解决
  5. 当下解决：
    - IK analyzer
    - 全命中与`like`通配符 结合
  6. 规划：
    - 多维度标签分词库维护
    - 拆分搜索为独立server
    - ESS构建为接口提供方、jsonp页面分发方
    - 摒弃`like`解决方案，强化联想，回归全文搜索（score为王）
    - 其他中文分词库的接入：结巴分词

## Future

- ES5.x

- 优化
  - 独立单机、多节点
  - 多版本并存
  - 读写节点分离

- 数据通信（参考斗鱼搜索的实现）
  - 增量数据同步的失败检测
  - 使用MQ消息中间件、长连接
  - redis队列

- 数据可视化

- 平台化/服务化
  - 平台化
    - 使用ES client向上封装一层server
      - 高并发语言（Go）实现平台化
      - 细粒度拆分，服务与接口的解耦，便于服务层进行ES版本升级
      - 读写ES的平台分离
      - 服务、接口的权限管理
    - 需要数据展示的基于平台接口二次封装（ESS）
      - 使用jsonp进行页面的分发
  - 服务分类 
    - 全文搜索（聚合）
      - 基于文档的数据检索
      - 订单数据聚合、分析
    - 日志分析
      - 从0.5到1 
      - 慢查询的发现
      - 基于调用链的全链路日志跟踪
      - 日志上下文
      - 下层监听，网络协议抓包
        - beats：packetbeats
        - 分析协议、请求，响应延时
    - GEO
      - 基于deo信息的范围搜索
    - *业务DB*
    - *运维监控*
      - 各资源使用情况

