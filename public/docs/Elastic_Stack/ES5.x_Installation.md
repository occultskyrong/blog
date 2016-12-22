
# ElasticSearch v5.x 版本安装

## 安装版本说明
- 时间: 2016年12月22日16:45:57
-

## Step

- 访问 https://www.elastic.co/downloads/elasticsearch 查看最新版本
- 下载tar压缩包
- 解压.tar.gz
  ```
  tar -xzvf elasticsearch-5.1.1.tar.gz
  ```
- 运行 解压目录下 `bin/elasticsearch`
  - 报错
      ```
      [2016-12-22T16:55:46,240][WARN ][o.e.b.JNANatives         ] unable to install syscall filter:
      java.lang.UnsupportedOperationException: seccomp unavailable: requires kernel 3.5+ with CONFIG_SECCOMP and CONFIG_SECCOMP_FILTER compiled in
        at org.elasticsearch.bootstrap.Seccomp.linuxImpl(Seccomp.java:349) ~[elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Seccomp.init(Seccomp.java:630) ~[elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.JNANatives.trySeccomp(JNANatives.java:215) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Natives.trySeccomp(Natives.java:99) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Bootstrap.initializeNatives(Bootstrap.java:105) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Bootstrap.setup(Bootstrap.java:176) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Bootstrap.init(Bootstrap.java:306) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:121) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Elasticsearch.execute(Elasticsearch.java:112) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.cli.SettingCommand.execute(SettingCommand.java:54) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.cli.Command.mainWithoutErrorHandling(Command.java:96) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.cli.Command.main(Command.java:62) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:89) [elasticsearch-5.1.1.jar:5.1.1]
        at org.elasticsearch.bootstrap.Elasticsearch.main(Elasticsearch.java:82) [elasticsearch-5.1.1.jar:5.1.1]
      ```
  - 解决
    - https://discuss.elastic.co/t/java-lang-unsupportedoperationexception-on-starting-elasticsearch/64548
    - https://discuss.elastic.co/t/elasticsearch-warn-unable-to-install-syscall-filter/42819/3
  - `/config/elasticsearch.yml`中设置 `bootstrap.seccomp: false`