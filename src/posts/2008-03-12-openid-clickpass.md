---
title: OpenIDを使ってアカウントを統合するサービスClickpass
author: Eiji
layout: post
SBM_count:
  - '00002<>1271396100<>1<>0<>0<>1<>0'
dsq_thread_id:
  - 2433436
categories:
  - Service
tags:
  - Clickpass
  - OpenID
  - 認証
---
<a href="http://jp.techcrunch.com/archives/clickpass-could-change-the-way-you-surf-the-web/" target="_blank">TechCrunch Japanese アーカイブ » OpenIDの一般利用拡大を図る「Clickpass」</a>OpenIDとは、ドメインをまたがってシングルサインオンを可能にする、ウェブ上のパスポートと言える技術です。日本でもYahooやlivedoor、はてな、mixiがOpenIDの発行に対応/将来的に対応を表明しています。そんなOpenIDですが、便利な反面問題もあります：

*   OpenIDを発行するサイトは増えているが、OpenIDを受け入れるサイトはまだまだ少ない
*   フィッシングのリスクがある
*   既存アカウントとの統合ができない/対応が不便

Clickpassはこれらの問題を一気に解決するというサービス。

> OpenIDを初めて使う際にはClickpassの方から、ログインしようとしているサービスに既にアカウントを持ってるか尋ねてくるので持ってる人はその情報を渡すと、Clickpassがその情報を認証先サイトにパスしてアカウント同士をひとつに繋げてくれる。自分のClickPassのOpenIDにサイトを追加していくと、Clickpassサイト上で一覧で確認できる。Clickpassのサイト固有のOpenID用URLも渡されるので、これを使って複数IDが管理できるし、IDは全てClickPass上でひとつに繋がっている。また、Clickpassでプロフィール情報を記入しておきたい人はしておくと、新たなサイト加入ごとに個人情報が自動入力される。Clickpassではプライバシーコントロールも徹底しており、サイトと共有したい情報は自分で選べる。

新規登録時はClickpassのOpenIDアカウントを使ってAXなりSregで個人情報を渡してくれるので、手軽に登録が可能。既存アカウントなら、毎回パスワードを入力しなくても良い。Yahooのログインシール的なものも、画像で可能とのことで、フィッシング対策もできている。言い換えれば、ウェブ上のキーチェーンサービスということでしょうか。

はじめから個人情報のアグリゲートとディストリビューションが目的のサービスだとユーザーが認識できるのであれば、個人情報のやりとりも法的な問題にならないだろうし、なかなかよいアイディアかも。後は提携サイトが増えることと、ユーザーが自分の認証情報をClickpassに預けることにためらわなければうまくいきそう。