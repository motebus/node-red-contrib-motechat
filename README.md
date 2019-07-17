##  node-red-contrib-motechat

### Install

1. Ensure Node (v12.5 or above)
2. Ensure NPM (v6.0 or above)
3. Navigate to Node-Red folder first
```bash
cd ~/.node-red 
```
4. Then install node-red-contrib-motechat
```bash
npm install --unsafe-perm node-red-contrib-motechat
```
 - cannot install outside node-red folder

5. Download Sphere (must download to use motechat)
 - Use Snapd (only Linux)
```bash
sudo snap install sphere
```
 - [Other Environment](https://gitbook.ypcloud.com/sphere-s-user-s-guide/sphere-setup/untitled)

6. [Additional Info](docs/how-to-run.md)

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

#### Send 
>>**Overall Flow for Send Node** <br />
>>Grab { Inject Node } from Input <br />
>>Grab { Send Node } from Motechat <br />
>><img src="/node-red-examples/sendflow.png" width="300"> <br />
>>**Send Node Info** <br />
>>DDN section can input other device's DDN or its EI_NAME <br />
>><img src="/node-red-examples/sendnodes.info.png" width="300"> <br />
>>**Inject Node Ino** <br />
>><img src="/node-red-examples/InjectSendNode.png" width="300"> <br />
>>**Result** <br />
>>From Other Device's Terminal <br />
>><img src="/node-red-examples/result.jpg" width="300"> <br />

#### On Event. Debug
>>**Debug Flow. Using OnEvent**  <br /> 
>>In order to read signals from other devices  <br />
>>Grab { Debug Node } from Output  <br />
>>Grab { OnEvent Node } from motechat <br />
>><img src="/node-red-examples/DebubFlow.png" width="300"> <br />
>>**Debug Node Info** <br />
>><img src="/node-red-examples/DebugNode.png" width="300"> <br />

#### Send Email, Text
>>Grab {Inject Node} and {Send Node} <br />
DDN | Topic | Payload | Notes |
--- | --- | --- | --- |
*>>COMM* | email://your_email@test.com | {"subject":"xxxxx","content":"xxxxx" } | Send Email via comm |
*>>COMM* | sms://TaiwaneseCellPhone | {"text":"xxxxxxxxxxx"} | Send Text via Comm |

COMM is written by YPCloud Inc. It provides several utilities to inspire developers around the world to develop in motebus environment. 







