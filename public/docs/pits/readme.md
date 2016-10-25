
# 开发中遇到的坑

## 1. 百度地图API

### 1.1 鹰眼轨迹中entity，必须先addColumn，然后才能在addEntity中使用某个column，类似于表结构的创建。
- [addcolumn——添加entity属性字段](http://lbsyun.baidu.com/index.php?title=yingyan/api/entity#addcolumn.E2.80.94.E2.80.94.E6.B7.BB.E5.8A.A0entity.E5.B1.9E.E6.80.A7.E5.AD.97.E6.AE.B5)
- [add——添加entity](http://lbsyun.baidu.com/index.php?title=yingyan/api/entity#add.E2.80.94.E2.80.94.E6.B7.BB.E5.8A.A0entity)
- 不要告诉所有的数据库都需要先创建表结构才能写入某列，Elasticsearch就不是，大部分nosql的大概都不需要，因为是动态索引。（无意探究此问题）

### 1.2 地图图层中marker的click事件触发
- 
