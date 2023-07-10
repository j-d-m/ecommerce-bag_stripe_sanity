import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          //NORMAL SHIPPING
          { shipping_rate: "shr_1NOQG8FIa6arWm7HsNRlpiCM" },
          //FAST SHIPPING
          { shipping_rate: "shr_1NPjA1FIa6arWm7HRzU5b27M" },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/vfxfwnaw/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "EUR",

              product_data: {
                name: item.name,
                images: [newImage],
              },
              //unit amount must be in cents hence the * 100

              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
          console.log("IMAGE", newImage);
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
