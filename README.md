##  node-red-contrib-motechat

### Install

```bash
npm install node-red-contrib-motechat
```
[Get Started](docs/how-to-run.md)

### Simple Motechat Samples

 <https://github.com/motebus/motechat>

The above link provides 6 examples to help you develop your uBots in JavaScript. <br />
It explains and shows samples for send, call, urt, onEvent, retEvent, and Page.

Node| Description | 
--- | --- | 
*send* | sending messages to telegram with chat-id being fully customizable |
*call* | similar to send, but has an input for a function, able to obtain the output that the function desires |
*onEvent* | wait until recieve a signal and read the signal |
*retEvent* | upon onEvent, tells the sender if the device has made an action |
*page* | allows the user a way to attach/upload a JavaScript file in order for them to work conveniently |

### Examples On Node-Red

Overall Flow. Grab { Inject Node }. Grab { Send Node } From Motechat
![ Overall Flow ](/node-red-examples/sendnodes.png | width=250)

Send Node Info
![ Send Node Info](/node-red-examples/sendnodes.info.png | width=300)

Inject Node Ino
![ Inject Node Info](/node-red-examples/InjectSendNode.png | width=300)

Result From Other Device's Terminal
![ Result ](/node-red-examples/result.jpg)



