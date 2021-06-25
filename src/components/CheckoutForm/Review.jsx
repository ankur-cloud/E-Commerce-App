import React from 'react'
import { Typography, Button, Divider, ListItemText, ListItem, List } from '@material-ui/core'


const Review = ({ checkoutToken }) => {
    return (
        <>
            <Typography variant='h6' gutterBottom> Order Summary</Typography>
            <List disablePadding>
                {/* Loop thru all the products that we have in cart we have acces to all prod inside checkoutcomponent inside generated token and pass it over to  */}
                {/* loop thru items  ===prod for each map iteration
                
                Token array checkouttoken  */}

                {checkoutToken.live.line_items.map((prod) => (
                    <ListItem style={{ padding: '10px 0' }} key={prod.name}>
                        <ListItemText primary={prod.name} secondary={`Quantity:${prod.quantity}`} />
                        <Typography variant='body2'>{prod.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary='Total' />
                    <Typography variant='subtitle1' style={{ fontWeight: 700 }}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>

        </>
    )
}

export default Review



