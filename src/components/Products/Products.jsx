import { Grid } from '@material-ui/core'
import React from 'react'
import Product from './Product/Product';

const Products = ({ products, addToCart }) => {



    return (
        <div>
            <main>
                <Grid container justify='center' spacing={4}>
                    {
                        products.map((pr) => (
                            <Grid item key={pr.id} xs={12} sm={6} md={4}>
                                <Product product={pr} addToCart={addToCart} />
                            </Grid>
                        ))
                    }

                </Grid>
            </main>
        </div>
    )
}



export default Products





