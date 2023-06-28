const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//remember in nextjs each file must have its own handler
export default async function handler(req, res) {
  if (reg.method === "POST") {
    try {
      //creating a checkout session from the body params and passing it bellow
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card", "paypal"],
        currency: ["USD", "EUR", "GBP", "NZD", "AUD"],
        automatic_tax: {
          enabled: true,
        },
        billing_address_collection: "auto",
        //**todo */
        //**continue here 2:45 */
        shipping_options: [],
        line_items: [
          {
            //we must provide the price ID
            price: "{{PRICE_ID}}",
            //quantity comes from the cart
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        success_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);
      res.redirect(303, session.url);
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
