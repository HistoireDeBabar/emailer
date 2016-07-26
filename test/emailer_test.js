import { expect } from 'chai';
import emailer from '../src/emailer.js';

describe('Emailer', () => {
  describe('Send', () => {
    it('Sends to mock client with the given params', (done) => {
      let receivedParams;
      const mockClient = {
        sendEmail: (params, callback) => {
          setTimeout(() => {
            receivedParams = params;
            callback();
          }, 0);
        }
      };
      const options = {
        client: mockClient,
      };
      const emailClient = emailer(options);
      const params = {
        to: 'test@test.com',
        from: 'user@sender.com',
        replyTo: 'user@user.com',
        message: 'hello, world!',
        subject: 'new world',
      };
      const expectedParams = {
        Destination: {
          ToAddresses: ['test@test.com'],
        },
        Message: {
          Body: {
            Text: {
              Data: 'hello, world!',
            },
          },
          Subject: {
            Data: 'new world',
          },
        },
        ReplyToAddresses: ['user@user.com'],
        Source: 'user@sender.com',
      };
      emailClient.send(params).then(() => {
        expect(receivedParams).to.not.eql(undefined);
        expect(receivedParams).to.eql(expectedParams);
        done();
      });
    });

    it('Handles error internally', (done) => {
      let called = false;
      const mockClient = {
        sendEmail: (params, callback) => {
          setTimeout(() => {
            called = true;
            callback(new Error('Invalid Client'));
          }, 0);
        }
      };
      const options = {
        client: mockClient,
      };
      const emailClient = emailer(options);
      const params = {
        to: 'test@test.com',
        replyTo: 'user@user.com',
        from: 'user@user.com',
        message: 'hello, world!',
        subject: 'new world',
      };
      emailClient.send(params).then(() => {
        expect(called).to.eql(true);
        done();
      });
    });
  });
});
