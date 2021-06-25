import React from 'react'
import { Container, Typography, Button, Grid, Divider } from '@material-ui/core'
// import classes from '*.module.css'
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateCartQtyHandler, removeCartQtyHandler, emptyCartHandler }) => {
    const classes = useStyles()
    // { } { } { } { } { } { } { }()()()()

    const Emptycart = () => (

        <Typography variant='subtitle1'> You Have got no items in your cart  ,<Link to='/'>Start Adding! Hurry</Link> </Typography>

    )
    const FilledCart = () => (
        <>
            {/* cart props from app.js  .fetchCart   */}


            <Grid container spacing={3}>

                {cart.line_items.map((it) => (
                    <Grid item xs={12} sm={4} key={it.id}>

                        {/* <div>{it.name}</div> */}
                        <CartItem item={it} updateCartQty={updateCartQtyHandler} removeCartQty={removeCartQtyHandler} />
                    </Grid>

                ))}
                <div className={classes.cardDetails}>
                    <Typography variant='h6'>
                        Subtotal:{cart.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={emptyCartHandler}>
                            Empty cart
                        </Button>
                        <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>
                            Checkout
                        </Button>
                    </div>
                </div>

            </Grid>
        </>

    )

    if (!cart.line_items) return 'Loading'

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your cart</Typography>
            {!cart.line_items.length ? <Emptycart /> : <FilledCart />}

        </Container>
    )
}

export default Cart;
