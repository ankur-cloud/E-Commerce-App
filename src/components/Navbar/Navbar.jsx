import { AppBar, Badge, IconButton, Toolbar, Typography } from "@material-ui/core"
import { ShoppingCart } from "@material-ui/icons"
import { NavLink, Link, useLocation } from "react-router-dom";
import useStyles from './styles';



const img = 'https://source.unsplash.com/600x400/?logo'


const Navbar = ({ totalItems }) => {

    const loca = useLocation();

    const classes = useStyles();

    return (
        <AppBar position='fixed' className={classes.appBar} color='secondary'>
            <Toolbar>
                <Typography component={NavLink} to='/' activeStyle={{ color: 'magneta' }} variant='h6' className={classes.title} color='inherit'>
                    <img src={img} alt='Commerce.js' height='25px' className={classes.image} />vfdf
                </Typography>
                <div className={classes.grow} />
                {
                    loca.pathname === '/' && (<div className={classes.button} >

                        <IconButton component={NavLink} to='/cart' activeStyle={{ color: 'blue' }} aria-label='SHow CArt ITems' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)

                }




            </Toolbar>

        </AppBar>
    )
}

export default Navbar
