document.querySelector('#drawer_toggle').addEventListener('click', function() {
  var cdp = document.querySelector('core-drawer-panel');
  if (cdp.clientWidth > parseInt(cdp.responsiveWidth, 10)) {
    cdp.narrow = !cdp.narrow;
  } else {
    cdp.narrow = true;
    cdp.togglePanel();
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(sw) {
    console.log('service worker registration successful', sw);
  }, function(error) {
    console.error('service worker registration failed:', error);
  });
}
