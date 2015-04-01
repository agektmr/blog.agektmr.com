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



var PrecacheConfig = [["assets/fonts/FontAwesome.otf","3b15120c304688379525c9f3c15cc4c2"],["assets/fonts/fontawesome-webfont.eot","90186830c9c50a0fed932494581761d9"],["assets/fonts/fontawesome-webfont.svg","776d58f453c8fe5d6a89e9c31ee223ff"],["assets/fonts/fontawesome-webfont.ttf","4f0022f25672c7f501c339cbf98d9117"],["assets/fonts/fontawesome-webfont.woff","fdf491ce5ff5b2da02708cd0e9864719"],["images/3953273590_704e3899d5_m.jpg","6c207ca55efbe0cf595f3c63a7c17c7b"],["images/abstract-1.jpg","f1c270f96cdbc4d3051bdc6d39fd2ef0"],["images/abstract-10.jpg","71c0746970b5a8b34b7a96e2be51fffd"],["images/abstract-11.jpg","3c6de241719ba3084899908d5fd1b246"],["images/abstract-12.jpg","3c5ee83a8c5367321a904d0d025c876d"],["images/abstract-2.jpg","eda55ef8e7bc83359da618faf9e67799"],["images/abstract-3.jpg","e50602f3580a1b9ac6b3e286ded6196a"],["images/abstract-4.jpg","fc63302804334a86b924444d13331b32"],["images/abstract-5.jpg","eec960b0c4fdc35fe78d195d1d7b8287"],["images/abstract-6.jpg","a7221aa19f3960274dfa251fe4f3e6b4"],["images/abstract-7.jpg","67a54c79c7a465fd2220d0a47f438cc2"],["images/abstract-8.jpg","67e426ce690047662eabe5f2c019adda"],["images/apple-touch-icon-114x114-precomposed.png","1573cdb81bfc6d060f3b56a2d6d13ab0"],["images/apple-touch-icon-144x144-precomposed.png","c152ffb519a98a9d00ff707e1caaa676"],["images/apple-touch-icon-72x72-precomposed.png","85ec96e3a0dcbda83c90d1ddf8214444"],["images/apple-touch-icon-precomposed.png","e6ad70e9563387ef06daa75bd270f9fe"],["images/avatar.jpg","6bdeb0e0a8a4db40349aa8170bdbe454"],["images/cover.jpg","ccbd4952cfc0ffe4dcea1d8d15efda90"],["images/hpstr-jekyll-theme-preview.jpg","9b348d61cbcbe12a591bdcd41794e4e1"],["images/icon-114x114.jpg","afbb93cf845c81299ee12bf8450f715e"],["images/icon-144x144.jpg","dc2db91e864adc668cc5cbbe8538a11e"],["images/icon-192x192.jpg","6dcae887e3127fef15782b0b72633370"],["images/icon-57x57.jpg","c91c14a7fa117864ab7e8f6a7a494413"],["images/icon-72x72.jpg","f4bb94805252d946f8542c6af8cb3606"],["images/ps_neutral.png","4564e7e43d8fa7a90cd9f46224bf7725"],["images/triangular.png","1903350ef40b9b37a4597c3f4f41e5f7"],["images/twitter-card-summary-large-image.jpg","9df64874278de9a4bd9672d6eafeca03"],["images/witewall_3.png","5b9a849f8cc87060a2699b7704c7ba7a"]];
var CacheNamePrefix = 'sw-precache-v1-hpstr-theme-' + (self.registration ? self.registration.scope : '') + '-';


var IgnoreUrlParametersMatching = [/^utm_/];



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

