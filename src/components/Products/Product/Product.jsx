import React from 'react';

// import classes from "*.module.css"
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@material-ui/core"
import { AddShoppingCart } from "@material-ui/icons"
import useStyles from './styles';



const Product = ({ product, addToCart }) => {
    const classes = useStyles();

    // console.log(product)

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.media.source} title={product.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='subtitle1' color='textSecondary' />
            </CardContent>
            <CardActions className={classes.cardActions}>
                <IconButton aria-label='Add to Cart' onClick={() => addToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>

        </Card >
    )
}

export default Product
