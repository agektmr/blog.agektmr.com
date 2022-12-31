---           
layout: post
title: Google の Developer Advocate とはどんな仕事なのか？
date: 2013-04-11
updated: 2013-11-01 
tags:
- Developer Advocate
- Developer Relations
- Google
image:
  feature: /2013-04-11-google-developer-advocate/gde.jpg
---

僕の仕事は Google の Chrome Developer Advocate です。  
Google Japan では先週 (2013 年 4 月) からこの [Chrome の Developer Advocate を募集開始しました](https://www.google.com/about/jobs/search/#!t=jo&jid=1175001&)。他にも Google+、YouTube、Android など同種の担当者も募集しているのですが、よく聞かれるし、リクエストもありましたので、この機会に Developer Advocate がどんな仕事をしているのか、ご説明したいと思います。  

<!-- excerpt -->

## Developer Relations とは

上記一連のお仕事ですが、すべて Google 内の Developer Relations チーム (以下 DevRel) という部署に属します。おそらく Google の中でも、開発者の皆さんが一番接触する機会の多いチームではないかと思います。DevRel はさらに Chrome や Android といった、プロダクトごとのチームに分かれています。  
  
業務内容は名前から想像できる通り、Google と外部開発者との関係を築いていくことを中心としています。職種は Program Manager、Developer Programs Engineer、Developer Advocate、Technical Writer などがありますが、僕が担当しているのは Developer Advocate です。  
Advocate という言葉だけで仕事の内容がピンと来る人はほぼいないと思いますが、学校で教わるような単語ではないので当たり前ですね。他社で言うところの Evangelist が一番近い仕事かと思います。それでも分からない方には、「Google のテクノロジーを外部の開発者の方にも使って頂けるよう啓蒙活動する仕事」という説明をすることが多いです。  
  
Developer Advocate という言葉の由来はこんな感じ：  

> Evangelist という言葉は元々宗教の伝道師に使われる言葉です。しかし Google で
> Evangelist に類する仕事が作られた際、開発者の方に一方的に伝えていくだけでな
> く、対話やフィードバックから Google 自身も学び成長していくという意味を込めるた
> め、Advocate という言葉が選ばれました。
  
以下、具体的な仕事内容に触れて行きますが、本記事は僕が担当している Chrome 周辺について述べているものであり、他のプロダクトについては必ずしも当てはまらない点を予めご了承下さい。今取り組んでいる仕事の一部を怒られないであろう範囲で書いてみます。  

## 啓蒙活動

DevRel の仕事は、「Google のプロダクトをプラットフォームとしたアプリを使ってもらいたい人のお手伝いをする」のがメインです。Chrome に関して言えば、「Chrome をプラットフォームとしたアプリ、つまりウェブサイトやウェブアプリを制作する人を手伝う」言い換えると「Chrome だけでなく HTML5 を含めたウェブ全体、特にフロントエンド周りを盛り上げる」というのがミッションになります。非常にざっくりしてますし、はっきり言われたことはないですが、僕は勝手にそんなイメージを持って仕事しています。  

### 講演

おそらくこれが一番業務として目立つ部分だと思いますが、外部で開催されるイベントで講演を行います。内容は大抵 Chrome の技術を紹介するものか、HTML5 の機能を紹介をするものです (ちなみに最近は HTML5 より Open Web Platform、OWP という言葉を使う機会が多いです)。当然資料も自分で作成するので、事前のインプットがかなり必要ですし、ある程度質問も想定して準備をするため、結構な時間が割かれます。地方で講演する場合は出張も伴います。  

### ソーシャルメディア

[ブログ](http://blog.agektmr.com/)や [Google+](http://profiles.google.com/agektmr)、[Twitter](https://twitter.com/agektmr) などのソーシャルメディアを使って最新の情報を流します。これは見られている方も多いと思います。  

### HTML5Rocks

[HTML5Rocks](http://www.html5rocks.com/) の記事を書いたり、サイトのメンテナンスをしたりします。[HTML5Rocks 自体がオープンソース](https://github.com/html5rocks/www.html5rocks.com/)ですので、Pull Request も受け付けていますし、記事のレビュー、それから日本語の翻訳を頂いた場合のレビューもしたりします。  

### Google Developers Live

毎月 YouTube Live を使って生放送しているウェブ番組が [Google Developers Live (GDL)](https://developers.google.com/live/) です。ご覧になったことがある方はご存知だと思いますが、ゲストを呼んで技術セッションをして頂く内容です。スタジオの準備などは手伝ってくれるスタッフがいますが、その他の部分、ゲストの手配や内容の選定、番組の司会進行などはすべて自分でやります。アメリカとイギリスの GDL では、ゲストではなく Advocate が直接セッションをやっていますが、日本では今のところゲストの方にお願いしています。  
  

[![](https://2.bp.blogspot.com/-D6D-bZI3Zjg/UWZuFOyxTnI/AAAAAAAAb4A/vM_F0wBWZww/s640/gdl.png)](https://2.bp.blogspot.com/-D6D-bZI3Zjg/UWZuFOyxTnI/AAAAAAAAb4A/vM_F0wBWZww/s1600/gdl.png)
  
  
せっかく作ったコンテンツをどう広げていくか考えるのも、Advocate の仕事です。過去に[こんなブログ記事](http://googledevjp.blogspot.jp/2012/10/blog-post.html)を書いたこともありました。これは見てくれる方々にとっても、コンテンツを作っている我々にとっても嬉しい、良案だったのではないでしょうか。  

### StackOverflow

フォーラム的な場でのサポートも業務のひとつです。日本語であれば Google Groups を使った質問の回答なども行なっていますが、グローバルでは [StackOverflow](http://stackoverflow.com/) を公式にサポートの場にしています。Google Code ではなく [github](https://github.com/GoogleChrome/) にオープンソースのコードを置いてしまうところもそうですが、Google の (というより DevRel の？) 自前のシステムに拘らないところとか、合理的でよいと思いません？  

## コミュニティ

DevRel は全世界で 200 名程度 (日本では現在 4 名) しかおらず、スケーラビリティが重視されます。そこで、外部コミュニティの一部となってテクノロジーを盛り上げる場面も多々あります。  

### Google Developers Expert

ご存知の方は多いと思いますが、Microsoft でいうところの MVP のような、優秀な外部の開発者を認定する[Google Developers Expert](https://developers.google.com/experts/) という制度があります。GDE の皆さんとの情報交換も重要なお仕事です。  

これは以前 [Google API Expert](https://sites.google.com/site/devreljp/Home/api-expert) と呼ばれていたもので、元々日本発のプログラムが、昨年から全世界共通のプログラムになりました ([Naoki Ishihara](https://plus.google.com/109887342976070041001/posts) と [Fumi Yamazaki](https://plus.google.com/+FumiYamazaki/posts) のおかげです！)。ちなみに僕も入社前は OpenSocial の API Expert でした。   

[![](https://2.bp.blogspot.com/-6qdoDuaSYLI/UWZuOkNCFAI/AAAAAAAAb4Q/mBpOOclobKY/s640/gde.JPG)](https://2.bp.blogspot.com/-6qdoDuaSYLI/UWZuOkNCFAI/AAAAAAAAb4Q/mBpOOclobKY/s1600/gde.JPG)

### コミュニティとのお付き合い

日本の DevRel で Chrome 担当は僕だけですので、当然やれることは限られてきます。そこで、上記 GDE を含め、志を同じくする開発者コミュニティと協力し合い、時には一部となってお手伝いをするのも重要な仕事です。コミュニティを盛り上げるために何ができるか考えるのは、かなり楽しいです。  

### イベント運営

コミュニティのお手伝いの一環として、Google の会場や設備を提供し、人員としてお手伝いするのも重要なお仕事です。勉強会などのイベントを開催する、プロダクトに関わるエンジニアに講演してもらう、など。2011 年には [html5j](https://groups.google.com/forum/?fromgroups#!forum/html5-developers-jp) とコラボで [Chrome+HTML5 Conference](http://events.html5j.org/conference/2011/08/) を開催しました。Chrome Tech Talk Night は既に 5 回を数えています。6 月には [Test The Web Forward](http://testthewebforward.org/) というイベントの開催も予定しています。  

[![](https://4.bp.blogspot.com/-oef_h9CDOpI/UWZuOtWOXaI/AAAAAAAAb4U/2cCIn1BOhOI/s640/ch5.jpg)](https://4.bp.blogspot.com/-oef_h9CDOpI/UWZuOtWOXaI/AAAAAAAAb4U/2cCIn1BOhOI/s1600/ch5.jpg)

## パートナー、インプット、Hacking、etc

実際はもっと雑多な仕事がありますが、上記に分類されない仕事としては主に以下のようなものがあります。  

### パートナーとのお付き合い

オープンな一般開発者向けの仕事が占める割合はかなり大きいですが、表からは見えないパートナー向きの仕事もあります。何かプロダクトを作ってもらうための交渉をすることもありますし、コンフィデンシャルな情報を含む技術的問題を受けて、Chrome 自体の機能を改善したりといったこともあります。技術的にパートナーとの間を取り持つのも、Developer Advocate の重要な役割です。  

### インプット

ここまであまり技術的な話がなかったですが、もちろん最先端の技術力も求められる仕事です。インプットなしにアウトプットなどできる訳もありませんので、常に最新情報にキャッチアップしていることが求められます。  

### Hacking

理屈だけインプットしていても仕方ありませんので、実際の開発も行います。大きなものを作る機会はそれほど多くありませんが、技術の啓蒙に直接繋がるデモや、社内向けのツールを作る場合もあります。  
  
今まで作ったものとしては、東京の Chrome エンジニアチームが担当している範囲のものをテーマにして、[WebSocket](http://agektmr.node-ninja.com:3000/)、[Forms](http://demo.agektmr.com/datalist/)、最近は FileSystem 関連のデモも。後は趣味と実益を兼ねて [Chrome Extension](https://github.com/agektmr/ProjectTabManager) や[Chrome App](https://github.com/agektmr/ChromeMusicPlayer) を作ったり。コードは [github](https://github.com/agektmr) で公開しています。  
基本的にプロダクションレベルのコードを自分で書くことはないですが、同僚の中にはパッチを送り続けて WebKit (今は Blink ですが) の committer になっちゃった人もいます。  

### Chrome Experiments

また、過去に話題になった [Chrome Experiments](http://www.chromeexperiments.com/) の中には日本発のものもあることをご存知でしょうか？例えば先日発表された [World Wide Maze](http://chrome.com/maze/) もそう。ああいったプロジェクトにテクニカルなサポートを行うのも、Developer Advocate が担当します。  

[![](https://3.bp.blogspot.com/-PDasNKa2NXs/UWZuPPDQ2MI/AAAAAAAAb4k/aJ9dVd1aVfU/s640/wwm.png)](https://3.bp.blogspot.com/-PDasNKa2NXs/UWZuPPDQ2MI/AAAAAAAAb4k/aJ9dVd1aVfU/s1600/wwm.png)
  
### エンジニアとのやりとり

Google 東京オフィスの Chrome エンジニアチームはそれなりの規模です。先述のように、 WebSocket や FileSystem、Forms、WebComponents 周りなど、主に OWP 機能を実装しています。W3C や IETF のサイトに載る標準仕様を自分の手で書いている人も少なくありません。そんなエンジニアたちと外部開発者の橋渡しをするのも、僕の仕事です。GDL や講演を通じてエンジニア自ら啓蒙してもらうこともあれば、外部開発者のフィードバックを届けることもあります。  

## 仕事の楽しさ

日常業務は上記のような感じです。ただ、これはあくまで僕の例であって、Developer Advocate 全員に当てはまるものではありません。同じ Chrome DevRel のメンバーは、本社のある Mountain View を中心に、日本を含めて世界 7 カ国に散らばっていますが、それぞれに得意分野を持ち、異なる仕事をしています。  
Google では、仕事は与えられるものではなく、自分で作り出していくものです。そのため、人によってやってることが全く違うのは、ごく自然なことなのです。いいと思ったことは何でもやれるし、それでもちゃんと評価もしてもらえる。  

僕が過去にやった思い出深い仕事をふたつ挙げます。  
ひとつは、2011 年の GDD での [Developer Link](http://developer-link.appspot.com/) です。2 つのセッションやキーノートなどに加え、企画から制作、パートナーとの交渉まで含め、イベント当日までにサービスを完成させるべくプロジェクトをリードしました。コードも一部書いてます。  
  
もうひとつは現在進行形ですが、[Web Music Developers Japan](https://groups.google.com/forum/?fromgroups#!forum/web-music-developers-jp) の活動です(仕事というより趣味ですが)。元々音楽好きでブラウザでシンセサイザーが作れる [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html) に大興奮していた身としては、それを通じて開発者はもちろん、過去であれば無関係だった業界の有名人と関われたりするのは、役得だなあと思います。[Web MIDI API](http://webaudio.github.io/web-midi-api/) が登場してくれば、今後ますます面白いことをしかけていけるんじゃないかとワクワクしています。  

## 難しい所

周囲がハイレベルで、正直ついていくのに必死です。技術的にも、仕事のやり方的にも。  
加えて、上記のような仕事が常に同時進行している感じなので、時間配分や集中力の管理も難しい部分です。  

それに拍車をかけるのが、Regional (本社から離れている) であることです。Chrome DevRel で日本担当は僕だけですので、チームメンバーとのコミュニケーションは基本メールか Hangout。Hangout は便利ですが、テクノロジーで時差は超えられません (今だと日本の朝 9 時が本社の 17 時、日本の 17 時が London の朝 9 時)。メールは文字情報だけなので、相手の表情は見えないですし、空気が伝わって来ません。  

そこで出張ということになる訳ですが、今度は対面コミュニケーションに苦労します。僕の英語力は 3 年前の時点で TOEIC ほぼ満点でしたが、それでもまだ十分とは言えません。言語そのものというよりも、自分の性格だったり、カルチャー的な部分の方が大きいかもしれませんが、話が長くなりそうなので、この辺はまた別の機会に。  

[![](https://1.bp.blogspot.com/-uhgjkFFsrHQ/UWZuOQa7FkI/AAAAAAAAb4g/FwbNen7Xeio/s640/gddsyd.JPG)](https://1.bp.blogspot.com/-uhgjkFFsrHQ/UWZuOQa7FkI/AAAAAAAAb4g/FwbNen7Xeio/s1600/gddsyd.JPG)

## 環境

これまで何社か渡り歩いてきましたが、働きやすさという意味では群を抜いて快適な会社です。無料のランチ (実は朝食と夕食もある) が取り沙汰されることが多いですが、産休は父親 (Paternity Leave)、母親 (Maternity Leave) ともに取ることができますし、休暇も柔軟で、まとめて 1 ヶ月休んじゃう人も少なくありません。チームでのコミュニケーションを充実させるためのアクティビティも頻繁にありますし、社内ではしょっちゅう Tech Talk や部活動が行われていて、とてもよい雰囲気です。こればっかりは、入ってみないとわからないと思います。  

## 求めている人材

Chrome DevRel で募集している人材は [先日も書いたように](https://plus.google.com/107085977904914121234/posts/dL1pe3MnLXH)、「英語、日本語が堪能で交渉力、技術力、講演、イベント開催に自信のある方」です。この言葉の意味が今回の記事で少しはお分かり頂けたのであれば、書いた甲斐があったというもの。  
  
もちろん、ここでの話はあくまで「僕の場合」であり、新しく担当する方に同じような仕事をして欲しいと思っていませんし、むしろその人なりのやり方を生み出して欲しい、生み出すべきです。  
  
自分で仕事を作り、こなしていける人。コミュニケーション能力が高く、色んなことをグイグイと、楽しみながら前に進められる人に来てもらえたら、嬉しいな。  
  
というわけで、皆さんからの応募をお待ちしております :)  
  
## 関連記事

* [Google の Developer Relations について](http://fumit.blogspot.jp/2011/01/google-developer-relations.html)
* [渡米することになりました](http://fumit.blogspot.jp/2013/02/blog-post_15.html)

