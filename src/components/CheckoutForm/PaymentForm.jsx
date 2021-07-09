import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


const PaymentForm = ({ checkoutToken, backStep, captureCheckoutHandler, nextStep, shippingData, }) => {


    const handleSubmit = async (event, elements, stripe) => {
        event.preventDefault();
        // avoid websit refres after we cloick button
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardElement);
        // create a payment method using stripe's api

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
        if (error) {
            console.log('[error]', error);
        } else {
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: {
                    name: 'Primary',
                    street: shippingData.address1,
                    city: shippingData.city,
                    county: shippingData.shippingSubdivision,
                    postal: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                paymant: {
                    gateway: 'stripe',
                    stripe: {
                        payment_method_id: paymentMethod.id
                    }
                }
            }
            captureCheckoutHandler(checkoutToken.id, orderData);
            nextStep();

            //call commerce api indide app.js captureCheckoutHandler()
        }

    }
    {/* Loop thru all the products that we have in cart we have acces to all prod inside checkoutcomponent inside generated token and pass it over to  */ }
    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>Payment Method</Typography>
            <Elements stripe={stripePromise} >
                <ElementsConsumer>
                    {/* as paramenter we are accepting froms stripe # destructured*/}
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>


                            <CardElement />
                            <br />
                            <br />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button variant='outlined' onClick={backStep} >Back</Button>
                                <Button type='submit' variant='outlined' disabled={!stripe} color='primary'>
                                    Pay {
                                        checkoutToken.live.subtotal.formatted_with_symbol
                                    }</Button>
                            </div>
                        </form>

                    )}
                </ElementsConsumer>

            </Elements >
        </>
    )
}

export default PaymentForm



