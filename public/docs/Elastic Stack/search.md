
# 搜索实现的简单说明

### 标记说明
|标记内容|说明|
|:--|:--|
|无标记|顺序说明，不予扩展|
|★|展开介绍|
|▲|强烈建议自行查看（如果你想要使用ES，这部分内容必须查看，有助于理解如何使用ES）|

## 参考资料
- [elastic/elasticsearch-definitive-guide](https://github.com/elastic/elasticsearch-definitive-guide)
- [《Elasticsearch: 权威指南》](http://106.186.120.253/preview/foreword_id.html)
- [Elasticsearch 权威指南（中文版）](http://es.xiaoleilu.com/)
- 《Elasticsearch服务器开发(第2版)》

## ElasticSearch
- 前言

  > Elasticsearch 是一个分布式、可扩展、实时的搜索与数据分析引擎。 
  > 它能从项目一开始就赋予你的数据以搜索、分析和探索的能力，这是通常没有预料到的。 
  > 它存在还因为原始数据如果只是躺在磁盘里面根本就毫无用处。
  
  > Elasticsearch 不仅仅只是全文搜索，我们还将介绍结构化搜索、数据分析、复杂的语言处理、地理位置和对象间关联关系等。 
  > 我们还将探讨如何给数据建模来充分利用 Elasticsearch 的水平伸缩性，以及在生产环境中如何配置和监视你的集群。

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
      - Tokenizers
        > - 分词器把文本分割成多个标记，基本就是词加上一些额外信息，比如该词在原始文本中的位置和长度。
        > 分词器的处理结果成为*标记流*（token stream），它是一个接一个的标记，准备被过滤器处理
        > - 标记过滤器用来处理标记流中的标记
        > - 最后，字符映射器对未经分析的文本起作用，它们在分词器之前工作。
        > 因此，我们可以很容易地从文本的整体部分去除HTML标签而无需担心它们被标记
         
      - Token Filters
      - Character Filters
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
  
### 搜索实现
> - [GitHub [MIT] : occultskyrong/zzone/doc/3.0_ElasticSearch/3.0_/ik+pinyin.md](https://github.com/occultskyrong/zzone/blob/master/doc/3.0_ElasticSearch/3.0_/ik%2Bpinyin.md)
> - [GitHub [MIT] : diandainfo/ess_api/doc/elasticsearch/search/readme.md](https://github.com/diandainfo/ess_api/blob/master/doc/elasticsearch/search/readme.md)

- 搜索建议
  - 需求：
  - 基于前缀索引的建议
  - completion suggester
  - 搜索建议的来源：搜索建议词库的维护
    - 根据用户搜索行为进行分析
      - A. 用户触发搜索行为后记录搜索结果日志
      - B. 同时记录（埋点）用户行为
        - 若用户点击“加入购物车”、或进入详情页进行查看，则说明该搜索结果满足用户期许，将该关键词搜索分+1
        - 若用户二次搜索（再次输入关键词后重新触发了搜索行为），则说明该搜索结果不满足用户期许，该关键词不准确，搜索分-1
        - 若用户（某个时间范围内）无任何动作（可能存在跳出行为），则判定同一上条
      - C. 聚合所有关键词，合计搜索分
- 关键词搜索
  - 基于分词的搜索
  - IK analyzer
  - search
- GEO

## Future
- 平台化/服务化
  - 全文搜索
  - 日志分析
  - GEO
  - 业务DB

