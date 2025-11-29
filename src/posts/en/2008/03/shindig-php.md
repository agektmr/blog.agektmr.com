---
layout: post
lang: en
title: 'Try the PHP version of Shindig'
description: ''
date: 2008-03-17
tags:
- Gadget
  - OpenSocial
  - php
  - Shindig
  - Widget
translationOf: /2008/03/shindig-php.html
translated: 2025-11-29
translatedManually: false
---

I learned at the recent Google Developer Networking Event that a PHP version of Shindig had been released, so I gave it a try.

## Check out Shindig

```
> svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .
```

The Shindig source is checked out. (The revision used here is 637739.)

```
> ln -s ~/Development/Shindig/php/gadgets /Library/WebServer/Documents/gadgets
```

You should now be able to view it on your localhost. Enter the following URL in your browser:

```
http://localhost/gadgets/ifr?url=http://www.labpixies.com/campaigns/todo/todo.xml
```

[![NotFound](/images/2008/03/notfound.jpg)](/images/2008/03/notfound.jpg)

I can't see it...

## Modify httpd.conf

It seems that the default settings in Mac OS X (Leopard)'s httpd.conf are interfering.

```
/etc/apache2/httpd.conf
```

Note that this is not /etc/httpd/httpd.conf (Tiger's was this).

```
<Directory "/Library/WebServer/Documents"> 
```

Within

```
AllowOverride None
```

of

```
AllowOverride All
```

Change it to this. This should work...

[![ToDoGadget](/images/2008/03/todogadget.jpg)](/images/2008/03/todogadget.jpg)

Done! Now you can tweak it in various ways...
