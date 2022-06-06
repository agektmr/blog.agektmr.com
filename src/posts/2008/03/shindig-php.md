---
title: Shindig の php 版を試す
layout: post
date: 2008-03-17
tags:
  - Gadget
  - OpenSocial
  - php
  - Shindig
  - Widget
---

先日の Google ディベロッパー交流会で Shindig の php 版が公開されていることを知
り、試してみました。

## Shindig をチェックアウトする

```
> svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .
```

Shindig のソースがチェックアウトされます。(今回試したリビジョンは 637739)

```
> ln -s ~/Development/Shindig/php/gadgets /Library/WebServer/Documents/gadgets
```

これでローカルホスト上で見れるはず。ブラウザに下記の URL を入力します。

```
http://localhost/gadgets/ifr?url=http://www.labpixies.com/campaigns/todo/todo.xml
```

[![NotFound](/images/2008/03/notfound.jpg)](/images/2008/03/notfound.jpg)

見れません、、、

## httpd.conf を修正

どうやら、Mac OS X(Leopard)の httpd.conf のデフォルト設定が邪魔している模様。

```
/etc/apache2/httpd.conf
```

を書き換えます。/etc/httpd/httpd.conf ではないことに注意。(Tiger はこれだった)

```
<Directory "/Library/WebServer/Documents"> 
```

内の

```
AllowOverride None
```

を

```
AllowOverride All
```

に変更します。これでいけるはず。。。

[![ToDoGadget](/images/2008/03/todogadget.jpg)](/images/2008/03/todogadget.jpg)

できた！これで、色々いじれますよ・・・
