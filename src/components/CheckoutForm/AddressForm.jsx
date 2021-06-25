import React, { useEffect, useState } from 'react'
import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';
import { commerce } from '../../lib/Commerce';
import { Link } from 'react-router-dom';


const AddressForm = ({ checkoutToken, next }) => {
    const methods = useForm();


    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    // obj.entries To convert an object to an array ...we are returning array with objects so that we can once again use map functiobn

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))

    const shipOp = shippingOptions.map((so) => ({ id: so.id, label: `${so.description} - (${so.price.formatted_with_symbol})` }))


    // console.log(countries)

    // returns array again use map i countries in Select

    const fetchShippingCountries = async (checkoutTokenId) => {

        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

        setShippingCountries(countries);
        setShippingCountry(Object.keys[countries[0]]);
        // console.log(countries)
        // Returns an object but we neeed an array

        // We have object of countris but we need arrays.... Object.keys() method returns an array of a given object's own enumerable property names, iterated in the same order that a normal loop would.
    }

    const fetchSubDivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys[countries[0]])

    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const shipOptions = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
        console.log(shipOptions)
        setShippingOptions(shipOptions);
        setShippingOption(shipOptions[0].id)

    }

    // 3 USE EFFECTS   COUNTRY>SUBDIVISION>SHIPPINGOPTIONS  

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])


    useEffect(() => {
        shippingCountry && fetchSubDivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        shippingSubdivision && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])



    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>

                    {/* object is not iterqable */}

                    {/* Going to accept one specific callbcak fn bring this data back to checkoutasd going to give next a new object which will contain al propertea frp, current form prevvalo
                    we are pulling htic function p[assing necesar data function declaration is in next function  in checkout]
                     */}


                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First Name' />
                        <FormInput name='lastName' label='Last Name' />
                        <FormInput name='address1' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <FormInput name='zip' label='Pincode' />

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {/* 
                                Can't do array.map in countries as it isnt array so we do Object  entries
    Object.entries gets us keys and vakues makes ut array  

 We get a key value pair but we are destructuring 
                                
 we want to return it in a new format as an object  ;

     {
     Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })
                                    )} */}

                                {
                                    countries.map((cour) => (
                                        <MenuItem key={cour.id} value={cour.id} >
                                            {cour.label}
                                        </MenuItem>
                                    ))
                                }


                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {
                                    subdivisions.map((subd) => (
                                        <MenuItem key={subd.id} value={subd.id} >
                                            {subd.label}
                                        </MenuItem>
                                    ))
                                }

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {shipOp.map((shipOp) => (
                                    <MenuItem key={shipOp.id} value={shipOp.id} >
                                        {shipOp.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>



                    </Grid>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'>Back To Cart</Button>
                        <Button type='submit' variant='contained'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
