/**
 * Lightweight inline SVG replacements for the Font Awesome icons used across the blog,
 * eliminating external Font Awesome Kit JS, CSS, and WOFF2 font requests.
 */

const ICONS = {
  // UI icons (24x24 viewBox, stroke/fill clean geometry)
  "bars": {
    viewBox: "0 0 24 24",
    body: '<path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>'
  },
  "calendar-alt": {
    viewBox: "0 0 24 24",
    body: '<path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm12 8H5v10h14V10zm0-4H5v2h14V6z"/>'
  },
  "seedling": {
    viewBox: "0 0 24 24",
    body: '<path d="M12 22v-9m0 0c-4.5 0-8-3.5-8-8h3c3.5 0 5 2 5 5m0 3c0-3 1.5-5 5-5h3c0 4.5-3.5 8-8 8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  "arrow-right": {
    viewBox: "0 0 24 24",
    body: '<path d="M5 12h14m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  "arrow-left": {
    viewBox: "0 0 24 24",
    body: '<path d="M19 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  "redo": {
    viewBox: "0 0 24 24",
    body: '<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  "globe": {
    viewBox: "0 0 24 24",
    body: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" fill="none" stroke="currentColor" stroke-width="2"/>'
  },
  "envelope-o": {
    viewBox: "0 0 24 24",
    body: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m3 7 9 6 9-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  "book": {
    viewBox: "0 0 24 24",
    body: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zm0 0A2.5 2.5 0 0 0 6.5 22H20v-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  "video": {
    viewBox: "0 0 24 24",
    body: '<rect x="2" y="6" width="14" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="m16 10 6-3v10l-6-3v-4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'
  },
  "microphone-alt": {
    viewBox: "0 0 24 24",
    body: '<rect x="9" y="2" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5m-4 0h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'
  },

  // Brand icons (24x24 viewBox)
  "github": {
    viewBox: "0 0 24 24",
    body: '<path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.53 2.87 8.37 6.84 9.73.5.09.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"/>'
  },
  "x-twitter": {
    viewBox: "0 0 24 24",
    body: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>'
  },
  "bluesky": {
    viewBox: "0 0 24 24",
    body: '<path d="M5.2 3.8C7.9 5.9 10.8 10 12 12.6c1.2-2.6 4.1-6.7 6.8-8.8C20.7 2.3 23 1.2 23 4.3c0 .6-.3 5.2-.5 6-.7 2.5-3.2 3.1-5.4 2.7 3.9.7 4.9 2.9 2.7 5.1-4.1 4.2-5.9-1.1-6.3-2.4-.1-.3-.1-.4-.1-.3 0-.1 0 0-.1.3-.4 1.3-2.2 6.6-6.3 2.4-2.2-2.2-1.2-4.4 2.7-5.1-2.2.4-4.7-.2-5.4-2.7-.2-.8-.5-5.4-.5-6 0-3.1 2.3-2 4.4-.5z"/>'
  },
  "mastodon": {
    viewBox: "0 0 24 24",
    body: '<path d="M21.3 14.1c-.3 1.6-2.7 3.3-5.4 3.6-1.4.2-2.8.3-4.3.2-2.4-.1-4.3-.6-4.3-.6 0 .2 0 .5.1.7.3 2.4 2.3 2.5 4.2 2.6 1.9.1 3.6-.5 3.6-.5l.1 1.7s-1.3.7-3.7.9c-1.3.1-2.9 0-4.8-.5-4.1-1.1-4.8-5.5-4.9-9.9V9.6C2 5.3 4.8 4 4.8 4 6.2 3.3 8.7 3 11.2 3h.1c2.5 0 5 .3 6.4 1 0 0 2.8 1.3 2.8 5.6 0 0 .1 3.2-.2 4.5zM17.9 9.7c0-1.1-.3-2-.8-2.6-.6-.6-1.4-.9-2.3-.9-1.1 0-1.9.4-2.5 1.3l-.5.9-.5-.9C10.7 6.6 9.9 6.2 8.8 6.2c-.9 0-1.7.3-2.3.9-.5.6-.8 1.5-.8 2.6v5.3h2.1V9.9c0-1.1.5-1.7 1.4-1.7 1 0 1.5.7 1.5 2v2.9h2.1v-2.9c0-1.3.5-2 1.5-2 .9 0 1.4.6 1.4 1.7V15h2.2V9.7z"/>'
  },
  "linkedin": {
    viewBox: "0 0 24 24",
    body: '<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>'
  },
  "chrome": {
    viewBox: "0 0 24 24",
    body: '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 8.5h8.4M9 13.7 4.8 6.4M15 13.7l-4.2 7.3" fill="none" stroke="currentColor" stroke-width="2"/>'
  },
  "youtube": {
    viewBox: "0 0 24 24",
    body: '<path d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46A2.75 2.75 0 0 0 2.42 7.2 28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.42-4.81zM10 15V9l5.2 3L10 15z"/>'
  }
};

/**
 * Replace Font Awesome <i> tags in rendered HTML with inline <svg> icons.
 */
export function replaceFaIcons(html) {
  return html.replace(/<i\s+class="(?:fa|fas|far|fab)\s+fa-([a-z0-9-]+)"(?:\s+aria-hidden="true")?\s*><\/i>/g, (match, name) => {
    const icon = ICONS[name];
    if (!icon) return match;
    return `<svg class="fa-svg fa-${name}" viewBox="${icon.viewBox}" width="1em" height="1em" fill="currentColor" aria-hidden="true">${icon.body}</svg>`;
  });
}
