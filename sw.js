/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

'use strict';



var PrecacheConfig = [["assets/fonts/FontAwesome.otf","3b15120c304688379525c9f3c15cc4c2"],["assets/fonts/fontawesome-webfont.eot","90186830c9c50a0fed932494581761d9"],["assets/fonts/fontawesome-webfont.svg","776d58f453c8fe5d6a89e9c31ee223ff"],["assets/fonts/fontawesome-webfont.ttf","4f0022f25672c7f501c339cbf98d9117"],["assets/fonts/fontawesome-webfont.woff","fdf491ce5ff5b2da02708cd0e9864719"],["images/2008/03/notfound.jpg","68be4d26e9885bee3f9456b91f93f46b"],["images/2008/03/notfound.thumbnail.jpg","de37d0116bd0aee2934af09867438f10"],["images/2008/03/orkut1.jpg","43bf623fa6e4bf0f835b424bf4b89888"],["images/2008/03/orkut1.thumbnail.jpg","b8067dc1f9f27381588c9f44bb1278cb"],["images/2008/03/orkut2.jpg","0659f176e696641653863a4b85765cbe"],["images/2008/03/orkut2.thumbnail.jpg","54f78430aef9b3c1f38a8aa51e56726e"],["images/2008/03/orkut3.jpg","f2c5633641636b8dab1fbd9e90dee849"],["images/2008/03/orkut3.thumbnail.jpg","99bbb043e37a31e749ec32ba10a44b75"],["images/2008/03/orkut4.jpg","26006ae8281eb47ab2862bc736987717"],["images/2008/03/orkut4.thumbnail.jpg","0e5906c96f439e12f5bae17c1a23ade8"],["images/2008/03/orkut5.jpg","983ea1200feda016cea9e6d073cff41d"],["images/2008/03/orkut5.thumbnail.jpg","8ce999099a612dc2a2dddf7383d59acb"],["images/2008/03/safari31.jpg","de912f5c1493aee029e76d77d95cfc24"],["images/2008/03/safari31.thumbnail.jpg","dd7546c6abc14f95d2390a7121c33297"],["images/2008/03/safari31_db.jpg","0175a86f34c8f177ac247927e6ab2580"],["images/2008/03/safari31_db.thumbnail.jpg","d9826c97d46bf5032e2991514cbe35fb"],["images/2008/03/shindig.jpg","2917d79fb729c21b2f45731df6baa6c9"],["images/2008/03/shindig.thumbnail.jpg","620903474f545cdd5ba663cb33855a9b"],["images/2008/03/todogadget.jpg","49657d3a736420f4f2b1605a855de0ac"],["images/2008/03/todogadget.thumbnail.jpg","afa7e943108b61a7d846d9eeded3c153"],["images/2008/04/friendfeeder-150x150.jpg","8bf7f3c4dcf3ffbadc055b18abc3b797"],["images/2008/04/friendfeeder.jpg","4f2a62d5173c89fc9f361902bc919191"],["images/2008/04/friendfeedscreen-150x150.jpg","90ef3a1f3767d74b7b42af4b9c19b528"],["images/2008/04/friendfeedscreen-300x198.jpg","fc32ab61a20d7f9e8bb5f5f046107773"],["images/2008/04/friendfeedscreen.jpg","ad61c3d624304635b08b07e4838e2f52"],["images/2008/04/friendfeedservices-150x150.jpg","23a3adbbb252b47651bddbff07b2e5f9"],["images/2008/04/friendfeedservices-186x300.jpg","fe4d1ea033d069fd302b27afb04a7c34"],["images/2008/04/friendfeedservices.jpg","8beb0a36d31c46e6a105f6ca3fb876cf"],["images/2008/04/igoogle_gadget-150x150.jpg","9c3f005601e391eff9a752e259e4e579"],["images/2008/04/igoogle_gadget-300x205.jpg","ec608fd6f8a74e60a495ae22eada2abc"],["images/2008/04/igoogle_gadget.jpg","5a16ddda15de1f2fd628eec05b71377c"],["images/2008/04/igoogle_lang-150x150.jpg","3cd10573727916fbbc0a55303c4c09f2"],["images/2008/04/igoogle_lang-300x146.jpg","30735943d28c32e245ade40134074f18"],["images/2008/04/igoogle_lang.jpg","9ec6b45a249731e00e7f3facfc5bb069"],["images/2008/04/igoogle_navi-110x300.jpg","547e412099967405c64a0f754155ace2"],["images/2008/04/igoogle_navi-150x150.jpg","efe87fb7142f77ca28517bfa6aae9d8b"],["images/2008/04/igoogle_navi.jpg","d0ad39b4aa04b89b282a408ed5592777"],["images/2008/04/igoogle_signup-150x150.jpg","b463ef308afca57e38d11fca6a1ef0f0"],["images/2008/04/igoogle_signup-300x161.jpg","70de629ac3cbc65ffb8b99faaf8519f8"],["images/2008/04/igoogle_signup.jpg","c5a7a11b184c86afbc607a9fdf72c1d2"],["images/2008/04/igoogle_top-150x150.jpg","c1edc4d030e53a279c0726caa152291e"],["images/2008/04/igoogle_top-300x147.jpg","7664fc9f7f3672012b83826cebff61ea"],["images/2008/04/igoogle_top.jpg","d955f9c91eda47947156db7a6fc900cc"],["images/2008/04/mindmeister-150x150.jpg","607b3b9c2384366edb5f39757effe45d"],["images/2008/04/mindmeister-300x180.jpg","6353aa012e72a112a26d6644fd90e220"],["images/2008/04/mindmeister.jpg","8190f486ce7efb18723ca6862cf5e4b3"],["images/2008/04/mindmeister_logo-150x44.gif","fb83a710df676d9eb6eb7fe1fe7636c2"],["images/2008/04/mindmeister_logo.gif","a2720bbda2d8c54221e165b8e53c6e7a"],["images/2008/04/mindmeister_offline-150x150.jpg","80384511e18111787ade41814580e822"],["images/2008/04/mindmeister_offline-300x186.jpg","ecd2de1817146ea86e033fd36b9fb833"],["images/2008/04/mindmeister_offline.jpg","5ac7b639c9261ac54f1d02ee1a019e21"],["images/2008/04/mindmeister_openid-150x150.jpg","7964da283b937d3a82f5e039b74117a0"],["images/2008/04/mindmeister_openid-300x133.jpg","84a40babbcd4b526c464f60b26039cb1"],["images/2008/04/mindmeister_openid.jpg","a20f1635a13e9854beeaa6736f19bb5a"],["images/2008/04/mindmeister_widget-150x119.jpg","3ad59e93288015cd1025a8cd9f0aae64"],["images/2008/04/mindmeister_widget-300x82.jpg","f77d8e64cf9e5bef7fd6e8ed09a1d0b4"],["images/2008/04/mindmeister_widget.jpg","d088fc4ea151040210dc539798c4a7e6"],["images/2008/04/myspace_myapp_detail-150x55.jpg","caeb15a9ec7fae404833f098bf6e7b97"],["images/2008/04/myspace_myapp_detail-300x29.jpg","f5c619d739e1c2bf953dd3556f9f00a2"],["images/2008/04/myspace_myapp_detail.jpg","f9fd1014dd90efd390bc098d7e13647b"],["images/2008/04/myspace_myapps-150x150.jpg","45a9693534b2baa26fba08333ceac439"],["images/2008/04/myspace_myapps-300x160.jpg","b9b600b9b72e19b223d6318616c2a9a3"],["images/2008/04/myspace_myapps.jpg","396e23ca0bc414b04caefe69561060b5"],["images/2008/04/myspace_oauthtool-150x150.jpg","6af1d63d9aa5afd106ca43ebb570444f"],["images/2008/04/myspace_oauthtool-300x209.jpg","0ed3a6989e6ada850c971341f6edee6d"],["images/2008/04/myspace_oauthtool.jpg","ef53b0db565982ebd7078ec6f2d65fee"],["images/2008/04/myspace_oauthtool_detail-143x300.jpg","df6a565e7c973c3b3df3ecb0688adcac"],["images/2008/04/myspace_oauthtool_detail-150x150.jpg","6248471abdba58f29b933c6d42409549"],["images/2008/04/myspace_oauthtool_detail.jpg","65ebc197f909d07c73da299ef20666a5"],["images/2008/04/opensocial_components-150x150.png","048892ad2ee64da102f4f54c37e2f404"],["images/2008/04/opensocial_components-300x270.png","ea7f070195329e9fa6c5be06373f0ca1"],["images/2008/04/opensocial_components.png","249e9f81871b0acdb28ad981e4ead8a6"],["images/2008/05/appfresh-150x150.jpg","70781e7100ee227a74916f7d83bd2536"],["images/2008/05/appfresh-300x238.jpg","8397a4ba8907c02c4d4e72359c206f98"],["images/2008/05/appfresh.jpg","ceb84a801a66663091afd9a3994e379b"],["images/2008/05/iusethis_icon-150x150.jpg","5664c637ea41f30b69e51a344541fe4d"],["images/2008/05/iusethis_icon-300x191.jpg","f12eab17f3708dbe3ee5863e8e4664e5"],["images/2008/05/iusethis_icon.jpg","ce7a896b19d7bb7a5069f44732238d2e"],["images/2008/05/iusethis_top-150x150.jpg","2293690dd463cdd5afa7e20ecb3b1935"],["images/2008/05/iusethis_top-300x224.jpg","185284e498e16c96699346a3f192fbc4"],["images/2008/05/iusethis_top.jpg","2856675c4e11ed3ac47b1d038e4ed323"],["images/2008/05/partuza-150x150.jpg","1f03000ce93017dca6f27e49d432b10d"],["images/2008/05/partuza-300x185.jpg","8731c1fd3b5488d82f69e94a302274ed"],["images/2008/05/partuza.jpg","e3f8d3a29d3b5a52828c797a33c8cff7"],["images/2008/06/compliancetest-150x150.jpg","35b05fab5cfb7802248bcd4cf863f5ff"],["images/2008/06/compliancetest-257x299.jpg","b911928c4dafaf98113fe4480be3b5f5"],["images/2008/06/compliancetest.jpg","e2760a9d9c0871d8bd17eafdba33dca5"],["images/2008/08/cropped-header-150x150.jpg","f2b08bf4b174ea74e76d57e72a1abf0d"],["images/2008/08/cropped-header-300x60.jpg","52fac88355a2c1cc8446898dce301a1e"],["images/2008/08/cropped-header.jpg","3d290033d29b506321ccc956a73493fc"],["images/2008/08/e38394e382afe38381e383a3-1-150x150.jpg","48312cdba46508f88ad68f0832b8092b"],["images/2008/08/e38394e382afe38381e383a3-1-300x95.jpg","d1d7667933f2ea5f79ce7793233978f3"],["images/2008/08/e38394e382afe38381e383a3-1.jpg","7a7a9b0548cdd61e22c1299358663b9c"],["images/2008/08/e38394e382afe38381e383a3-11-150x150.jpg","655321bd873228b126d850dc741a4605"],["images/2008/08/e38394e382afe38381e383a3-11-300x59.jpg","e46faa94846930a7d43310ff5bc55751"],["images/2008/08/e38394e382afe38381e383a3-11.jpg","d5682505f1e4f7b516364bd690dff469"],["images/2008/08/e38394e382afe38381e383a3-3-150x150.jpg","a47c9b104d164bd3099cf251e2953b81"],["images/2008/08/e38394e382afe38381e383a3-3-300x88.jpg","0f4f1c64ca625f8828be1e330646688c"],["images/2008/08/e38394e382afe38381e383a3-3.jpg","7fbae4d80df60d6cc742081f91041117"],["images/2008/08/e38394e382afe38381e383a3-31-150x150.jpg","f69819219b5a37deffa9643bafb3c441"],["images/2008/08/e38394e382afe38381e383a3-31-300x75.jpg","242786c11cd44abc86bf5338b28d3ea3"],["images/2008/08/e38394e382afe38381e383a3-31.jpg","15a6e6d7a429fb14ec77e7e613226b51"],["images/2008/08/e38394e382afe38381e383a3-4-150x150.jpg","e9aaf651667815e028c37d17997133bb"],["images/2008/08/e38394e382afe38381e383a3-4-300x185.jpg","d758ea194651e82526ba0977e9a38938"],["images/2008/08/e38394e382afe38381e383a3-4.jpg","dd1208c6c7787c65ba402086653f1244"],["images/2008/08/e38394e382afe38381e383a3-5-150x150.jpg","3b94e58c06689569d09de8454fcf8f50"],["images/2008/08/e38394e382afe38381e383a3-5-300x288.jpg","e5607c8c4e4a7756b6e2c8c0f01b424e"],["images/2008/08/e38394e382afe38381e383a3-5.jpg","91e7251bf765d5821b6836cf04e25fa2"],["images/2008/10/yos_appdef-150x150.jpg","eb82f2d9f1ad454ac0a7f80f97f0b55a"],["images/2008/10/yos_appdef-300x184.jpg","61d9f800be0dec7adc1fe54f975a5fa0"],["images/2008/10/yos_appdef.jpg","7139d023283e7fc648998f55942649fa"],["images/2008/11/citysearch1-150x150.jpg","23ede842a03deef8e8d576cc2a4754b1"],["images/2008/11/citysearch1-300x180.jpg","819cb4f0d05c13b59fd17c3f79ec08a4"],["images/2008/11/citysearch1.jpg","9b569520d741f8c248d88c107d0f4a1a"],["images/2008/11/citysearch2-150x150.jpg","aa7218d2ed453976317e4b5992ad12d2"],["images/2008/11/citysearch2-300x180.jpg","6876a1ddd590007637bc19c766b32ad8"],["images/2008/11/citysearch2.jpg","d9829cd642f31f1b251c2c4c08d38bec"],["images/2008/11/citysearch3-150x150.jpg","5a55d30c94beb0365ca1fd135ae47950"],["images/2008/11/citysearch3-300x175.jpg","cc0b6c28c9a3fc2f35aec175b9933b79"],["images/2008/11/citysearch3.jpg","15f06a6b8d2f5ce493d77baf483894b9"],["images/2008/11/citysearch4-150x150.jpg","c7b92485fd733769137580836aa3d2ca"],["images/2008/11/citysearch4-300x180.jpg","f9923da9911ba9bb049453f208066678"],["images/2008/11/citysearch4.jpg","801c1fde4fe4a9e80ac0f03994cda585"],["images/2008/11/citysearch5-150x150.jpg","8ceb1f31ab98147b831f31a598d33374"],["images/2008/11/citysearch5-300x180.jpg","c084c1d0ee1b41321602caac6adaffff"],["images/2008/11/citysearch5.jpg","f04b0b899370914e056d796ad3f50494"],["images/2008/11/citysearch6-150x150.jpg","fc0f91626202c3d7f130859e603a7a99"],["images/2008/11/citysearch6-300x180.jpg","46a3c04323f31f021127aa25fd8fa333"],["images/2008/11/citysearch6.jpg","ad962485aebfcf6eb0ee235c829d4c5c"],["images/2008/11/citysearch7-150x150.png","59e03b317dad2217a91c3d8447a8b1ca"],["images/2008/11/citysearch7-300x218.png","e2060de26e1fe9718ae28af00ad22142"],["images/2008/11/citysearch7.png","d71b7ac0ab6b93942db10bcf053051be"],["images/2008/11/googleprofile-150x150.png","4c251ec1bdd27ace05ee60b0d841ebd0"],["images/2008/11/googleprofile-300x165.png","5f25bce0a953b9089bf378c3912a8897"],["images/2008/11/googleprofile.png","9826dbec08703fd5ecefe34421a263de"],["images/2008/11/googleprofilelink-150x150.png","1bfd76b37beb7943d1001117d9ec90dc"],["images/2008/11/googleprofilelink-300x167.png","7341911995fdc1a155098d198566846a"],["images/2008/11/googleprofilelink.png","b7e5461dd9af2b9c59393c5df6eba48e"],["images/2008/11/igoogle1-150x150.png","a14b6cb71869ec2d5d22a97bb7cdab57"],["images/2008/11/igoogle1-300x150.png","d847107c798b751e542464c054c479a4"],["images/2008/11/igoogle1.png","d3bf57c4515a9d39b0079c8503e58d0f"],["images/2008/11/igoogle2-150x150.png","c9d2ad8e029bfc675559b4131d660c7e"],["images/2008/11/igoogle2-300x152.png","71f2ebba785337994426193ac5d3d61a"],["images/2008/11/igoogle2.png","a307a5a269221941a87ea32534fcc079"],["images/2008/11/signinfacebook-150x25.png","f548c53c1d7ef921cff08a80e946051d"],["images/2008/11/signinfacebook-300x20.png","813a7042555e9940db8a404c3acf3717"],["images/2008/11/signinfacebook.png","099afc7946cc69aa86f4a679278a4ec2"],["images/2008/12/e38394e382afe38381e383a3-1-126x300.png","8e6745ce850cec254bfcfbd0a8cabfda"],["images/2008/12/e38394e382afe38381e383a3-1-150x150.png","c1570c8c6621fc585803f053a286b4ab"],["images/2008/12/e38394e382afe38381e383a3-1.png","21559c9c5d6bf87901466525582cbe6b"],["images/2008/12/livenew1-150x150.jpg","4419112be098141ad525457fe86aba2a"],["images/2008/12/livenew1-300x195.jpg","c89d31eacecb14f9bab42387461aac6d"],["images/2008/12/livenew1.jpg","38dc7d28a2c2782641c63b99fb007674"],["images/2008/12/livenew2-150x150.jpg","fe1077649bcb7cb6f9ada737332a66a8"],["images/2008/12/livenew2-300x268.jpg","ff1d2b21b1965b970dc4d76c6a736203"],["images/2008/12/livenew2.jpg","82f1862d32bd0b5bd82b62a490f94221"],["images/2008/12/livenew3-150x150.jpg","d1a901f0c3227a26bd6dbce850080978"],["images/2008/12/livenew3-278x300.jpg","aea08292bdd04da8d740146e6e064630"],["images/2008/12/livenew3.jpg","56b106ab645ccde305262cd640b77158"],["images/2008/12/livenew4-150x150.jpg","fb2cae241a7112ad2116de44c8f3d9f7"],["images/2008/12/livenew4-300x207.jpg","fc246845cce08dad845b3bebef7bb7fa"],["images/2008/12/livenew4.jpg","6326dcc985ab9a34cf9d64ae27dbaf3f"],["images/2008/12/livenew5-150x150.jpg","1b35e935507d109c5284e34fd84ad725"],["images/2008/12/livenew5-300x202.jpg","a17447ae09d1b4dad1f3774a36547407"],["images/2008/12/livenew5.jpg","545373eef8a658a03fbe52861e8840d8"],["images/2009/01/e38394e382afe38381e383a3-12-150x150.png","c6f80f0650b33f886c8dac6a8a22cec8"],["images/2009/01/e38394e382afe38381e383a3-12.png","28ca85208427bf00de9d3a576339f75e"],["images/2009/01/e38394e382afe38381e383a3-13-150x150.png","9d948cd0a16bb9ad3c6df719a4a2a71f"],["images/2009/01/e38394e382afe38381e383a3-13-300x86.png","224a178a223fd9b530a8cdefff073ef2"],["images/2009/01/e38394e382afe38381e383a3-13.png","325659065c90b144962e34f2230c49b3"],["images/2009/01/e38394e382afe38381e383a3-14-150x150.png","20a402ac8bbb806bf5520a39a5194a9d"],["images/2009/01/e38394e382afe38381e383a3-14-213x300.png","32fdeb067ddb37667733976fe1cd981f"],["images/2009/01/e38394e382afe38381e383a3-14.png","a16065a1d035604757bc31a3d1feb9cf"],["images/2009/01/e38394e382afe38381e383a3-2-150x150.png","93dfe240fa15d73977394c641179b7fa"],["images/2009/01/e38394e382afe38381e383a3-2-155x300.png","dfec2f1e41e4860927f4168956985c1d"],["images/2009/01/e38394e382afe38381e383a3-2.png","ed3d41f754713772e09cc0d5f3980027"],["images/2009/01/e38394e382afe38381e383a3-3-150x150.png","8f6dbc5812b5d5315babdd556c5b5ac9"],["images/2009/01/e38394e382afe38381e383a3-3-166x300.png","a8aa2f1351c78beec0c7ba0b241b0634"],["images/2009/01/e38394e382afe38381e383a3-3.png","8567ee010df02249e4ab1e97b5f888e7"],["images/2009/01/e38394e382afe38381e383a3-4-150x150.png","a57e835293162fcb585c4ce10284a9ca"],["images/2009/01/e38394e382afe38381e383a3-4-300x188.png","8ef16b1643148bd109bc948da2090e50"],["images/2009/01/e38394e382afe38381e383a3-4.png","0465ef60e528360d14ff4476fd6ae78d"],["images/2009/01/e38394e382afe38381e383a3-5-150x150.png","f2b3319b1b06cfa7f7f79ab10803e8ec"],["images/2009/01/e38394e382afe38381e383a3-5.png","0e2ecd37a6c39e1d1b8e79c5214b1677"],["images/2009/01/e38394e382afe38381e383a3-6-150x150.png","68424e437514b99da82c0f5e5064bbd8"],["images/2009/01/e38394e382afe38381e383a3-6-300x231.png","309d772e02b6c9f3caf3206bb989539d"],["images/2009/01/e38394e382afe38381e383a3-6.png","564f09869c24cf1a14fe9d6909785421"],["images/2009/01/e38394e382afe38381e383a3-7-150x150.png","0d6f1e1bba0d6052c1162ed3c02ba412"],["images/2009/01/e38394e382afe38381e383a3-7-300x197.png","4d88794737d5375e94700298410ab855"],["images/2009/01/e38394e382afe38381e383a3-7.png","97c26df7bad173e6edda6d1c6f4cd517"],["images/2009/03/home-150x150.png","30c9481524d71c030a75c261b2853bba"],["images/2009/03/home-300x240.png","f5b9a568cb8ff6715b0901582a9ddb42"],["images/2009/03/home.png","733b755f505336e1f29d3e630d1a105d"],["images/2009/08/GadgeTweetr_Logo-150x119.png","1914451cb3997974bdb391e3316d9016"],["images/2009/08/GadgeTweetr_Logo-300x57.png","445e3749fcd418f6c522cf611050ff4c"],["images/2009/08/GadgeTweetr_Logo.png","3e9ef31183c9b338eb538d56fe7c3977"],["images/2009/08/decd90d6f3baa9553fd625ecb11d3b8b-150x150.png","02c66c72dc01845efae2256598e52b1a"],["images/2009/08/decd90d6f3baa9553fd625ecb11d3b8b-300x203.png","5a57002dd68d97517ca06b1229159445"],["images/2009/08/decd90d6f3baa9553fd625ecb11d3b8b.png","c161eb430efa0c3f9c51238392a764ec"],["images/2009/08/multi-account-134x300.png","a1148ed244fc6ab9ff5be4f0fc03ea71"],["images/2009/08/multi-account-150x150.png","a4519e92fdae8c661b09824e2db95e5e"],["images/2009/08/multi-account.png","cbab31f39aea1b5a2e9f3cf5075517eb"],["images/2009/08/profiles-150x150.png","c6cddf5d5163728b44578d65666b6b23"],["images/2009/08/profiles-300x259.png","418a9001b2eebc92551403ea9a734e03"],["images/2009/08/profiles.png","cdc12b62e4284d954f695f791e1c52f4"],["images/2009/08/replies-150x150.png","967d36c467584c9b75b918f006da2566"],["images/2009/08/replies-300x157.png","9423c72d89350b5da48f143ee27c74d7"],["images/2009/08/replies.png","6bca0a0b43fec9da1a9cea460689a94c"],["images/2009/08/search-150x150.png","99e34c1393057d7b6734bfe70fa7826a"],["images/2009/08/search-300x203.png","661ffd214e7503606340861f80b4a0fc"],["images/2009/08/search.png","420d9276d0278b3982ced186091a23a1"],["images/2009/08/tabs-150x143.png","266736a00a81a6a353aeafc62258b5d0"],["images/2009/08/tabs.png","8f5d961a974e24b146fde374f3414043"],["images/2009/10/profile5-150x150.jpg","0a8963ed04db07757ec2cf4a8fb01220"],["images/2009/10/profile5-300x300.jpg","e087073c3c600cd344a64174b2271ccd"],["images/2009/10/profile5.jpg","7097257cdbba6f2201d82dd80d5e55e9"],["images/2009/10/profile6-150x150.jpg","864452ac4a6bc089d41ab8ae2cf6748c"],["images/2009/10/profile6-300x300.jpg","ad3047a0668e0f9cc0101995d953d142"],["images/2009/10/profile6.jpg","46656025a0495e6d7b39b986f94a63c8"],["images/2009/12/1ca5ea24ffffc82805aeb8af408a57f8-150x150.png","e8efdd2ec0f918325bcdac8df3bad83b"],["images/2009/12/1ca5ea24ffffc82805aeb8af408a57f8-300x183.png","265c3a0961de61f27166cddaa405ad13"],["images/2009/12/1ca5ea24ffffc82805aeb8af408a57f8.png","6ae3023c95d414dbb198ca3de7a16c2a"],["images/2009/12/49f9ef7870606007b938ae89e55b1d85-150x150.png","9dc9ae00ee4846cb962d10138dc1d540"],["images/2009/12/49f9ef7870606007b938ae89e55b1d85-300x183.png","4ca04e624e8fcc9b6020356ecb3e4e86"],["images/2009/12/49f9ef7870606007b938ae89e55b1d85.png","15a226036f67aba10fcd2624a9880a85"],["images/2010/01/Google-Docs-ACL-150x150.png","1e2b0287d73b6bdfca489f82dc176bea"],["images/2010/01/Google-Docs-ACL-300x205.png","3a7153ca0eb2af0a5f94f4b8be380d3d"],["images/2010/01/Google-Docs-ACL1-150x150.png","1e2b0287d73b6bdfca489f82dc176bea"],["images/2010/01/Google-Docs-ACL1-300x205.png","3a7153ca0eb2af0a5f94f4b8be380d3d"],["images/2010/01/Google-Docs-ACL2-150x150.png","5936f2d49a3278b964b721268c7d77b2"],["images/2010/01/Google-Docs-ACL2-300x204.png","4046c0e2252c0128662dd12f9a6dd4b1"],["images/2010/01/Google-Docs-ACL2.png","f2b9ede06d6eaefcb5d9ff8fb93f0825"],["images/2010/01/foursquare-150x144.png","c288efcd6aca449052e250e5deef8091"],["images/2010/01/foursquare-300x123.png","71a0c3ee199d3c24722fe280ff774e3d"],["images/2010/01/foursquare-activity-feedback-150x150.png","bdc2e904b4109639107776731c90902d"],["images/2010/01/foursquare-activity-feedback-300x112.png","3c3e879971aa96dd85dcce6fedf12494"],["images/2010/01/foursquare-activity-feedback.png","10d1b243dc0d5a64559ab9a66e3d171c"],["images/2010/01/foursquare-friend-request-150x150.png","04d880a3326e54d83f37638d49ed3bf1"],["images/2010/01/foursquare-friend-request-300x248.png","46108129f9c5cf6d7595f02efbc7dbc8"],["images/2010/01/foursquare-friend-request.png","e4f591de20be0d9af4cad82483314547"],["images/2010/01/foursquare-iphone-138x150.png","750b0058a08cd91d45bde266fa2827e2"],["images/2010/01/foursquare-iphone.png","77897c8ef1ac2571dcfadfe4e68e6d6d"],["images/2010/01/foursquare-login-150x150.png","fe42249725aef7cfeb1d80c952975842"],["images/2010/01/foursquare-login-300x86.png","cfd62cd575aea5b915c06e9f617d6367"],["images/2010/01/foursquare-login.png","5d82480557bd7f176db69619ffd61c7f"],["images/2010/01/foursquare.png","9f1cd41957a8e61828b5a951d13b5f25"],["images/2010/01/homfjkcmjicjclikljgmjfmfmcbkihco-150x150.png","d8c8fbea5ef7fb36a69363ad733d0859"],["images/2010/01/homfjkcmjicjclikljgmjfmfmcbkihco-300x226.png","8487eced8f8362b4beb75c2451ab954a"],["images/2010/01/homfjkcmjicjclikljgmjfmfmcbkihco.png","3d965f62151dee5fd304ef57d9594e79"],["images/2010/04/d50f8d53bed8399f650724e67859655d-150x150.png","c54ae9568ca6dabdcd5d980982269698"],["images/2010/04/d50f8d53bed8399f650724e67859655d-300x218.png","8300654183f71a737d9ea563e1304fda"],["images/2010/04/d50f8d53bed8399f650724e67859655d.png","770b48b9d5ba0cf7ca592703836a024d"],["images/2010/04/mixi-150x150.png","863fe52ab4c3d703bd8f0d1ced912a99"],["images/2010/04/mixi-300x221.png","d135c036d94651a50d6b8e5187d4056c"],["images/2010/04/mixi.png","767c9cd7d76e1688e24e3b33ef5f6476"],["images/2010/08/10-23-57-15-150x150.jpg","6ac097735b5b9b8b1b34e5f9cae2facb"],["images/2010/08/10-23-57-15-200x300.jpg","75c7582e554f9b6b4a6a674f7fdba840"],["images/2010/08/10-23-57-15.jpg","4e878fb2b42a628ef29e6432e7f07129"],["images/2010/08/10-23-57-28-150x150.jpg","0a42220d76cb774ae21f4503a29ea135"],["images/2010/08/10-23-57-28-200x300.jpg","46086dce3d1390458e87475787b61437"],["images/2010/08/10-23-57-28.jpg","5744df184328d23b05bdc6686c571407"],["images/2010/08/10-23-57-38-150x150.jpg","b1276606a6acb1c5f4db5a3c9d8b77f4"],["images/2010/08/10-23-57-38-200x300.jpg","ac765493e570902f96dabea6c90a9f25"],["images/2010/08/10-23-57-38.jpg","cddd002139a149ff7d7f8fe5df5dba3a"],["images/2010/08/11-0-10-35-150x150.jpg","85e4e1c6cfc5a72b4d9693a89d342df0"],["images/2010/08/11-0-10-35-200x300.jpg","6f74f6678914b3d4b03dd112a3df453c"],["images/2010/08/11-0-10-35.jpg","eb4ccf29d425836cfc5b52c08d19fc8e"],["images/2011/02/1851db9c1db5c8f0bc6adceef0231691-150x150.png","1984ba5098a321af773dce923eb4e86c"],["images/2011/02/1851db9c1db5c8f0bc6adceef0231691-300x224.png","0e91585e35edbe9dc7a79daaca95cb5f"],["images/2011/02/1851db9c1db5c8f0bc6adceef0231691.png","e54ff15d6fff7cd8f5978ba367d2a2e9"],["images/2011/02/301f44638c5fc675e52a29c723966a43-150x142.png","1477e0ac4db1eba1a5ae2b521509fbe3"],["images/2011/02/301f44638c5fc675e52a29c723966a43-300x72.png","53e31b710dac8b643d0bf82af778692b"],["images/2011/02/301f44638c5fc675e52a29c723966a43.png","bb2bac8e7e991f2f5132e77b359003b2"],["images/2011/02/7ba990c3abe0dbe6ff76c3a27d2896da-150x150.png","26aa3f339a83c4725fffee6920d77f41"],["images/2011/02/7ba990c3abe0dbe6ff76c3a27d2896da-300x138.png","40edd776f85c4e6a0653ad5a67d0ed4c"],["images/2011/02/7ba990c3abe0dbe6ff76c3a27d2896da.png","44d3cbf6a7d6955b9e87bc729f16ae03"],["images/2011/02/8bf2ae48767db6381d5d8955514ac2d0-150x150.png","38e0d5ded60910426d7ebba025bbb92a"],["images/2011/02/8bf2ae48767db6381d5d8955514ac2d0-300x234.png","bcdc6d1def25696ae4cba57a0f76ad91"],["images/2011/02/8bf2ae48767db6381d5d8955514ac2d0.png","a60cb0e21939a70c527eb2d0cbee2c0d"],["images/2011/04/metronome-150x150.png","a2fbee339af7fd860bdc0da23c24e67e"],["images/2011/04/metronome-272x300.png","a4a567fa6e9fe8c810effd66332bbc38"],["images/2011/04/metronome.png","e8111b7d2197b696d25a39c4eae2db89"],["images/2011/04/twitter_large.jpg","b9517939fca9e8e9f4c07f01970282f6"],["images/2011/07/233b1844c6d899c679f560e35058d333-150x150.png","6ec113e1fb780f16f53e2cb2132a84d8"],["images/2011/07/233b1844c6d899c679f560e35058d333-200x300.png","70f2736d2a73931bec53528329d470fe"],["images/2011/07/233b1844c6d899c679f560e35058d333.png","c506de115d3b25cc56a4778f264ba25f"],["images/2011/07/2bf6d446a21bf24a86472b536c525421-150x150.png","b1a012cf63fdfdfbcbf7070ca044733c"],["images/2011/07/2bf6d446a21bf24a86472b536c525421-200x300.png","e3f41e365998c853014eee8c6c6e34ad"],["images/2011/07/2bf6d446a21bf24a86472b536c525421.png","e39c7329f0c4093667f261a781a72500"],["images/2013-04-11-google-developer-advocate/gde.jpg","e5d925c9b76910a60a4c5be1c432c105"],["images/2015-03-13/push-message.gif","b3009bbd7050664a91a8de3815b316e2"],["images/2015-03-13/push-notification.png","ddc31d9b0dd1f5fe60263ffe423db20d"],["images/3953273590_704e3899d5_m.jpg","6c207ca55efbe0cf595f3c63a7c17c7b"],["images/abstract-1.jpg","f1c270f96cdbc4d3051bdc6d39fd2ef0"],["images/abstract-10.jpg","71c0746970b5a8b34b7a96e2be51fffd"],["images/abstract-11.jpg","3c6de241719ba3084899908d5fd1b246"],["images/abstract-12.jpg","3c5ee83a8c5367321a904d0d025c876d"],["images/abstract-2.jpg","eda55ef8e7bc83359da618faf9e67799"],["images/abstract-3.jpg","e50602f3580a1b9ac6b3e286ded6196a"],["images/abstract-4.jpg","fc63302804334a86b924444d13331b32"],["images/abstract-5.jpg","eec960b0c4fdc35fe78d195d1d7b8287"],["images/abstract-6.jpg","a7221aa19f3960274dfa251fe4f3e6b4"],["images/abstract-7.jpg","67a54c79c7a465fd2220d0a47f438cc2"],["images/abstract-8.jpg","67e426ce690047662eabe5f2c019adda"],["images/apple-touch-icon-114x114-precomposed.png","1573cdb81bfc6d060f3b56a2d6d13ab0"],["images/apple-touch-icon-144x144-precomposed.png","c152ffb519a98a9d00ff707e1caaa676"],["images/apple-touch-icon-72x72-precomposed.png","85ec96e3a0dcbda83c90d1ddf8214444"],["images/apple-touch-icon-precomposed.png","e6ad70e9563387ef06daa75bd270f9fe"],["images/avatar.jpg","6bdeb0e0a8a4db40349aa8170bdbe454"],["images/cover.jpg","ccbd4952cfc0ffe4dcea1d8d15efda90"],["images/custom-elements-web-components/image.png","15fa5f1d6e07e946f98c78501e315320"],["images/custom-elements-web-components/inheritance.png","1663d2fa36587ab3069afa41960b5360"],["images/custom-elements-web-components/relative-time.png","27941fee4ef1b2024db98ff9eec91083"],["images/custom-elements-web-components/time.png","cf4fe0bcacfe18f522cfb0199cf5f174"],["images/event-report-web-music-hackathon-3/guitar.jpg","212719e5f2d6cd43c7e289ffd3ddcf6b"],["images/hpstr-jekyll-theme-preview.jpg","9b348d61cbcbe12a591bdcd41794e4e1"],["images/html-imports-web-components/dependency.png","eb61155aa9733f8773e4c4f6ccbd786e"],["images/icon-114x114.jpg","afbb93cf845c81299ee12bf8450f715e"],["images/icon-144x144.jpg","dc2db91e864adc668cc5cbbe8538a11e"],["images/icon-192x192.jpg","6dcae887e3127fef15782b0b72633370"],["images/icon-57x57.jpg","c91c14a7fa117864ab7e8f6a7a494413"],["images/icon-72x72.jpg","f4bb94805252d946f8542c6af8cb3606"],["images/ps_neutral.png","4564e7e43d8fa7a90cd9f46224bf7725"],["images/shadow-dom-web-components/architecture.png","525d5fbd841159146270ff760fee9fde"],["images/triangular.png","1903350ef40b9b37a4597c3f4f41e5f7"],["images/twitter-card-summary-large-image.jpg","9df64874278de9a4bd9672d6eafeca03"],["images/websocket/AudioStreamer.png","b0419b212409d364209b829d8b79b084"],["images/witewall_3.png","5b9a849f8cc87060a2699b7704c7ba7a"]];
var CacheNamePrefix = 'sw-precache-v1-hpstr-theme-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var populateCurrentCacheNames = function (precacheConfig, cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};

    precacheConfig.forEach(function(cacheOption) {
      var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
      var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
      currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
      absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
      absoluteUrlToCacheName: absoluteUrlToCacheName,
      currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
  };

var stripIgnoredUrlParameters = function (originalUrl, ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
  return caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  });
}

self.addEventListener('install', function(event) {
  var now = Date.now();

  event.waitUntil(
    caches.keys().then(function(allCacheNames) {
      return Promise.all(
        Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(cacheName) {
          return allCacheNames.indexOf(cacheName) == -1;
        }).map(function(cacheName) {
          var url = new URL(CurrentCacheNamesToAbsoluteUrl[cacheName]);
          // Put in a cache-busting parameter to ensure we're caching a fresh response.
          if (url.search) {
            url.search += '&';
          }
          url.search += 'sw-precache=' + now;
          var urlWithCacheBusting = url.toString();

          console.log('Adding URL "%s" to cache named "%s"', urlWithCacheBusting, cacheName);
          return caches.open(cacheName).then(function(cache) {
            var request = new Request(urlWithCacheBusting, {credentials: 'same-origin'});
            return fetch(request.clone()).then(function(response) {
              if (response.status == 200) {
                return cache.put(request, response);
              } else {
                console.error('Request for %s returned a response with status %d, so not attempting to cache it.',
                  urlWithCacheBusting, response.status);
                // Get rid of the empty cache if we can't add a successful response to it.
                return caches.delete(cacheName);
              }
            });
          });
        })
      ).then(function() {
        return Promise.all(
          allCacheNames.filter(function(cacheName) {
            return cacheName.indexOf(CacheNamePrefix) == 0 &&
                   !(cacheName in CurrentCacheNamesToAbsoluteUrl);
          }).map(function(cacheName) {
            console.log('Deleting out-of-date cache "%s"', cacheName);
            return caches.delete(cacheName);
          })
        )
      });
    }).then(function() {
      if (typeof self.skipWaiting == 'function') {
        // Force the SW to transition from installing -> active state
        self.skipWaiting();
      }
    })
  );
});

if (self.clients && (typeof self.clients.claim == 'function')) {
  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });
}

self.addEventListener('message', function(event) {
  if (event.data.command == 'delete_all') {
    console.log('About to delete all caches...');
    deleteAllCaches().then(function() {
      console.log('Caches deleted.');
      event.ports[0].postMessage({
        error: null
      });
    }).catch(function(error) {
      console.log('Caches not deleted:', error);
      event.ports[0].postMessage({
        error: error
      });
    });
  }
});


self.addEventListener('fetch', function(event) {
  if (event.request.method == 'GET') {
    var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
      IgnoreUrlParametersMatching);

    var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    var directoryIndex = 'index.html';
    if (!cacheName && directoryIndex) {
      urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
      cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
    }

    if (cacheName) {
      event.respondWith(
        // We can't call cache.match(event.request) since the entry in the cache will contain the
        // cache-busting parameter. Instead, rely on the fact that each cache should only have one
        // entry, and return that.
        caches.open(cacheName).then(function(cache) {
          return cache.keys().then(function(keys) {
            return cache.match(keys[0]).then(function(response) {
              return response || fetch(event.request).catch(function(e) {
                console.error('Fetch for "%s" failed: %O', urlWithoutIgnoredParameters, e);
              });
            });
          });
        }).catch(function(e) {
          console.error('Couldn\'t serve response for "%s" from cache: %O', urlWithoutIgnoredParameters, e);
          return fetch(event.request);
        })
      );
    }
  }
});

