---
title: あしあと帳ガジェット更新
author: Eiji
layout: post
permalink: /archives/554
syntaxhighlighter_encoded:
  - 1
SBM_count:
  - '00000<>1271388438<>0<>0<>0<>0<>0'
disable_wpautop:
  - 1
disable_wptexturize:
  - 1
disable_convert_chars:
  - 1
disable_convert_smilies:
  - 1
categories:
  - FriendConnect
  - Google
tags:
  - Gadget
---
<div class="wp_plus_one_button" style="margin: 0 8px 8px 0; float:left; ">
  <g:plusone href="http://devlog.agektmr.com/archives/554" callback="wp_plus_one_handler"></g:plusone>
</div>

昨日SocialWeb Blogで紹介して頂いたあしあとガジェットですが、早速多数のフィードバックを頂いています。その中から、2点の改善を行いましたのでご紹介します。

## あしあとの表示件数を設定

<pre class="brush: jscript; title: ; notranslate" title="">&lt;br /&gt;{ id: 'div-1231298385220',&lt;br /&gt;    'view-params': {&lt;br /&gt;    'maxDisplay': '15'&lt;br /&gt;  },&lt;br /&gt;  url:'http://gadgets.agektmr.com/Footprints/friendconnect.xml',&lt;br /&gt;  site: '00268510882932422418'&lt;br /&gt;},&lt;br /&gt;</pre>

あしあとは有無を言わさず10件表示する作りになっていましたが、HTMLに埋め込むコードの中に設定値を書き込むことで、変更できるようにしました。view-paramsを追加してmaxDisplayで表示したいあしあと数を指定してください。3から20の範囲で指定することができます。

## スキンを設定

<pre class="brush: jscript; title: ; notranslate" title="">&lt;br /&gt;var skin = {};&lt;br /&gt;skin['BORDER_COLOR'] = '#cccccc';&lt;br /&gt;skin['ENDCAP_BG_COLOR'] = '#e0ecff';&lt;br /&gt;skin['ENDCAP_TEXT_COLOR'] = '#000000';&lt;br /&gt;skin['ENDCAP_LINK_COLOR'] = '#0000cc';&lt;br /&gt;skin['ALTERNATE_BG_COLOR'] = '#ffffff';&lt;br /&gt;skin['CONTENT_BG_COLOR'] = '#ffffff';&lt;br /&gt;skin['CONTENT_LINK_COLOR'] = '#0000cc';&lt;br /&gt;skin['CONTENT_TEXT_COLOR'] = '#333333';&lt;br /&gt;skin['CONTENT_SECONDARY_LINK_COLOR'] = '#7777cc';&lt;br /&gt;skin['CONTENT_SECONDARY_TEXT_COLOR'] = '#666666';&lt;br /&gt;skin['CONTENT_HEADLINE_COLOR'] = '#000000';&lt;br /&gt;</pre>

デザインの一部として色を変更できるようにしました。GFCサイトからコピーした時点で含まれているskinの値を変更することで対応できます。実際に有効な値は下記の通り：

BG_COLOR: 全体の背景色  
FONT_COLOR: フォント色  
CONTENT\_HEADLINE\_COLOR: ヘッダ文字色  
ENDCAP\_TEXT\_COLOR: フッタ文字色  
ALTERNATE\_BG\_COLOR: あしあと背景色