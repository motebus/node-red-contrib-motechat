##  node-red-contrib-motechat

### Install

```bash
npm install node-red-contrib-motechat
```

The simple motechat functionality in node-red.

 <https://github.com/motebus/motechat>

This library provides six nodes to develop your uBots. It displays the send, call, urt, onEvent, retEvent, and finally the page node. The "send" is used for sending messages to telegram with the chat ID being fully customizable. The "call" is similar to the "send" but it has an input for a function, able to obtain the output that the function desires. The "onEvent" and "retEvent" is always used together and used to do something once the device has been called on. The "retEvent" then returns a signal to tell the sender that the message has been received. The "page" node provides the user a way to attach a JavaScript file in order for them to work conveniently upload a JavaScript file.

[Get Started](docs/how-to-run.md)

