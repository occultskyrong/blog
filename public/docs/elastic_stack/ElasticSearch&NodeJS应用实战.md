# Elasticsearch在NodeJS项目开发中的应用实践
- 以下，`NodeJS` 简称 `node`，`ElasticSearch` 简称 `ES`
- ES 服务器版本为 `2.3.4`，搭设在 `CentOS release 6.5 (Final)` 系统版本下
- node使用版本为 `v6.2.0`

## node中ES的应用实践
- 使用 `elasticsearch.js` module 进行 ES 上层开发，版本为 `^12.1.3`（可升级至最新版本）
- 实例化连接ES时，注意指定 `apiVersion` 与服务器中ES版本相同（即 `2.3.4`）
  > 具体参数配置见 <[elasticsearch.js » Configuration](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html)>
- 以下，`elasticsearch.js` 此 `module` 简称为 `ES.js` 

## 读写分离的实践
- ES中读写节点分离：master node和client node的分离，屏蔽data node
- node中自定义环境变量用于指定当前节点的IO类型
- *//TODO 具体实现逻辑，待补充*

## `Scroll` 接口的使用
- 分页读取数据，大于10000条之后使用Scroll
  > 参见 <[Elasticsearch Reference [2.3] » Search APIs » Request Body Search » From / Size](https://www.elastic.co/guide/en/elasticsearch/reference/2.3/search-request-from-size.html)> 中：
  
  > Note that from + size can not be more than the index.max_result_window index setting which defaults to 10,000. See the Scroll API for more efficient ways to do deep scrolling.
  
  > `Scroll` 说明见 <[Elasticsearch Reference [2.3] » Search APIs » Request Body Search » Scroll](https://www.elastic.co/guide/en/elasticsearch/reference/2.3/search-request-scroll.html)>
- `ES.js` 中 ，使用 `Scroll` 进行查询
  > 参见 <[elasticsearch.js » 2.3 API » scroll](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference-2-3.html#api-scroll-2-3)>
  
  引用以下源代码中 
  ```
  var allTitles = [];
 
  // first we do a search, and specify a scroll timeout
  client.search({
    index: 'myindex',
    // Set to 30 seconds because we are calling right back
    scroll: '30s',
    search_type: 'scan',
    fields: ['title'],
    q: 'title:test'
  }, function getMoreUntilDone(error, response) {
    // collect the title from each response
    response.hits.hits.forEach(function (hit) {
      allTitles.push(hit.fields.title);
    });
  
    if (response.hits.total !== allTitles.length) {
      // now we can call scroll over and over
      client.scroll({
        scrollId: response._scroll_id,
        scroll: '30s'
      }, getMoreUntilDone);
    } else {
      console.log('every "test" title', allTitles);
    }
  });
  ```
    - 应将 ```if (response.hits.total !== allTitles.length) ``` 条件判断语句改为 `size>_allTitles.length`，即递归终止条件为**已完成查询的数据量等于所需分页单页数据量**。
