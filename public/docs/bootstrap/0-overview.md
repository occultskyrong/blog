
    你的代码不只是你自己看

*在此感谢Bootstrap开源项目，及本文中用到各种技术文档作者、博客主人，不一一列举。特此感谢！*
## 声明：
- 本文遵循MIT开源协议，基于开源协议撰写的内容，任何人可以以任何形式来进行使用和二次发布。但其所造成的问题本人不负一切法律责任。
- 对本文涉及的基于MIT协议的内容，不再赘述。特此感谢原作者。

---
	本文主要用于快速了解Bootstrap框架中常用的内容，包括css效果和对应less及js效果。
	使用bootstrap的目的是更快、更好的去开发具有相对普适性的页面效果。

## 内容
### 1. [栅格系统](http://v3.bootcss.com/css/#grid)
- 方便布局和根据页面宽度来调整元素的宽度，使用栅格系统，可以更好的匹配不同分辨率的页面效果。
### 2. [排版](http://v3.bootcss.com/css/#type)
- 排版内部包含大量零碎的内容，用来更快的显示一些常用的效果。非必要，可自行设计。
### 3. [表格](http://v3.bootcss.com/css/#tables)
- 表格效果，包括条纹状表格、带边框表格等。可看具体效果来选择使用。
- PS1：因bt的table使用的padding和margin比较大，所以建议直接使用[紧缩表格](http://v3.bootcss.com/css/#tables-condensed)来减少表格的padding，也可以自行设置。
- PS2：表格的全局居中方式为text-align:center;内部table中具体调整，列属性为名称时使用左对齐，列属性为金额、数量等纯数字的内容使用右对齐。
### 4. [表单](http://v3.bootcss.com/css/#forms)
- 4.1、表单主要需要注意form-control、form-group效果，圆角的输入框和内容提示虚化可以更好的去浏览。还有其他label和input在一行，label中for和input中id的绑定（尤其是select，一款比较炫的select插件[Select2](http://select2.github.io/examples.html)）。
- 4.2、具体的单选按钮和多选按钮组可使用另外的[iCheck](http://www.bootcss.com/p/icheck/)插件。
- 4.3、表单的构造可以使用[在线表单构造器](http://www.bootcss.com/p/bootstrap-form-builder/)，但要注意代码的规范性。
- 4.4、表单中最常用的[输入框组](http://v3.bootcss.com/components/#input-groups)
### 5. [按钮](http://v3.bootcss.com/css/#buttons)及[按钮组](http://v3.bootcss.com/components/#btn-groups)，[行内按钮效果](http://v3.bootcss.com/javascript/#buttons)
- 按钮讲究的主要是统一的效果和颜色组，中文站提供的另一套按钮组[Buttons](http://www.bootcss.com/p/buttons/)
### 6. 图标
- 几个常用的icon font字体图标字库，建议选择一个图标字库来配置使用。
  - 6.1、[阿里icon font字库](http://www.iconfont.cn/)
  - 6.2、[fontello](http://fontello.com/)
  - 6.3、[icomoon](http://icomoon.io/app/#/select)
  - 6.4、[Font-Awesome git](http://fortawesome.github.io/Font-Awesome/)或者[Font Awesome 中文站](http://www.bootcss.com/p/font-awesome/)
  - 6.5、[Glyphicon Halflings](http://glyphicons.com/)，[Bootstrap可免费使用图标](http://v3.bootcss.com/components/#glyphicons)
### 7. [下拉菜单](http://v3.bootcss.com/components/#dropdowns)
- 可使用hover+延迟事件来实现同样的效果，主要用于header和右边栏部分。
  - [导航](http://v3.bootcss.com/components/#nav)，主要应用是[css标签页](http://v3.bootcss.com/components/#nav-tabs)，[js标签页](http://v3.bootcss.com/javascript/#tabs)
  - [导航条](http://v3.bootcss.com/components/#navbar)包含多数导航条的效果，可参考。
  - [路径导航](http://v3.bootcss.com/components/#breadcrumbs)，即[面包屑导航](http://www.chinaz.com/web/2014/1124/374939.shtml)，10个[css面包屑](http://www.wzsky.net/html/Website/Experience/118822.html)
### 8. [分页](http://v3.bootcss.com/components/#pagination)
- 可直接使用bootstrap提供的Paginator插件或者Datatables插件来实现分页效果。前者适合跨行和有特殊样式效果需求的分页，后者适合表格的分页。[参考一](http://my.oschina.net/shunshun/blog/204587)、[参考二](http://www.cnblogs.com/william-lin/p/3909613.html)、[nodejs+paginator使用方法](http://blog.fens.me/nodejs-bootstrap-paginator/)
### 9. [标签](http://v3.bootcss.com/components/#labels)和[徽章](http://v3.bootcss.com/components/#badges)
- 两者主要提供更好的页面效果，标签可用来突出某个数据，徽章用于浮动的显示数值效果。红包数量、消息数量等情形可用。
- 徽章效果也可参考Frozenjs，即腾讯手机端的[辅助类-红点效果](http://frozenui.github.io/frozenui/)。

### 10. [面板](http://v3.bootcss.com/components/#panels)
- 一个最为常用的布局方式，可将整合页面拆分为几个面板来进行布局。类似于早期的frame效果。
### 11. [模态框](http://v3.bootcss.com/javascript/#modals)
- 最为常用的消息提示方式，页面弹窗尽量不要使用alert，模态框可定制为信息提示框、确认框两种。

### 12. [滚动监听](http://v3.bootcss.com/javascript/#scrollspy)
- 替代原始的锚点

### 13. 一些其他可能用到的技术点
- 主要用于提示用户，隐藏和展示效果。
  - [工具提示](http://v3.bootcss.com/javascript/#tooltips)
  - [js警告框](http://v3.bootcss.com/javascript/#alerts)和[css警告框](http://v3.bootcss.com/components/#alerts)
  - [弹出框](http://v3.bootcss.com/javascript/#popovers)
  - [弹窗插件](http://www.bujichong.com/sojs/sobox/index.html)
  - [引导插件](http://bootstraptour.com/)
- **遮盖层**
  - [瀑布流](http://www.17sucai.com/pins/tag/548.html)

### 14. [轮播插件](http://v3.bootcss.com/javascript/#carousel)
- 主要用户展示图片或者公告信息。具有一定的幻灯片效果。

---
## Plugin

---

### 15. [Datatables](http://dt.thxopen.com/example/)
- 一个强大的表格数据显示插件。

### 20. 其他值得收藏和参考的站点或网页：
  - 腾讯手机端css库[FrozenUI](http://frozenui.github.io/frozenui/)和[JMUI](http://alloyteam.github.io/Spirit/modules/JMUI/demo.html)
  - [精选12个时尚的 CSS3 效果](http://www.yyyweb.com/3103.html)
  - [easyUi](http://www.jeasyui.net/)
  - [鑫空间，前端技术博客](http://www.zhangxinxu.com/php/)



