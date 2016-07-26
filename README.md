# emailer

Emailer is a Simple Email Handler, designed to run off AWS Lambda, API Gateway and AWS SES.
Its use case is something like a contact form (or at least that's how I'm using it).

The Endpoint (thus event) will take in a contact object.
```
{
  "from": "some@contact.com",
  "message": "I just wanted to get in touch..."
}
```

The handler then sends an email to a configured email address.  The email address and subject
are defined in a config file which is stored in S3.

On Build/Deploy the project is linted, tested.
The config is retreived from S3 and a zip file containing the source code is uploaded.

This project uses CircleCI for continuous deployment.
