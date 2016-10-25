
# 开发中遇到的坑

## 1. 百度地图API

### 1.0 百度地图使用的坐标数据与其他地图的不同
- 参见[ 常见问题 > 使用须知 > 坐标体系 ](http://lbsyun.baidu.com/index.php?title=open/question#.E5.9D.90.E6.A0.87.E4.BD.93.E7.B3.BB)

### 1.1 鹰眼轨迹中entity，必须先addColumn，然后才能在addEntity中使用某个column，类似于表结构的创建。
- [addcolumn——添加entity属性字段](http://lbsyun.baidu.com/index.php?title=yingyan/api/entity#addcolumn.E2.80.94.E2.80.94.E6.B7.BB.E5.8A.A0entity.E5.B1.9E.E6.80.A7.E5.AD.97.E6.AE.B5)
- [add——添加entity](http://lbsyun.baidu.com/index.php?title=yingyan/api/entity#add.E2.80.94.E2.80.94.E6.B7.BB.E5.8A.A0entity)
- 不要告诉所有的数据库都需要先创建表结构才能写入某列，Elasticsearch就不是，大部分nosql的大概都不需要，因为是动态索引。（无意探究此问题）

### 1.2 地图图层中marker的click事件的主动触发
- 类似于百度地图中搜素一个地点，左边栏显示地点列表，点击地点列表中某个shape时，主地图中弹出一个infoBox显示一些详细信息
- 声明 ：左边栏中地点元素为 itemPoint , 主地图中shape元素为new BMap.Marker()的结果 marker
- 实现 ：
 - 将marker存到一个数组markers（可以设置为全局变量）中，每个itemPoint中使用data-index存储该marker在markers的位置序号
 - 点击itemPoint时，获取data-index中marker的序号，读取markers对应位置的marker
 - marker的addEventListener('click',callback)，将callback封装一层callInfoBox()，多数逻辑在callInfoBox中实现
  
- 部分源码:
 ```
 var _point = new BMap.Point(lon, lat)
     , _ = new BMapLib.RichMarker(html, _point);//创建富文本标注
 markerPoints.push(_point);
 map.addOverlay(_);//将标注添加到地图中
 $('.map-shape[data-mid="' + mid + '"]').parent().css('background', 'none');
 _.addEventListener('click', callback);

 // 列表中标注点击事件的监听
 var pointListener = function () {
     $('#salesman_list').on('click', '.item-point', function () {
         var index = $(this).data('index');
         if (index >= 0) {
             callInfoMarker(markers[index]);
             //将该点移到中间
             map.setCenter(markerPoints[index]);
         }
     });
 };

 // 销毁弹出层
 var removeInfoMarker = function () {
     if (infoMarker) {
         infoMarker.remove();//销毁已有的层
     }
 };
 // 召唤弹出层
 var callInfoMarker = function (marker) {
     var mid = $(marker.getContent()).data('mid')
         , sm = salesman[mid];
     removeInfoMarker();//清除原有弹出层
     //todo 弹出层
     var html = '<div class="" style="height: 100%;width: 100%;background-color: deepskyblue;">' +
         '<div class="" style="height: 34px;width: 200px;">' + sm['name'] + '</div>' +
         '<div>' + sm['address'] + '</div>' +
         '</div>';
     infoMarker = new BMapLib.RichMarker(html, marker.getPosition(), {
         "anchor": new BMap.Size(-50, -100),
         width: 500,
         height: 400
     });
     map.addOverlay(infoMarker);
 };
 // 单击标注点的响应
 var callback = function () {
     callInfoMarker(this);
 };
 ```
