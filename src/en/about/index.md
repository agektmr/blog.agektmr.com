---
layout: layouts/page
lang: en
title: About Me
permalink: /en/about/
eleventyExcludeFromCollections: true
---

<div class="about-page">

  <section class="about-hero">
    <img src="/images/avatar.jpg" class="about-avatar" alt="Eiji Kitamura / えーじ">
    <div class="about-hero-info">
      <h1 class="about-name">Eiji Kitamura <span class="about-name-sub">/ えーじ</span></h1>
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

Eiji Kitamura is an Identity Tech Lead and Developer Advocate on the Google Chrome team, specializing in identity, authentication, and security on the web platform.

Prior to joining Google, Eiji was an engineer at NTT Resonant, developing consumer web services for the portal site "goo". Driven by a passion to build an open social network layer across the web, he led the development of Japan's first PC-based OpenSocial container and championed technologies like OAuth and OpenID, which led to his recognition as a Google API Expert (now [Google Developer Expert](https://developers.google.com/experts)).

In June 2010, Eiji joined Google as a Developer Advocate. For over 16 years, he has guided web developers globally through key evolutions of the web platform—from HTML5, Web Components, and Web Audio to Payment Request API. Today, he focuses on pioneering passwordless and frictionless authentication, spearheading the adoption of Passkeys (WebAuthn), Federated Credential Management (FedCM), the Digital Credentials API, and the Email Verification Protocol (EVP).

He collaborates closely with standards bodies including the W3C and the FIDO Alliance, and is a frequent speaker at global industry events such as Google I/O, Chrome Developer Summit, Authenticate, and JSConf.

  </section>

  <h2 class="about-section-heading">
    <span class="heading-icon"><i class="fas fa-book"></i></span>
    <span>Publications</span>
  </h2>

  <div class="book-card">
    <div class="book-cover">
      <a href="https://gihyo.jp/book/2025/978-4-297-14653-5" target="_blank" rel="noopener noreferrer">
        <img src="/images/2025/everything-about-passkeys.jpg" alt="Everything about passkeys: adoption, UX design, and implementation">
      </a>
    </div>
    <div class="book-details">
      <span class="book-badge">Book / January 2025</span>
      <h3 class="book-title">
        <a href="https://gihyo.jp/book/2025/978-4-297-14653-5" target="_blank" rel="noopener noreferrer">Everything about passkeys: adoption, UX design, and implementation</a>
      </h3>
      <div class="book-meta">Co-authored by Eiji Kitamura, Masaru Kurabayashi, Kosuke Koiwai / Gijutsu-Hyouron-sha</div>
      <p class="book-desc">A comprehensive guide covering the fundamental problems with password authentication, passkey core concepts, UX design patterns, and hands-on implementations across the Web, iOS, and Android platforms. Widely regarded as the authoritative Japanese manual for passkey rollout.</p>
      <a href="https://gihyo.jp/book/2025/978-4-297-14653-5" target="_blank" rel="noopener noreferrer" class="book-btn">
        <span>View book on Gijutsu-Hyouron-sha</span>
        <i class="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>

  <h2 class="about-section-heading">
    <span class="heading-icon"><i class="fas fa-video"></i></span>
    <span>Featured talk</span>
  </h2>

  <div class="featured-talk">
    <div class="talk-headline">
      <span class="talk-badge">Google I/O 2025</span>
      <h3 class="talk-title-text">Reshaping user authentication and identity verification</h3>
    </div>
    {% YouTube 'jaaSKZMnUW8' %}
    <p class="talk-caption">A keynote session breaking down the evolution of modern authentication from passkeys to next-generation identity and possession verification, including the Email Verification Protocol (EVP).</p>
  </div>

  <h2 class="about-section-heading">
    <span class="heading-icon"><i class="fas fa-microphone-alt"></i></span>
    <span>Selected conference talks</span>
  </h2>

  <ul class="talks-timeline">
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2023</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=SF8ueIn2Nlc" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Passkeys: a simpler and safer sign-in</a>
        </div>
        <p class="entry-desc">An architectural overview and migration guide for passwordless sign-in with passkeys.</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2022</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=6vnQDn3AUbo" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> A path to a world without passwords</a>
        </div>
        <p class="entry-desc">Laying out the roadmap toward a password-free web with FIDO and WebAuthn.</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2021</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=J6BZ9IQELNA" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> From security as opt-in to security by default</a>
        </div>
        <p class="entry-desc">Deep dive into COOP, COEP, and browser security foundations.</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">CDS 2020</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=sU4MpWYrGSI" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> SMS OTP form best practices</a>
        </div>
        <p class="entry-desc">Streamlining one-time password inputs using the Web OTP API.</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2018</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=kGGMgEfSzMw" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> What's new with sign up and sign in on the web</a>
        </div>
        <p class="entry-desc">Enhancing signup and login workflows with the Credential Management API.</p>
      </div>
    </li>
    <li class="talk-entry">
      <span class="event-tag">Google I/O 2017</span>
      <div class="entry-main">
        <div class="entry-title">
          <a href="https://www.youtube.com/watch?v=DBBFK7bvEQo" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Secure and Seamless Sign-In: Keeping Users Engaged</a>
        </div>
        <p class="entry-desc">Frictionless sign-in techniques that balance security and user retention.</p>
      </div>
    </li>
  </ul>

</div>

