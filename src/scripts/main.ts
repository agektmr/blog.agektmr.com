import '@material/mwc-drawer';
import '@material/mwc-top-app-bar-fixed';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { Drawer } from '@material/mwc-drawer';
import { IconButton } from '@material/mwc-icon-button';

const drawer: Drawer = document.querySelector('#drawer');
const sidebarButton: IconButton = document.querySelector('#sidebar-button');
sidebarButton.addEventListener('click', e => {
  drawer.open = !drawer.open;
});
