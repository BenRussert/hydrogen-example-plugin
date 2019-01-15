"use babel";

export const kernelMiddlewareExample = {
  // your notebook output "store"
  // you could also use a global store and import here like in hydrogen if you wanted,
  // with a nested structure for multiple notebooks or anything else you need.
  notebookOutputs: [],
  execute(next, code, onResults) {
    next.execute(code, (message, channel) => {
      // For information on jupyter messaging and channels:
      //  https://jupyter-client.readthedocs.io/en/stable/messaging.html#general-message-format

      if (message.header && message.header.msg_type === "execute_input") {
        console.log(`Your input count is: ${message.content.execution_count}`);
      }
      if (message.header.msg_type === "execute_result") {
        console.log(
          `Do some debugging with the execute result message!: `,
          message
        );
        this.notebookOutputs.push("execute result message!: ", message);
      }

      // The `stream` message type is where outputs from `print('something')` will go
      if (message.header && message.header.msg_type === "stream") {
        console.log("stream output message!: ", message);
        this.notebookOutputs.push(message);
      }
      // Continue the callback chain
      onResults(message, channel);
    });
  }
  // interupt, shutdown, restart, complete, and inspect can also be implemented
  // For more about kernel middleware, and helpful type definitions:
  // https://github.com/nteract/hydrogen/blob/master/lib/plugin-api/hydrogen-types.js
};
