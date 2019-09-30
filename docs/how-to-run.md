1. Install the node-red

   ```bash
   npm install -g node-red
   ```

2. Install the node-red-contrib-motechat

   ![](https://raw.githubusercontent.com/motebus/node-red-contrib-motechat/master/assets/running-on-windows.png)

   ``` bash
   # change directory to ~/.node-red
   npm install --save node-red-contrib-motechat
   ```
   
   [Running on Linux or Raspberry Pi](https://gitbook.ypcloud.com/sphere-s-user-s-guide/sphere-setup/untitled)

3. Run the MoteBus program

   Download here
   https://github.com/motebus/motebus/releases/tag/v2.1.4

   ```bash
   ./mbStack_W64.exe

   ```

4. Finally, run node-red

   ```bash
   node-red
   ```

   p.s. the log of the correct state

   ```bash
   7 Jan 11:10:21 - [info] 

   Welcome to Node-RED
   ===================

   7 Jan 11:10:21 - [info] Node-RED version: v0.19.5
   7 Jan 11:10:21 - [info] Node.js  version: v9.10.1
   7 Jan 11:10:21 - [info] Linux 4.4.49-16-default x64 LE
   7 Jan 11:10:22 - [info] Loading palette nodes
   7 Jan 11:10:22 - [warn] rpi-gpio : Raspberry Pi specific node set inactive
   7 Jan 11:10:22 - [warn] rpi-gpio : Cannot find Pi RPi.GPIO python library
   node-telegram-bot-api deprecated Automatic enabling of cancellation of promises is deprecated.
   In the future, you will have to enable it yourself.
   See https://github.com/yagop/node-telegram-bot-api/issues/319. module.js:649:30
   7 Jan 11:10:23 - [info] Settings file  : /home/slime3251/.node-red/settings.js
   7 Jan 11:10:23 - [info] Context store  : 'default' [module=memory]
   7 Jan 11:10:23 - [info] User directory : /home/slime3251/.node-red
   7 Jan 11:10:23 - [warn] Projects disabled : set editorTheme.projects.enabled=true to enable
   7 Jan 11:10:23 - [info] Flows file     : /home/slime3251/.node-red/flows_slime.json
   7 Jan 11:10:23 - [info] Server now running at http://127.0.0.1:1880/
   7 Jan 11:10:23 - [warn] 

   ---------------------------------------------------------------------
   Your flow credentials file is encrypted using a system-generated key.

   If the system-generated key is lost for any reason, your credentials
   file will not be recoverable, you will have to delete it and re-enter
   your credentials.

   You should set your own key using the 'credentialSecret' option in
   your settings file. Node-RED will then re-encrypt your credentials
   file using your chosen key the next time you deploy a change.
   ---------------------------------------------------------------------

   7 Jan 11:10:23 - [info] Starting flows
   7 Jan 11:10:23 - [info] Started flows
   { DDN: 'sPE1U6Oi',
     mote: 
      { EiOwner: '',
        EiName: 'node-red',
        EiType: '.bot',
        EiTag: '#bot',
        EiLoc: '' },
     dSIM: { SToken: 'z4IVuAtE', EiToken: 'ps3rvBUp' },
     config: 
      { AppName: 'node-red',
        AppKey: '1u6WauSf',
        DCenter: 'dc@dc.ypcloud.com:6788',
        UCenter: 'uc@uc.ypcloud.com:6788',
        IOC: '',
        MotebusGW: '127.0.0.1',
        UseWeb: '',
        WebPort: '',
        WebEntry: '' } }
   DC env:  undefined
   motechat: open arguments= 2 {"AppName":"node-red","AppKey":"1u6WauSf","DCenter":"dc@dc.ypcloud.com:6788","UCenter":"uc@uc.ypcloud.com:6788","IOC":"","MotebusGW":"127.0.0.1","UseWeb":"","WebPort":"","WebEntry":""}
   in:init appname=node-red iocmma= mbusgw=127.0.0.1
   --2019-1-7 11:10:23.208: MoteBus Ready
   motechat:InStateHandler state=ready
   --2019-1-7 11:10:23.212: openxmsg=WZ15VF
   --2019-1-7 11:10:23.213: xrpc started
   in:xRPC start: result=0
   motechat:InStateHandler state=opened
   SetupMyInfo:mbusInfo reply={"ErrCode":0,"ErrMsg":"OK","result":{"udid":"JzPtz2nb","hostName":"slime","wanIP":"","localIP":"192.168.1.30","mmpHost":"192.168.1.30","mmpPort":6780}}
   motechat:in Open result={"ErrCode":0,"ErrMsg":"OK","Mote":{"EiHost":"192.168.1.30","EiPort":6780,"EiMMA":"node-red@192.168.1.30","EiUDID":"JzPtz2nb","WANIP":""}}
   --2019-1-7 11:10:25.718: CallXrpc mma=dc@dc.ypcloud.com:6788 func=resetreg arr=[{"EiUMMA":"node-red@192.168.1.30"}]
   --2019-1-7 11:10:26.585: CallXrpc result={"ErrCode":0,"ErrMsg":"OK","ResetCount":0,"DC":"dc@202.153.173.250","WIP":"202.153.173.250"}
   motechat:DcReset reply={"ErrCode":0,"ErrMsg":"OK","ResetCount":0,"DC":"dc@202.153.173.250","WIP":"202.153.173.250"}
   in:GetmbWIP mbusinfo reply={"ErrCode":0,"ErrMsg":"OK","result":{"udid":"JzPtz2nb","hostName":"slime","wanIP":"10.217.30.1","localIP":"192.168.1.30","mmpHost":"192.168.1.30","mmpPort":6780}}
   motechat:Open WIP=10.217.30.1
   --2019-1-7 11:10:26.587: CallXrpc mma=dc@dc.ypcloud.com:6788 func=reg arr=[{"AppKey":"1u6WauSf","EiToken":"ps3rvBUp","SToken":"z4IVuAtE","EiUMMA":"node-red@192.168.1.30","EiUPort":6780,"WIP":"10.217.30.1","LIP":""}]
   --2019-1-7 11:10:27.884: CallXrpc result={"ErrCode":0,"ErrMsg":"OK","result":{"AppKey":"1u6WauSf","EiToken":"ps3rvBUp","SToken":"z4IVuAtE","EiUMMA":"node-red@192.168.1.30","EiUPort":6780,"EiUDID":"JzPtz2nb","EiMMA":"LtrCg@192.168.1.30:6780;node=1;udid=JzPtz2nb","WIP":"10.217.30.1","LIP":"","DDN":"sPE1U6Oi","AppId":"mscreen.ypcloud","State":"reg","EiOwner":"","EiName":"node-red","EiType":".bot","EiTag":"#bot","EiLoc":"","UToken":"","Uid":"","UserName":"","MobileNo":"","NickName":"","Sex":"","EmailVerified":false,"MobileVerified":false,"TimeStamp":"2019-01-07T03:10:27.542Z"}}
   in:iocEvent evdata={"MsgType":"info","MsgClass":"in","MsgBody":{"Device":"node-red","action":"reg","result":"OK"}}
   --2019-1-7 11:10:27.901: CallXrpc mma=dc@dc.ypcloud.com:6788 func=setinfo arr=[{"SToken":"z4IVuAtE","EdgeInfo":{"DDN":"sPE1U6Oi","EiOwner":"","EiName":"node-red","EiType":".bot","EiTag":"#bot","EiLoc":""}}]
   --2019-1-7 11:10:29.159: CallXrpc result={"ErrCode":0,"ErrMsg":"OK"}
   EiInfo setting:  { ErrCode: 0, ErrMsg: 'OK' }

   ```

   ​

   ​
