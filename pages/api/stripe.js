import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
    const cart = req.body.cartItems
 
    if (req.method === 'POST') {
      try {
        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1LVnubDVcuoLrMkCA4Yj9S4S'}
            ],
            line_items:
            cart.map((item) => {
                    const img = item.image[0].asset._ref
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/3w6uhsyt/production/')
                    .replace('-png', '.png')
                    .replace('-jpg', '.jpg')
                    .replace('-jpeg', '.jpg')
                    .replace('-jfif', '.jfif')
                    .replace('-pjpeg', '.pjpeg')
                    .replace('-pjp', '.pjp')
                    .replace('-webp', '.webp')

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage]
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled:true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
            automatic_tax: {enabled: false},
        }
        const session = await stripe.checkout.sessions.create(params);
        res.json({url: session.url})
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }