import path from 'path';

const clientBundlePath = './client.bundle.js';
const template = (content, initialState = {}) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title> FOOBAR </title>
    </head>
    <body>
      <div id="app">
        ${content}
      </div>
      <script type="text/javascript" src="${clientBundlePath}"></script>
      <script>
        window.__STATE__ = ${JSON.stringify(initialState)}
      </script>
    </body>
    </html>
  `;
};

export default template;
