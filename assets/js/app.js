// document.querySelector('body').addEventListener('click', function(e) {
//   console.log('click event');
//   if (e.target.tagName == 'A') {
//     var domain = RegExp('^(http|https)://'+location.host);
//     if (e.target.href && domain.test(e.target.href)) {
//       console.log(e.target.href);
//       fetch(e.target.href, function(response) {
//         if (response) {
//           document.querySelector('core-drawer-panel').innerHTML = response.querySelector('core-drawer-panel').innerHTML;
//           history.pushState(null, '', e.target.href);
//         }
//       });
//       e.preventDefault();
//       e.stopPropagation();
//     }
//   }
// });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(sw) {
    console.log('service worker registration successful', sw);
  }, function(error) {
    console.error('service worker registration failed:', error);
  });
}
