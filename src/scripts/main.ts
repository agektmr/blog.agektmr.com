import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';

const drawer = document.querySelector('#drawer');
const sidebarButton = document.querySelector('#sidebar-button');
sidebarButton.addEventListener('click', e => {
  // @ts-ignore
  drawer.open = !drawer.open;
});