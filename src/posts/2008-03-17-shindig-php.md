---
title: Shindigのphp版を試す
layout: post
date: 2008-03-17
tags:
  - Gadget
  - OpenSocial
  - php
  - Shindig
  - Widget
---

先日のGoogleディベロッパー交流会でShindigのphp版が公開されていることを知り、試してみました。

## Shindigをチェックアウトする

```
> svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .
```

Shindigのソースがチェックアウトされます。(今回試したリビジョンは637739)

```
> ln -s ~/Development/Shindig/php/gadgets /Library/WebServer/Documents/gadgets
```

これでローカルホスト上で見れるはず。ブラウザに下記のURLを入力します。

```
http://localhost/gadgets/ifr?url=http://www.labpixies.com/campaigns/todo/todo.xml
```

[![NotFound](/images/2008/03/notfound.jpg)](/images/2008/03/notfound.jpg)

見れません、、、

## httpd.confを修正

どうやら、Mac OS X(Leopard)のhttpd.confのデフォルト 設定が邪魔している模様。

```
/etc/apache2/httpd.conf
```

を書き換えます。/etc/httpd/httpd.confではないことに注意。(Tigerはこれだった)

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
