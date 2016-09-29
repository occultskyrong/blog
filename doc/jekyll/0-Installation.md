
> 从0开始 - jekyll 

>> createdAt @ 2016年9月29日17:39:48
>>> OS 名称:          Microsoft Windows 7 旗舰版 

>>> OS 版本:          6.1.7601 Service Pack 1 Build 7601

# 0. Installation
- **安装、部署**


## Step

### 1. 安装jekyll 
- jekyll官网:[http://jekyllrb.com/](http://jekyllrb.com/)
- jekyll中文站[http://jekyll.com.cn/](http://jekyll.com.cn/)

#### 1.1 安装gem
- 淘宝gem已不再维护，别用淘宝的gem镜像了，[Ruby China 的 RubyGems 镜像上线](https://ruby-china.org/topics/29250)
- gem 国内镜像使用说明: [RubyGems 镜像- Ruby China](https://gems.ruby-china.org/)
  - 还有要注意以下：https可能不能用...
  
  > 如果遇到 SSL 证书问题，你又无法解决，请直接用 http://gems.ruby-china.org 避免 SSL 的问题。
  
  ```
	gem sources --add http://gems.ruby-china.org/ --remove https://rubygems.org/
  ```
  - 假如你想解决，查看
    - [https://github.com/ruby-china/rubygems-mirror/issues/5](https://github.com/ruby-china/rubygems-mirror/issues/5)
    - [https://ruby-china.org/topics/24840](https://ruby-china.org/topics/24840)
  - 如果切换为http还不行，查看你的DNS，我切换DNS到8.8.8.8之后可以了
  
- github：[rubygems/rubygems](https://github.com/rubygems/rubygems)
- 当下版本

  ```
  $ gem -v
  >> 2.6.7
  ```

#### 1.2 安装jekyll
- 使用gem安装jekyll  

  ```
  gem install jekyll
  ```

### 2. 使用jekyll创建项目
- cd 到一个合适的项目位置
- `jekyll new [项目名称]`
- cd 到项目目录下
- `jekyll serve` 启动项目
  - 报错:
  ```
	d:/Ruby200-x64/lib/ruby/site_ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require': cannot load such file -- bundler (LoadError)
		from d:/Ruby200-x64/lib/ruby/site_ruby/2.0.0/rubygems/core_ext/kernel_require.rb:55:in `require'
		from d:/Ruby200-x64/lib/ruby/gems/2.0.0/gems/jekyll-3.2.1/lib/jekyll/plugin_manager.rb:34:in `require_from_bundler'
		from d:/Ruby200-x64/lib/ruby/gems/2.0.0/gems/jekyll-3.2.1/exe/jekyll:9:in `<top (required)>'
		from d:/Ruby200-x64/bin/jekyll:22:in `load'
		from d:/Ruby200-x64/bin/jekyll:22:in `<main>'
  ```
  - 解决:
  
  	```
	gem install bundler
	bundle install
  	```
  - 参考
   	- [cannot load such file — bundler/setup (LoadError)](http://stackoverflow.com/questions/19061774/cannot-load-such-file-bundler-setup-loaderror)
	- [ruby bundle install require: no such files to load error](http://stackoverflow.com/questions/16435433/ruby-bundle-install-require-no-such-files-to-load-error)
- 再次启动项目
  - 再次报错，但是项目已经启动了，大概是说需要安装 `wdm`
  ```
	Configuration file: Z:/Jekyll/blog/_config.yml            Source: Z:/Jekyll/blog
       Destination: Z:/Jekyll/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating... 
Error reading file d:/Ruby200-x64/lib/ruby/gems/2.0.0/gems/minima-1.2.0/_layouts/default.html: No such file or directory - /Ruby200-x64/lib/ruby/gems/2.0.0/gems/minima-1.2.0/_layouts/default.html 
Error reading file d:/Ruby200-x64/lib/ruby/gems/2.0.0/gems/minima-1.2.0/_layouts/page.html: No such file or directory - /Ruby200-x64/lib/ruby/gems/2.0.0/gems/minima-1.2.0/_layouts/page.html 
Error reading file d:/Ruby200-x64/lib/ruby/gems/2.0.0/gems/minima-1.2.0/_layouts/post.html: No such file or directory - /Ruby200-x64/lib/ruby/gems/2.0.0/gems/minima-1.2.0/_layouts/post.html 
                    done in 0.341 seconds.  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'Z:/Jekyll/blog'
Configuration file: Z:/Jekyll/blog/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
  ```
  - 尝试安装wdm
  
  ``` 
  gem install wdm 
  ```
   - 报错，大概是需要安装一个 `build tools` (构建工具？)
	  
	```
	ERROR:  Error installing wdm:
		The 'wdm' native gem requires installed build tools.

	Please update your PATH to include build tools or download the DevKit
	from 'http://rubyinstaller.org/downloads' and follow the instructions
	at 'http://github.com/oneclick/rubyinstaller/wiki/Development-Kit'
	```
	
	- ~~看了一下，可能是我ruby版本太低 `ruby -v`~~
	  
	```
	ruby 2.0.0p451 (2014-02-24) [x64-mingw32]
	```
	- ~~更新一下ruby版本，去 [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/) 下载一个最新的安装上.PS:先删除老版本，再安装新版本~~

	```
	ruby 2.3.1p112 (2016-04-26 revision 54768) [x64-mingw32]
	```
    - ~~需要把上边的重来一遍~~
    - 查看[The 'json' native gem requires installed build tools](http://stackoverflow.com/questions/8100891/the-json-native-gem-requires-installed-build-tools)
    	- [下载安装DevKit](http://rubyinstaller.org/downloads/archives)
 
- 浏览器访问`http://localhost:4000`
- 此时应为一片空白？我服
