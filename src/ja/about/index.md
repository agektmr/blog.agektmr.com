---
layout: layouts/page
lang: ja
title: About Me
permalink: /ja/about/
eleventyExcludeFromCollections: true
---

<div class="about-page">

  <section class="about-hero">
    <img src="/images/avatar.jpg" class="about-avatar" alt="Eiji Kitamura / 北村 英志（えーじ）">
    <div class="about-hero-info">
      <h1 class="about-name">Eiji Kitamura <span class="about-name-sub">/ 北村 英志（えーじ）</span></h1>
      <p class="about-role">Identity Tech Lead &amp; Developer Advocate @ Google Chrome</p>
      <div class="about-pills">
        <a href="https://github.com/agektmr" target="_blank" rel="noopener noreferrer" class="pill-btn"><i class="fab fa-github"></i> GitHub</a>
        <a href="https://x.com/agektmr" target="_blank" rel="noopener noreferrer" class="pill-btn"><i class="fab fa-x-twitter"></i> X</a>
        <a href="https://bsky.app/profile/agektmr.com" target="_blank" rel="noopener noreferrer" class="pill-btn"><i class="fab fa-bluesky"></i> Bluesky</a>
        <a href="https://infosec.exchange/@agektmr" target="_blank" rel="noopener noreferrer me" class="pill-btn"><i class="fab fa-mastodon"></i> Mastodon</a>
        <a href="https://www.linkedin.com/in/agektmr" target="_blank" rel="noopener noreferrer" class="pill-btn"><i class="fab fa-linkedin"></i> LinkedIn</a>
        <a href="https://developer.chrome.com/authors/agektmr/" target="_blank" rel="noopener noreferrer" class="pill-btn"><i class="fab fa-chrome"></i> Articles</a>
      </div>
    </div>
  </section>

  <section class="about-bio">

Google の Chrome Developer Relations チームにて、Identity Tech Lead/Developer Advocate を務める。Web ブラウザにおける認証技術（Authentication）およびアイデンティティ（Identity）領域のスペシャリスト。

Google への入社前は、NTT レゾナント株式会社（現 NTT ドコモ）にてポータルサイト「goo」のサービス開発に従事。「インターネット全体をオープンなソーシャルネットワークの基盤にしたい」という志を掲げ、日本初となる PC 向け OpenSocial コンテナの開発や、OAuth、OpenID などの技術普及活動を牽引。「SocialWeb Japan」の運営やコミュニティ活動を通じ、Google API Expert（現 [Google Developer Expert](https://developers.google.com/experts)）に認定される。

2010 年 6 月、Developer Advocate として Google に入社。以来 16 年以上にわたり、Chrome チームおよび Web プラットフォームのグローバルな技術啓蒙活動に従事。HTML5 や Web Components、Web Audio、Payment Request API などの普及期を経て、現在はパスキー（Passkeys/WebAuthn）、Federated Credential Management（FedCM）、Digital Credentials API、Email Verification Protocol（EVP）など、次世代の安全でフリクションレスな Web 認証エコシステムの標準化と実装支援をリードしている。

W3C や FIDO Alliance などの標準化コミュニティと密接に連携しながら、Google I/O、Chrome Developer Summit、Authenticate、JSConf など世界各地のカンファレンスで多数の登壇や基調講演を行っている。

  </section>

  <h2 class="about-section-heading">
    <span class="heading-icon"><i class="fas fa-book"></i></span>
    <span>著書</span>
  </h2>

  <div class="book-card">
    <div class="book-cover">
      <a href="https://gihyo.jp/book/2025/978-4-297-14653-5" target="_blank" rel="noopener noreferrer">
        <img src="/images/2025/everything-about-passkeys.jpg" alt="パスキーのすべて ── 導入・UX設計・実装（技術評論社）">
      </a>
    </div>
    <div class="book-details">
      <span class="book-badge">Book / 2025 年 1 月</span>
      <h3 class="book-title">
        <a href="https://gihyo.jp/book/2025/978-4-297-14653-5" target="_blank" rel="noopener noreferrer">パスキーのすべて ── 導入・UX 設計・実装</a>
      </h3>
      <div class="book-meta">共著：えーじ、倉林雅、小岩井航介/技術評論社</div>
      <p class="book-desc">パスワード認証が抱える課題から、パスキーの基礎概念、UX 設計、Web/iOS/Android の実装、運用上の注意点に至るまでを体系的に網羅した実践的解説書。国内におけるパスキー導入の標準的なガイドブックとして広く活用されています。</p>
      <a href="https://gihyo.jp/book/2025/978-4-297-14653-5" target="_blank" rel="noopener noreferrer" class="book-btn">
        <span>技術評論社の書籍ページへ</span>
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>

  <h2 class="about-section-heading">
    <span class="heading-icon"><i class="fas fa-video"></i></span>
    <span>注目のセッション</span>
  </h2>

  <div class="featured-talk">
    <div class="talk-headline">
      <span class="talk-badge">Google I/O 2025</span>
      <h3 class="talk-title-text">Reshaping user authentication and identity verification</h3>
    </div>
    {% YouTube 'jaaSKZMnUW8' %}
    <p class="talk-caption">パスキーの進化から、次世代の ID 連携・身元確認、そしてフィッシング耐性のあるアカウントリカバリを実現する Email Verification Protocol（EVP）まで、Web 認証の包括的な未来像を解説した Google I/O のキーストーンセッション。</p>
  </div>

  <h2 class="about-section-heading">
    <span class="heading-icon"><i class="fas fa-microphone-alt"></i></span>
    <span>主な登壇・講演</span>
  </h2>

  <ul class="talks-timeline">
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2023</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=SF8ueIn2Nlc" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Passkeys: a simpler and safer sign-in</a>
        </div>
        <p class="entry-desc">パスキーの基本アーキテクチャと Web への導入ステップを体系的に解説した代表的セッション。</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2022</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=6vnQDn3AUbo" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> A path to a world without passwords</a>
        </div>
        <p class="entry-desc">パスワードレス社会へのロードマップと FIDO/WebAuthn の展望。</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2021</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=J6BZ9IQELNA" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> From security as opt-in to security by default</a>
        </div>
        <p class="entry-desc">COOP/COEP を中心としたブラウザセキュリティの標準設計。</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">CDS 2020</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=sU4MpWYrGSI" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> SMS OTP form best practices</a>
        </div>
        <p class="entry-desc">Web OTP API を活用したセキュアなワンタイムパスワード入力設計。</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2018</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=kGGMgEfSzMw" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> What's new with sign up and sign in on the web</a>
        </div>
        <p class="entry-desc">Credential Management API を中心とした Web サインイン体験の革新。</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2017</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=DBBFK7bvEQo" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Secure and Seamless Sign-In: Keeping Users Engaged</a>
        </div>
        <p class="entry-desc">アカウント維持とセキュリティを両立するシームレスなサインイン手法。</p>
      </div>
    </li>
  </ul>

</div>

