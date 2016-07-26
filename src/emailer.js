/*
 * Make the request to the EmailClient
 * return a promise.  If client returns an error
 * return it in the reject function.
 */
function makeRequest(options, params) {
  const emailClient = options.client;
  return new Promise((resolve, reject) => {
    emailClient.sendEmail(params, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
}

/**
 * Maps our params interface to the SeS params object.
 */
function mapToSeS(params) {
  return {
    Destination: {
      ToAddresses: [params.to],
    },
    Message: {
      Body: {
        Text: {
          Data: params.message,
        },
      },
      Subject: {
        Data: params.subject,
      },
    },
    ReplyToAddresses: [params.replyTo],
    Source: params.from,
  };
}

/**
 * Wraps making the request in an async function
 * will throw if an error occurs.
 */
async function send(options, params) {
  const sesParams = mapToSeS(params);
  try {
    return await makeRequest(options, sesParams);
  } catch (e) {
    // Log error
    console.error(e);
  }
}

/**
 * Defined emailer interface.
 * options should include an emailclient.
 */
const emailer = (options) => {
  return {
    send: (params) => {
      return send(options, params);
    }
  };
};

export default emailer;
