import React, { useEffect, useState } from 'react'
import useStyles from './styles'

import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core"
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from './../../../lib/Commerce';
import { Link, useHistory } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core'


const steps = ['Shipping address', 'Payment details']


const Checkout = ({ cart, captureCheckoutHandler, order, error }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setCheckoutToken(token);

            } catch (error) {
                history.push('/')

            }
        }
        generateToken();

    }, [cart]);


    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }


    // Collecting data from addessDorm formsubmi methods.handlesubmit pass next funtion as a prop to address Form and increasing step setactiveastep      .......setting data to shipping data so that we have access to state we use to pass it to  paymnent form next stage


    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase {order.customer.firstname}, {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle1'>{order.customer_reference}</Typography>


            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : isFinished ? (

        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase </Typography>
                <Divider className={classes.divider} />


            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>

    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );
    if (error) {
        <>
            <Typography variant='h5'>Errot:{error}</Typography>
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>

        </>
    }


    // Tries to render the address form while we still don; t have the token and it depends on it
    // Render metgod first render everything JSX and then go tioo component  didmount in this case useeffect. At tghis pont we still didnt pull the checkout token so we dont have it but our addrtess form depends on ioootuiit  it.So I added one more check at the  form rencder


    const Form = () => [
        activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} captureCheckoutHandler={captureCheckoutHandler} nextStep={nextStep} timeout={timeout} />
    ]
    // we have acces to all prod inside checkoutcomponent inside generated token and pass it over to
    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' >Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>

                            )
                            )
                        }
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>

        </>
    )
}

export default Checkout
