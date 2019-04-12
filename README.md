# Status Chat Widget

Easily embed a status chat in your website.

### Screenshot

![widget](https://notes.status.im/uploads/upload_a087221ad1f8dc5c34654d57a2e3d071.png)

### Usage

Copy paste the following snippet to your website

```Html
  <link rel="stylesheet" href="https://status-im.github.io/status-chat-widget/themes/status.css">
  <script src="https://status-im.github.io/status-chat-widget/dist/js/statuswidget.js"></script>
  <div id="status-chat-widget"></div>
  <script>StatusWidget("your-channel-name", document.getElementById("status-chat-widget"));</script>
```

Modify `your-channel-name` to your channel of choice

And you're done!

### Theme

The chat theme can be customized by replacing the css link with your own css file:

```Html
  <link rel="stylesheet" href="https://status-im.github.io/status-chat-widget/themes/status.css">
```

