import { expect } from 'chai';
import handler from '../src/handler.js';

describe('Handler', () => {
  it('returns an emailHandler with a handle function', () => {
    const subject = handler();
    expect(subject.handle).to.be.a('Function');
  });
  it('returns a unrecognised error when "from" is not specified', (done) => {
    const options = {};
    const subject = handler(options);
    const event = {
      message: 'hello world',
    };
    const context = {
      fail: (err) => {
        const dError = JSON.parse(err);
        expect(dError.message).to.eql('Invalid Request: \'from\' must be specified');
        expect(dError.error).to.eql(true);
        done();
      },
    };
    subject.handle(event, context);
  });
  it('returns a unrecognised error when "message" is not specified', (done) => {
    const options = {};
    const subject = handler(options);
    const event = {
      from: 'user@user.com',
    };
    const context = {
      fail: (err) => {
        const dError = JSON.parse(err);
        expect(dError.message).to.eql('Invalid Request: \'message\' must be specified');
        expect(dError.error).to.eql(true);
        done();
      },
    };
    subject.handle(event, context);
  });
  it('calls the send email function of the email client', (done) => {
    let called = false;
    let expectedParams;
    const emailClient = {
      send: (params) => {
        expectedParams = params;
        return new Promise((resolve) => {
          called = true;
          resolve();
        });
      },
    };
    const options = {
      emailClient,
      emailSettings: {
        to: 'test@test.com',
        subject: 'new world',
        from: 'user@test.com',
      },
    };
    const subject = handler(options);
    const event = {
      message: 'hello world',
      from: 'user@sender.com',
    };
    const context = {
      succeed: (err, result) => {
        expect(err).to.eql(null);
        expect(called).to.eql(true);
        expect(expectedParams).to.eql({
          to: 'test@test.com',
          from: 'user@test.com',
          replyTo: 'user@sender.com',
          message: 'hello world',
          subject: 'new world',
        });
        const response = JSON.parse(result);
        expect(response.message).to.eql('Success');
        expect(response.error).to.eql(false);
        done();
      }
    };
    subject.handle(event, context);
  });
  it('returns an internal server error to the callback if the send email client fails', (done) => {
    let called = false;
    const emailClient = {
      send: () => {
        return new Promise((resolve, reject) => {
          called = true;
          reject(new Error('Error'));
        });
      },
    };
    const options = {
      emailClient,
      emailSettings: {},
    };
    const subject = handler(options);
    const event = {
      message: 'hello world',
      from: 'user@ueser.com',
    };
    const context = {
      fail: (err, result) => {
        const dError = JSON.parse(err);
        expect(dError.message).to.eql('Internal Server Error');
        expect(called).to.eql(true);
        expect(result).to.eql(null);
        done();
      }
    };
    subject.handle(event, context);
  });
});
