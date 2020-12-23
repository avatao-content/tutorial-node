// The SDK object
const { sdk } = require("@avatao/tfwsdk");
// The base class for more complex event handler creation
const { EventHandlerBase } = require("@avatao/tfwsdk");

function onDeployStart(currentState, completeMessage) {
  sdk.sendChatMessage(`Deploy clicked in state ${currentState}`);
  sdk.restartProcess("webservice");
  // Do some tests, etc...
  sdk.finishDeploy(); // Call with an error message to signal a failed deploy
}

function onMessageButtonClick(currentState, btnValue, completeMessage) {
  sdk.sendChatMessage(`Clicked: ${btnValue} in state ${currentState}`);
  btnValue === "yes"
    ? sdk.stepFsm(2) // Step if possible
    : sdk.stepFsm(1, {force: true}); // Force the backwards step
}

function onIdeWrite(currentState, fileName, content, completeMessage) {
  sdk.queueChatMessages([
    `File ${fileName} was written in state ${currentState}`,
    `Content:<br>${content}`,
  ]);
}

function onTerminalCommand(currentState, command, completeMessage) {
  sdk.sendChatMessage(
    `Command \`${command}\` executed in state ${currentState}`
  );
}

// Set callbacks for the desired event key
const callbacks = {
  "deploy.start": onDeployStart,
  "message.button.click": onMessageButtonClick,
  "ide.write": onIdeWrite,
  "history.bash": onTerminalCommand,
};
sdk.start(callbacks); // Start sdk event handling

class FsmUpdateHandler extends EventHandlerBase {
  constructor() {
    super(["fsm.update"]); // Call super with the list of the keys
  }

  handleMessage(message) {
    // Implement the abstract message handler function
    if (message.key == "fsm.update" && "current_state" in message) {
      sdk.sendChatMessage(`The FSM stepped to state ${message.current_state}`);
    }
  }
}
sdk.subscribeEventHandler(new FsmUpdateHandler()); // Subscribe the eventhandler
