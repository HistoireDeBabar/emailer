/**
 * Create Response generates a response in form of a
 * stringified JSON object based on a message and error
 * properties.
 */
const createResponse = (message, error = false) => {
  const response = {
    message,
    error
  };
  return JSON.stringify(response);
};

/**
 * Handle function which the AWS Lambda will call with the request event.
 */
async function handle(options, event, context) {
  if (!event.from) {
    return context.fail(createResponse('Invalid Request: \'from\' must be specified', true), null);
  }
  if (!event.message) {
    return context.fail(createResponse('Invalid Request: \'message\' must be specified', true), null);
  }
  try {
    const params = {
      replyTo: event.from,
      message: event.message,
      to: options.emailSettings.to,
      from: options.emailSettings.from,
      subject: options.emailSettings.subject,
    };
    await options.emailClient.send(params);

    return context.succeed(null, createResponse('Success'));
  } catch (e) {
    console.error(e);
    context.fail(createResponse('Internal Server Error', true), null);
  }
}

/**
 * Handler Interface.
 */
const handler = (options = {}) => {
  return {
    handle: (event, context) => {
      return handle(options, event, context);
    }
  };
};
export default handler;
