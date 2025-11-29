---
layout: post
lang: en
title: 'Footprints gadget update'
description: ''
date: 2009-06-27
tags:
- Gadget
translationOf: /2009/06/footprints-gadget-updated.html
translated: 2025-11-29
translatedManually: false
---
The Footprint Gadget was introduced on the SocialWeb Blog yesterday, and we have already received a lot of feedback. We have made two improvements based on that feedback, which we would like to introduce to you.

## Set the number of footprints to display

<pre class="brush: jscript; title: ; notranslate" title="">&lt;br /&gt;{ id: 'div-1231298385220',&lt;br /&gt; 'view-params': {&lt;br /&gt; 'maxDisplay': '15'&lt;br /&gt; },&lt;br /&gt; url:'http://gadgets.agektmr.com/Footprints/friendconnect.xml',&lt;br /&gt; site: '00268510882932422418'&lt;br /&gt;},&lt;br /&gt;</pre>

Previously, 10 footprints were displayed automatically, but now you can change this by writing a setting value in the code embedded in the HTML. Add view-params and specify the number of footprints you want to display with maxDisplay. You can specify a value between 3 and 20.

## Set skin

<pre class="brush: jscript; title: ; notranslate" title="">&lt;br /&gt;var skin = {};&lt;br /&gt;skin['BORDER_COLOR'] = '#cccccc';&lt;br /&gt;skin['ENDCAP_BG_COLOR'] = '#e0ecff';&lt;br /&gt;skin['ENDCAP_TEXT_COLOR'] = '#000000';&lt;br /&gt;skin['ENDCAP_LINK_COLOR'] = '#0000cc';&lt;br /&gt;skin['ALTERNATE_BG_COLOR'] = '#ffffff';&lt;br /&gt;skin['CONTENT_BG_COLOR'] = '#ffffff';&lt;br /&gt;skin['CONTENT_LINK_COLOR'] = '#0000cc';&lt;br /&gt;skin['CONTENT_TEXT_COLOR'] = '#333333';&lt;br /&gt;skin['CONTENT_SECONDARY_LINK_COLOR'] = '#7777cc';&lt;br /&gt;skin['CONTENT_SECONDARY_TEXT_COLOR'] = '#666666';&lt;br /&gt;skin['CONTENT_HEADLINE_COLOR'] = '#000000';&lt;br /&gt;</pre>

We've made it possible to change the color as part of the design. This can be achieved by changing the skin value included when copying from the GFC site. The actual valid values are:

BG_COLOR: Overall background color
FONT_COLOR: Font color
CONTENT_HEADLINE_COLOR: Header text color
ENDCAP_TEXT_COLOR: Footer text color
ALTERNATE_BG_COLOR: Footprint background color