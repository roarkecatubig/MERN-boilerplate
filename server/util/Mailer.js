const sendgrid = require('sendgrid');
// Pull property from sendgrid
const helper = sendgrid.mail;
// Pull in keys
const keys = require('../config/keys');

// Mail is an object with configuration which returns a mailer
class Mailer extends helper.Mail {
    // Expect first argument as an object with subject & recipients
    // Second argument is body of the email from template
    constructor({ subject, recipients }, content) {
        super();
        // sendgrid specific setup

        // Set API key
        this.sgApi = sendgrid(keys.sendGridKey);
        // Who is email being sent from
        this.from_email = new helper.Email('no-reply@mernboilerplate.com');
        // subject line of email
        this.subject = subject;
        // Content of email, initial formatting
        this.body = new helper.Content('text/html', content);
        // List of recipients, initial formatting
        this.recipients = this.formatAddress(recipients);

        // register body with mailer
        this.addContent(this.body);
        // enable click tracking
        this.addClickTracking();
        // Add recipients to mailer
        this.addRecipients();
    }

    formatAddress(recipients) {
        // iterate through each recipient and return array of emails
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        // iterate over list of recipients
        this.recipients.forEach(recipient => {
            // add each email to personalize object
            personalize.addTo(recipient);
        });
        // add entire personalize object to addPersonalization method from Mail
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;