# Node Streams

Stream `stdin` to the browser, and stream keypresses from the browser to `stdout`!

### Run it

  * `node app.js` and go to localhost:2000
  * If you want to make changes to the browser code, edit browser-src.js and rebuild client.js with browserify - `browserify browser-src.js > client.js`

### Play

  * Enter some text into stdin and press enter. See it streamed to the browser!
  * Select your browser document and start typing. See it streamed to stdout!