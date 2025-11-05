---
layout: post
lang: ja
title: 'モバイルウェブのコンバージョンを改善する - フォーム編'
date: 2016-12-26
tags:
- Payments
- Form
---

インターネットが登場して 20 年以上が経過し、時代はデスクトップからモバイルへと移り変わりました。モバイルでは、単に小さな画面に対応しているだけでなく、よりスピード感のある体験が求められています。それは E コマースビジネスも例外ではありません。

モバイルでの決済において、66% がネイティブアプリではなくウェブ上で行われているというデータがあります。検索結果からアプリをインストールしてまで商品を購入するのは手間がかかりすぎるため、そのままウェブ上で決済しようとする人が多いことが原因と考えられます。

ただ逆にモバイルウェブサイトは、デスクトップのウェブサイトと比較として、コンバージョンレートが 66% 低いというデータも存在します。これは逆に言えば、モバイルウェブでのコンバージョンレートにはまだ伸びしろがある、ということも意味しています。

そこで今回は、フォームを改善することでモバイルウェブのコンバージョンを向上する方法を 2 つ紹介したいと思います。

<!-- excerpt -->

## なぜオートフィルは役に立たないのか

商品を購入するに当たり、ユーザーは住所や支払情報などの情報を提供する必要があります。そのために広く使われているのがいわゆるフォームです。ただでさえ埋めるのがめんどくさいこのフォームですが、ユーザーにとってモバイルデバイスの小さな画面でバーチャルキーボードを使って自分の住所を打ち込むのは、苦痛以外の何者でもありません。モバイルでの購入が面倒なので、パソコンから購入した、もしくは諦めた、という経験があるのは僕だけではないはずです。

幸いなことに、最近のブラウザの多くには「オートフィル」と呼ばれる自動的にフォームに最適な情報を埋めてくれる機能が備わっています。これを使えば、ユーザーは自分で文字を打ち込んだり、間違えて何度も修正するなどの手間が大幅に減少します。

ただ、それでうまくいくなら、デスクトップよりもコンバージョンレートが低いはずはありません。つまり、多くのウェブサイトでは、オートフィルが期待通りに動いていない可能性があるのです。何が足りないのでしょうか？

### オートフィルの仕組み

まずはオートフィルの仕組みを説明しましょう。例えば Chrome のオートフィル機能では、一度ユーザーが入力した情報をブラウザに記憶し、二度目以降は繰り返し文字をタイプすることなく埋めることができます。さらに最近は、埋める情報が住所とクレジットカードの場合構造化され、どのフィールドに何を埋めればいいかを自動的に判断するようになっています。

<figure>
<img src="/images/2016/autofill-setting-chrome.png" style="min-width: 48%; max-width: 300px;">
<img src="/images/2016/autofill-setting-safari.png" style="min-width: 48%; max-width: 300px;">
<figcaption>左が Chrome、右が Safari のオートフィル設定</figcaption>
</figure>

Chrome の場合、ユーザーがブラウズ中に保存した情報を再利用するのに対し、Safari の場合、住所は OS の持つ連絡帳機能を利用して引き出します。

(Firefox や Edge では現時点ではフォームデータの構造化は行われていないようですが、今後同様の方向になっていくと予想されます。)

### 構造化されたデータ

ここで重要なのが「構造化」されている、という点です。言い換えると、情報が何らかの定型に沿った形で、ひとつの塊として扱われているということです。もう少し具体的に言いましょう。Chrome では

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

という形で、それぞれがひとつの情報の塊として扱われています。Safari も上記したとおり、連絡帳アプリの情報が使われるため、同じようなものと考えて間違いないでしょう。

これらの情報はドメインをまたがって再利用が可能で、オートフィル可能なフォームが表示された場合、住所やクレジットカード情報をブラウザがサジェストしてくれます。ユーザーはそれを選択するだけで、キーボードをタイプすることなくフィールドを埋めていくことができるのです (ユーザーの意図を無視して埋められることはありません)。

`input` フィールドにフォーカスを当てて、住所がサジェストされている様子と、実際に `input` フィールドが埋められている状態はこんな感じです。

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

Chrome と Safari では、オートフィルの情報はデバイス間で同期可能なため、例えばパソコンで入力したこれらの情報をモバイルデバイスでも利用する、といったことも可能です。

## 最新のオートフィルに最適化する

上記のスクリーンショットではきれいにほとんどの項目が埋まっていますね。これは今回ご紹介するベストプラクティスを盛り込んだものです。それでは、なぜちまたのウェブサイトはこのようにうまくいかないのでしょう？理由は 2 つ考えられます。

### フォームの構造を標準に合わせる

大きな理由のひとつが、ウェブサイトの持つフォームの構造が、標準で期待されるものと異なるためです。

無理もありません。これまで、こういった構造が標準として示されてこなかったことに加え、HTML のフォームは柔軟に設計が可能なため、自ずとサイトごとに異なる構造が作られる状況になってしまっていました。

例えば郵便番号ひとつ取ってみても、日本の場合は "106-6144" のように合計 7 桁ですが、ウェブサイトによってフィールドを 3 桁と 4 桁に分けているところと、7 桁で表しているところがあるなど、統一が図れていません。

クレジットカードも同様に、ひとつのフィールドを 16 桁で表しているところもあれば、4 桁のフィールドを 4 つ使っているところもあります。

![](/images/2016/credit-card-multiple.png)

![](/images/2016/credit-card-single.png)

どちらに合わせるのが正解でしょう？

実は、ブラウザが保存しやすい形、つまり先程ご紹介した住所とクレジットカードの構造に合わせて、郵便番号もクレジットカードもフィールドひとつで作る、が正解です。そうすることにより、ブラウザは自身の持つ構造化されたオートフィル情報をフォームにぴったりと当てはめてくれるため、ユーザーはストレスなく情報を提供できる、というわけです。

### オートフィルを促すアノテーションを追加する

ウェブサイトで適切にオートフィルがされない理由のもうひとつは、アノテーション (属性情報の付け方) です。

ブラウザのオートフィル機能は、フォームから知りうる情報 (`name` や `id` などの属性) からどこに何を埋めるべきかを推測して (ヒューリスティクス) 試みられます。しかし英語を前提に作られたブラウザでは、ストレートに英語で `name="address"` などと書かれていれば容易にこれが住所を現していると推測できるものも、日本語をローマ字で表した `name="kokyakuJushoBanchi"` のようなアノテーションの場合、これをヒューリスティクスだけで住所の番地部分である、と判断するのは難しいのです。

そこで開発者ができる改善策として、`name` 属性とは別のアノテーションを行うことが挙げられます。どのフィールドに何を埋めて欲しいかを明示するのです。それが `autocomplete` 属性です。

従来 `autocomplete` 属性は `on` と `off` のみが定義されていましたが、現在は[その他の様々な値が定義されています](https://html.spec.whatwg.org/multipage/forms.html#autofill)。

![](/images/2016/whatwg-autofill.png)

ここで定義されているパラメータはまだすべてのブラウザで使えるわけではありませんが、Chrome と Safari でその一部を使うことができます。

勘の良い人はもう気付いたかもしれません。実は先程ご紹介した、ブラウザに保存される構造化されたオートフィルの情報は、ここで定義されている `autocomplete` のパラメータと対応しています。

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

(この場合 `name` 属性はなんでも構いませんが、`autocomplete` に対応していないブラウザのため、ヒューリスティクスが働くことを期待して英語で表記するのが無難です。)

## まとめ

今回ご紹介した、モバイルウェブでフォームを改善してコンバージョンを向上する方法は下記の通り：

* フォームの構造を標準に合わせる
* `autocomplete` 属性を付けることで適切なアノテーションを行う

これで、ブラウザのオートフィル機能をフル活用し、ユーザーに数タップで必要項目を入力してもらうことができるようになるはずです。

最後に、今回のテクニックをまとめたフォームのコード例を掲載しておきます。(他にもベストプラクティスはたくさんありますが、今回は省きます。気になる方は[この辺りを参考にして下さい](https://developers.google.com/web/fundamentals/design-and-ui/input/forms/)。)

[http://jsbin.com/qubixac/edit?html](http://jsbin.com/qubixac/edit?html)

[こちらから](https://output.jsbin.com/qubixac)実際に試すこともできます。(HTTPS でなければクレジットカード情報を扱えないため、別途リンクを貼りました。)：

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

次の記事では、Payment Request API 編として、さらなるコンバージョン向上が期待できる最新のブラウザ機能についてご紹介します。
