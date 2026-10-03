---
title: Guestbook Gadget Update
author: Eiji
layout: post
lang: en
date: 2009-06-27
categories:
  - FriendConnect
  - Google
tags:
  - Gadget
translationOf: /2009/06/footprints-gadget-updated.html
translated: 2026-10-03
translatedManually: false
---
Following the introduction of the Footprints gadget on the SocialWeb Blog yesterday, I've already received a lot of feedback. Based on that, I've made two improvements, which I'd like to share here.

## Configure the number of footprints displayed

<pre class="brush: jscript; title: ; notranslate" title="">&lt;br /&gt;{ id: 'div-1231298385220',&lt;br /&gt;    'view-params': {&lt;br /&gt;    'maxDisplay': '15'&lt;br /&gt;  },&lt;br /&gt;  url:'http://gadgets.agektmr.com/Footprints/friendconnect.xml',&lt;br /&gt;  site: '00268510882932422418'&lt;br /&gt;},&lt;br /&gt;</pre>

Previously, the gadget was built to display 10 footprints by default without any option to change it, but you can now customize this by including configuration values in the code embedded in your HTML. Add `view-params` and specify the number of footprints you want to display with `maxDisplay`. You can set a value between 3 and 20.

## Configure the skin

<pre class="brush: jscript; title: ; notranslate" title="">&lt;br /&gt;var skin = {};&lt;br /&gt;skin['BORDER_COLOR'] = '#cccccc';&lt;br /&gt;skin['ENDCAP_BG_COLOR'] = '#e0ecff';&lt;br /&gt;skin['ENDCAP_TEXT_COLOR'] = '#000000';&lt;br /&gt;skin['ENDCAP_LINK_COLOR'] = '#0000cc';&lt;br /&gt;skin['ALTERNATE_BG_COLOR'] = '#ffffff';&lt;br /&gt;skin['CONTENT_BG_COLOR'] = '#ffffff';&lt;br /&gt;skin['CONTENT_LINK_COLOR'] = '#0000cc';&lt;br /&gt;skin['CONTENT_TEXT_COLOR'] = '#333333';&lt;br /&gt;skin['CONTENT_SECONDARY_LINK_COLOR'] = '#7777cc';&lt;br /&gt;skin['CONTENT_SECONDARY_TEXT_COLOR'] = '#666666';&lt;br /&gt;skin['CONTENT_HEADLINE_COLOR'] = '#000000';&lt;br /&gt;</pre>

You can now customize colors as part of the design. You can adjust them by modifying the `skin` values included when copying the code from the GFC site. The values that actually take effect are as follows:

BG_COLOR: Overall background color  
FONT_COLOR: Font color  
CONTENT\_HEADLINE\_COLOR: Header text color  
ENDCAP\_TEXT\_COLOR: Footer text color  
ALTERNATE\_BG\_COLOR: Footprint background color
