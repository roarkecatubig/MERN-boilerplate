const keys = require('../../config/keys');
// pass in stripeSecretKey to stripe require
const stripe = require('stripe')(keys.stripeSecretKey);

exports.post = async (req, res, next) => {
    // All payment process info stored in req.body
    // Pass in configuration object that instructs stripe what we want to do with transaction
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 for 5 credits',
        source: req.body.id
    });

    // Add credits to user model
    req.user.credits += 5;
    // save user model
    const user = await req.user.save();

    res.send(user);
};