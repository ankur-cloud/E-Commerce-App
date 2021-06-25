import React from 'react'
import { Container, Typography, Button, Grid, Divider, Card, CardActions, CardMedia, CardContent } from '@material-ui/core'

import useStyles from './styles.js'

const CartItem = ({ item, removeCartQty, updateCartQty }) => {
    // item =it ..cart.ine_items.map

    const classes = useStyles()
    return (
        <Card >
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent} >
                <Typography variant='h5'>{item.name}</Typography>
                <Typography variant='h6'>{item.line_total.formatted_with_symbol}</Typography>

            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={() => updateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography variant='subtitle1' >{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={() => updateCartQty(item.id, item.quantity + 1)}>+</Button>

                </div>
                <Button type='button' variant='contained' color='secondary' onClick={() => removeCartQty(item.id)}>Remove</Button>

            </CardActions>

        </Card>

    )
}

export default CartItem;
