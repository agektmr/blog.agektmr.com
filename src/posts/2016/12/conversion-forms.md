---
layout: post
title: 'モバイルウェブのコンバージョンを改善する - フォーム編'
date: 2016-12-26
tags:
- Payments
- Form
---

インターネットが登場して 20 年以上が経過し、時代はデスクトップからモバイルへと移
り変わりました。モバイルでは、単に小さな画面に対応しているだけでなく、よりスピー
ド感のある体験が求められています。それは E コマースビジネスも例外ではありませ
ん。

モバイルでの決済において、66% がネイティブアプリではなくウェブ上で行われていると
いうデータがあります。検索結果からアプリをインストールしてまで商品を購入するのは
手間がかかりすぎるため、そのままウェブ上で決済しようとする人が多いことが原因と考
えられます。

ただ逆にモバイルウェブサイトは、デスクトップのウェブサイトと比較として、コンバー
ジョンレートが 66% 低いというデータも存在します。これは逆に言えば、モバイルウェ
ブでのコンバージョンレートにはまだ伸びしろがある、ということも意味しています。

そこで今回は、フォームを改善することでモバイルウェブのコンバージョンを向上する方
法を 2 つ紹介したいと思います。

<!-- excerpt -->

## なぜオートフィルは役に立たないのか

商品を購入するに当たり、ユーザーは住所や支払情報などの情報を提供する必要がありま
す。そのために広く使われているのがいわゆるフォームです。ただでさえ埋めるのがめん
どくさいこのフォームですが、ユーザーにとってモバイルデバイスの小さな画面でバー
チャルキーボードを使って自分の住所を打ち込むのは、苦痛以外の何者でもありません。
モバイルでの購入が面倒なので、パソコンから購入した、もしくは諦めた、という経験が
あるのは僕だけではないはずです。

幸いなことに、最近のブラウザの多くには「オートフィル」と呼ばれる自動的にフォーム
に最適な情報を埋めてくれる機能が備わっています。これを使えば、ユーザーは自分で文
字を打ち込んだり、間違えて何度も修正するなどの手間が大幅に減少します。

ただ、それでうまくいくなら、デスクトップよりもコンバージョンレートが低いはずはあ
りません。つまり、多くのウェブサイトでは、オートフィルが期待通りに動いていない可
能性があるのです。何が足りないのでしょうか？

### オートフィルの仕組み

まずはオートフィルの仕組みを説明しましょう。例えば Chrome のオートフィル機能で
は、一度ユーザーが入力した情報をブラウザに記憶し、二度目以降は繰り返し文字をタイ
プすることなく埋めることができます。さらに最近は、埋める情報が住所とクレジット
カードの場合構造化され、どのフィールドに何を埋めればいいかを自動的に判断するよう
になっています。

<figure>
<img src="/images/2016/autofill-setting-chrome.png" style="min-width: 48%; max-width: 300px;">
<img src="/images/2016/autofill-setting-safari.png" style="min-width: 48%; max-width: 300px;">
<figcaption>左が Chrome、右が Safari のオートフィル設定</figcaption>
</figure>

Chrome の場合、ユーザーがブラウズ中に保存した情報を再利用するのに対し、Safari の
場合、住所は OS の持つ連絡帳機能を利用して引き出します。

(Firefox や Edge では現時点ではフォームデータの構造化は行われていないようです
が、今後同様の方向になっていくと予想されます。)

### 構造化されたデータ

ここで重要なのが「構造化」されている、という点です。言い換えると、情報が何らかの
定型に沿った形で、ひとつの塊として扱われているということです。もう少し具体的に言
いましょう。Chrome では

住所の場合：

* 名前
* 所属
* 国
* 郵便番号
* 都道府県
* 市区町村
* それ以降の住所
* 電話番号
* メールアドレス

クレジットカードの場合：

* カード番号
* 所有者名
* 有効期限月
* 有効期限年

という形で、それぞれがひとつの情報の塊として扱われています。Safari も上記したと
おり、連絡帳アプリの情報が使われるため、同じようなものと考えて間違いないでしょ
う。

これらの情報はドメインをまたがって再利用が可能で、オートフィル可能なフォームが表
示された場合、住所やクレジットカード情報をブラウザがサジェストしてくれます。ユー
ザーはそれを選択するだけで、キーボードをタイプすることなくフィールドを埋めていく
ことができるのです (ユーザーの意図を無視して埋められることはありません)。

`input` フィールドにフォーカスを当てて、住所がサジェストされている様子と、実際に
`input` フィールドが埋められている状態はこんな感じです。

<figure>
<img src="/images/2016/autofill-1-safari.png" style="min-width: 48%; max-width:300px;">
<img src="/images/2016/autofill-2-safari.png" style="min-width: 48%; max-width:300px;">
<figcaption>Safari の場合</figcaption>
</figure>

<figure>
<img src="/images/2016/autofill-1-chrome.png" style="min-width: 48%; max-width:300px;">
<img src="/images/2016/autofill-2-chrome.png" style="min-width: 48%; max-width:300px;">
<figcaption>Chrome の場合</figcaption>
</figure>

Chrome と Safari では、オートフィルの情報はデバイス間で同期可能なため、例えばパ
ソコンで入力したこれらの情報をモバイルデバイスでも利用する、といったことも可能で
す。

## 最新のオートフィルに最適化する

上記のスクリーンショットではきれいにほとんどの項目が埋まっていますね。これは今回
ご紹介するベストプラクティスを盛り込んだものです。それでは、なぜちまたのウェブサ
イトはこのようにうまくいかないのでしょう？理由は 2 つ考えられます。

### フォームの構造を標準に合わせる

大きな理由のひとつが、ウェブサイトの持つフォームの構造が、標準で期待されるものと
異なるためです。

無理もありません。これまで、こういった構造が標準として示されてこなかったことに加
え、HTML のフォームは柔軟に設計が可能なため、自ずとサイトごとに異なる構造が作ら
れる状況になってしまっていました。

例えば郵便番号ひとつ取ってみても、日本の場合は "106-6144" のように合計 7 桁です
が、ウェブサイトによってフィールドを 3 桁と 4 桁に分けているところと、7 桁で表し
ているところがあるなど、統一が図れていません。

クレジットカードも同様に、ひとつのフィールドを 16 桁で表しているところもあれば、
4 桁のフィールドを 4 つ使っているところもあります。

![](/images/2016/credit-card-multiple.png)

![](/images/2016/credit-card-single.png)

どちらに合わせるのが正解でしょう？

実は、ブラウザが保存しやすい形、つまり先程ご紹介した住所とクレジットカードの構造
に合わせて、郵便番号もクレジットカードもフィールドひとつで作る、が正解です。そう
することにより、ブラウザは自身の持つ構造化されたオートフィル情報をフォームにぴっ
たりと当てはめてくれるため、ユーザーはストレスなく情報を提供できる、というわけで
す。

### オートフィルを促すアノテーションを追加する

ウェブサイトで適切にオートフィルがされない理由のもうひとつは、アノテーション (属
性情報の付け方) です。

ブラウザのオートフィル機能は、フォームから知りうる情報 (`name` や `id` などの属
性) からどこに何を埋めるべきかを推測して (ヒューリスティクス) 試みられます。しか
し英語を前提に作られたブラウザでは、ストレートに英語で `name="address"` などと書
かれていれば容易にこれが住所を現していると推測できるものも、日本語をローマ字で表
した `name="kokyakuJushoBanchi"` のようなアノテーションの場合、これをヒューリス
ティクスだけで住所の番地部分である、と判断するのは難しいのです。

そこで開発者ができる改善策として、`name` 属性とは別のアノテーションを行うことが
挙げられます。どのフィールドに何を埋めて欲しいかを明示するのです。それが
`autocomplete` 属性です。

従来 `autocomplete` 属性は `on` と `off` のみが定義されていましたが、現在は[その
他の様々な値が定義されていま
す](https://html.spec.whatwg.org/multipage/forms.html#autofill)。

![](/images/2016/whatwg-autofill.png)

ここで定義されているパラメータはまだすべてのブラウザで使えるわけではありません
が、Chrome と Safari でその一部を使うことができます。

勘の良い人はもう気付いたかもしれません。実は先程ご紹介した、ブラウザに保存される
構造化されたオートフィルの情報は、ここで定義されている `autocomplete` のパラメー
タと対応しています。

住所の場合：

* 名前 (`name`)
* 所属 (`organization`)
* 国 (`country`)
* 郵便番号 (`postal-code`)
* 都道府県 (`address-level1`)
* 市区町村 (`address-level2`)
* それ以降の住所 (`street-address`)
* 電話番号 (`tel`)
* メールアドレス (`email`)

クレジットカードの場合：

* カード番号 (`cc-number`)
* 所有者名 (`cc-name`)
* 有効期限月 (`cc-exp-month`)
* 有効期限年 (`cc-exp-year`)


つまり、郵便番号の例ではこんな感じで書くのが正解、ということになります。

```html
<input type="text" name="zip-code" autocomplete="postal-code">
```

(この場合 `name` 属性はなんでも構いませんが、`autocomplete` に対応していないブラ
ウザのため、ヒューリスティクスが働くことを期待して英語で表記するのが無難です。)

# まとめ
今回ご紹介した、モバイルウェブでフォームを改善してコンバージョンを向上する方法は下記の通り：

* フォームの構造を標準に合わせる
* `autocomplete` 属性を付けることで適切なアノテーションを行う

これで、ブラウザのオートフィル機能をフル活用し、ユーザーに数タップで必要項目を入
力してもらうことができるようになるはずです。

最後に、今回のテクニックをまとめたフォームのコード例を掲載しておきます。(他にも
ベストプラクティスはたくさんありますが、今回は省きます。気になる方は[この辺りを
参考にして下さ
い](https://developers.google.com/web/fundamentals/design-and-ui/input/forms/)。)

[http://jsbin.com/qubixac/edit?html](http://jsbin.com/qubixac/edit?html)

[こちらから](https://output.jsbin.com/qubixac)実際に試すこともできます。(HTTPS
でなければクレジットカード情報を扱えないため、別途リンクを貼りました。)：

```html
<form action="#">
  <fieldset>
    <legend>住所</legend>
    <label>
      名前: <input type="text" name="name" autocomplete="name">
    </label><br>
    <label>
      組織: <input type="text" name="organization" autocomplete="organization">
    </label><br>
    <label>
      郵便番号: <input type="text" name="postal-code" autocomplete="postal-code">
    </label><br>
    <label>
      都道府県: <input type="text" name="address-level1" autocomplete="address-level1">
    </label><br>
    <label>
      市区町村: <input type="text" name="address-level2" autocomplete="address-level2">
    </label><br>
    <label>
      その他の住所: <input type="text" name="street-address" autocomplete="street-address">
    </label><br>
    <label>
      国: <input type="text" name="country" autocomplete="country-name">
    </label><br>
    <label>
      メールアドレス: <input type="text" name="email" autocomplete="email">
    </label><br>
    <label>
      電話番号: <input type="text" name="tel" autocomplete="tel">
    </label>
  </fieldset>
  <fieldset>
    <legend>クレジットカード</legend>
    <label>
      クレジットカード番号: <input type="number" name="cc-number" autocomplete="cc-number">
    </label><br>
    <label>
      名前: <input type="text" name="cc-name" autocomplete="cc-name">
    </label><br>
    <label>
      有効期限:
      <select autocomplete="cc-exp-month">
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </select>月
      <select autocomplete="cc-exp-year">
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </select>年
    </label><br>
  </fieldset>
  <input type="submit" value="Submit">
</form>
```

次の記事では、Payment Request API 編として、さらなるコンバージョン向上が期待でき
る最新のブラウザ機能についてご紹介します。
