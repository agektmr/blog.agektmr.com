document.querySelector('#drawer_toggle').addEventListener('click', function() {
  var cdp = document.querySelector('core-drawer-panel');
  if (cdp.clientWidth > parseInt(cdp.responsiveWidth, 10)) {
    cdp.narrow = !cdp.narrow;
  } else {
    cdp.narrow = true;
    cdp.togglePanel();
  }
});
