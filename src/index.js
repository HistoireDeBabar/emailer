import AWS from 'aws-sdk';
import { emailSettings } from './config.js';
import emailer from './emailer';
import handler from './handler';

/**
 * Instantiates the correct functions, objects
 * and exposes the handler.
 */

const client = new AWS.SES({ region: 'eu-west-1' });
const emailOptions = {
  client,
};
const email = emailer(emailOptions);
const handlerOptions = {
  emailClient: email,
  emailSettings,
};

const handle = handler(handlerOptions);
export default handle;

