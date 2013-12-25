Dynamic MarkDown loader (dmd.js)
================================

Dynamically convert maridown contents into html and show.
You no longer have to convert markdown contents into html sources manually!

This framework depends on `marked.js`.



Usage
-----

First, load `dmd.js` and `marked.js` in your html.

`dmd.js` uses two tags: `div#dmd-content` and `ul#dmd-menu`.

Tag `div#dmd-content` is mandatory. This tag has as children some tags who
have a class `dmd-page`. When these tags are `a` tags, referenced pages are
downloaded when required. Otherwise, the contents of these tags (`innerHTML`)
are saved and converted when loaded.

`ul#dmd-menu` is optional. When this tag exists, `dmd.js` adds links to load
pages defined in `dmd-content`.

After loading `dmd-pages` in `dmd-content`, all contents under `dmd-content` are
removed.

Pages defined by `dmd-pages` can be accessed with hashes, and titles defined the
tags are used for name. For example, when a page like
`<a href="a.md" title="a page" class="dmd-page">README</a>`
is defined, this content can be accessed via a url like `index.html#a%20page`.
