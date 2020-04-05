import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { MDCList } from '@material/list';
import { MDCRipple } from '@material/ripple';

// Instantiation
const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;

const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;
