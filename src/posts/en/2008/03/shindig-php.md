---
title: Trying out the PHP version of Shindig
layout: post
lang: en
date: 2008-03-17
tags:
  - Gadget
  - OpenSocial
  - php
  - Shindig
  - Widget
translationOf: /2008/03/shindig-php.html
translated: 2026-10-03
translatedManually: false
---
At the recent Google Developer meetup, I learned that a PHP version of Shindig has been released, so I decided to give it a try.

## Checking out Shindig

```
> svn co http://svn.apache.org/repos/asf/incubator/shindig/trunk .
```

This checks out the Shindig source code. (The revision I tested this time was 637739)

```
> ln -s ~/Development/Shindig/php/gadgets /Library/WebServer/Documents/gadgets
```

With this, it should be viewable on localhost. Enter the following URL into your browser:

```
http://localhost/gadgets/ifr?url=http://www.labpixies.com/campaigns/todo/todo.xml
```

[![NotFound](/images/2008/03/notfound.jpg)](/images/2008/03/notfound.jpg)

It doesn't work...

## Modifying httpd.conf

Apparently, the default settings in Mac OS X (Leopard)'s httpd.conf seem to be getting in the way.

Edit:

```
/etc/apache2/httpd.conf
```

Note that it's not `/etc/httpd/httpd.conf` (which was the case in Tiger).

Change:

```
AllowOverride None
```

inside:

```
<Directory "/Library/WebServer/Documents"> 
```

to:

```
AllowOverride All
```

This should do the trick...

[![ToDoGadget](/images/2008/03/todogadget.jpg)](/images/2008/03/todogadget.jpg)

It worked! Now I can start playing around with it...
