## Avatao Tutorials ##

### Requirements ###

To use it you'll need:
 * Docker 
 * Our [challenge-toolbox](https://github.com/avatao-content/challenge-toolbox)

### Quickstart ###

```
git clone https://github.com/avatao-content/challenge-toolbox
git clone https://github.com/avatao-content/tutorial-node
python3 challenge-toolbox/build.py tutorial-node
python3 challenge-toolbox/start.py tutorial-node
```

On the first run it will download the required Docker baseimages, but later it will take only few seconds (depending on your computer and Dockerfile complexity) to build and start your tutorial.

Then you can access it on `https://localhost:8888`.

### How does it work? ###

This is just an additional abstraction layer, which (hopefully) makes it easier to create tutorials, but it's still using our same old [Tutorial Framework](https://github.com/avatao-content/baseimage-tutorial-framework/wiki) in the background.

However, we have separated the framework and your code as much as possible. The still need some access to eachother, so this is how we solved it...

##### Filesystem #####

Docker volumes of the `solvable` container is shared with every other container in the exercise, which means **the Tutorial Framework (especially its WebIDE component) can only access the filesystem of your `VOLUME`s.** Make sure you put everyy directory in a `VOLUME` which you want to access from the WebIDE. Especially, because we run our containers with read-only filesystems by default (except modules), so you can't write to files outside `VOLUME`s anyway.

The most important directory of your solvable container is the `tutorial`, because it contains the configuration files for the Tutorial Framework. It will be copied to `/home/user/tutorial` (with ONBUILD triggers).

Please keep the whole `VOLUME ["/home/user"]` line in your Dockerfile. We could have made it an ONBUILD VOLUME, but it's a good reminder in the Dockerfile to use VOLUMES wherever it's necessary.

##### Frontend config and APP FSM #####

The Tutorial Framework needs a frontend config, an `app_fsm.py` (states and messages) and some initial values for the components (WebIDE, Terminal). Now everything is compressed in a single [app.yml](https://github.com/avatao-content/tutorial-node/blob/master/solvable/tutorial/app.yml) file and a [script in the baseimage](https://github.com/avatao-content/baseimage-tutorial/blob/master/tutorial/create_app_from_yml.py) generates the legacy files (`app_fsm.py` and `frontend_config.yaml`) for the framework in the same directory (`/home/user/tutorial/*`).

In the first part of the [app.yml](https://github.com/avatao-content/tutorial-node/blob/master/solvable/tutorial/app.yml) you have to deal with the frontend config and initial values of built-in eventhandlers:
```yml
dashboard:
  # The tutorial will step into the first state when it's opened
  # But it can be disabled here if necessary
  stepToFirstStateAutomatically: true
  messageSpeed: 400 # Word per minute
  layout: web-only
  enabledLayouts:
    - terminal-ide-web
    - terminal-ide-vertical
    - terminal-web
    - ide-web-vertical
    - terminal-ide-horizontal
    - terminal-only
    - ide-only
    - web-only
webservice:
  iframeUrl: /webservice
  showUrlBar: false
  reloadIframeOnDeploy: false
terminal:
  directory: /home/user
  terminalMenuItem: terminal # terminal / console
ide:
  patterns: 
   - /home/user/tutorial/app.*
  showDeployButton: true
  deployButtonText:
    TODEPLOY:  Deploy
    DEPLOYED:  Deployed
    DEPLOYING: Reloading app...
    FAILED:    Deployment failed
```

And in the second part you have to specify the states with their messages. Optionally, you can change the above config keys as well when entering a new state:
```yml
#### States and messages ####
states:
 -
  ide.showDeployButton: true
  messages:
    - "Welcome to the next gen TFW demo. Do you like it so far?"
  buttons:
    - 'yes' # Make sure you put 'yes' and 'no' between quotes or double quotes, otherwise YAML thinks it's boolean
    - 'no'

 -
  dashboard.layout: terminal-ide-horizontal
  terminal.write: "echo 'hello'"
  messages:
   - "You can send multiline message easily even from a config file.

   See?"


##### CHEAT SHEET OF ADDITIONAL COMMANDS #####
# buttons: ['yes', 'no', 'solution', 'hint', 'fix']   - Add buttons to your messages
# ide.selectFile: /path/filename                      - Selects the file in webIDE (make sure it's in the pattern!)
# webservice.reloadIframe: True                       - Reloads the iframe immediately
# terminal.write: echo 'hello'                        - Writes command to terminal
# console.write: Welcome user                         - Writes text to console
```

##### Terminal #####

In the earlier versions the terminal component was simply a `sudo -u user bash`, but since the TFW runs in a different container it's changed - so now there's an SSH connection between the containers on port `2223`.

##### Event handling #####

The basic TFW is really flexible and it allows us to create arbitrary event handler classes by subscribing to any combination of ZMQ message keys, however you have to be familiar with the inner workings of the Framework to use these features effectively. Also, you probably won't have complex use-cases, so we have designed an [SDK](https://github.com/avatao-content/sdk-tfw-node) which helps you with the event handlers. See [eventHandlers.js](https://github.com/avatao-content/tutorial-node/blob/master/solvable/tutorial/eventHandlers.js) for an example.

You can install the SDK to your local environment as well so IntelliSense can help you with the function names when developing exercises:
```
npm i @avatao/tfwsdk
```

The `eventHandlers.js` is started with supervisor in the container and listens to TFW messages.

##### Events in applications #####

If you want to send messages and step into next states from applications (like webservice), you can use the SDK there as well - import it and call the functions.

**What if currently there's no SDK for the language you're using?**

We advise to use an existing SDK (see the Python version[here](https://github.com/avatao-content/tfwsdk-python)), however you can still send raw messages to the TFW through named pipes:
```javascript
fs = require("fs");
const message =
  JSON.stringify({
    key: "fsm.trigger",
    transition: "step_2",
  }) + "\n";
fs.writeFile("/tmp/tfw_send", message);
```

[Wiki](https://github.com/avatao-content/baseimage-tutorial-framework/wiki) for the list of available messages.

##### Processes #####

You can run as many processes as you want in the container - supervisor takes care all of them. Simply just copy a `your_process_name.conf` file into the `/etc/supervisor` directory (as you see in this repo for example).
