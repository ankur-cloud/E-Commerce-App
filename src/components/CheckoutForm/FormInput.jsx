import React from 'react'
import { InputLabel, TextField, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form';


const FormInput = ({ name, label }) => {

    const { control } = useFormContext();

    return (<>
        <Grid item xs={12} sm={6}>

            {/* Special compomntent belonging ot react hook form which is a self closing and allows us to use any other input or twxxt fields as this Controller */}


            <Controller render={({ dog }) => (<TextField {...dog} name={name} label={label} fullWidth required />)} control={control} defaultValue='' />

        </Grid>
    </>)
}

export default FormInput
