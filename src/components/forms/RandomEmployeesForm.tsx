import React, { useRef, useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText, Snackbar, Alert } from '@mui/material';
import Employee from "../../model/Employee";
import employeeConfig from "../../config/employee-config.json"
import InputResult from "../../model/InputResult";
import { StatusType } from "../../model/StatusType";
type Props = {
    submitFn: (emplNumber: number) => Promise<InputResult>,

}
export const RandomEmployeesForm: React.FC<Props> = ({ submitFn }) => {
    const {minRandomQuantity, maxRandomQuantity }
        = employeeConfig;
    const message = React.useRef<string>('');
    const [open, setOpen] = React.useState(false);
    const severity = React.useRef<StatusType>('success');
    const onSubmitFn = async (event: React.FormEvent<HTMLFormElement>) => {
         event.preventDefault();
            const data = new FormData(event.currentTarget);
            const emplNumber: number = parseInt(data.get('emplnumber')! as string);
            const result = await submitFn(emplNumber);
            message.current = result.message!;
            severity.current = result.status;
            message.current && setOpen(true);
        };  
    
    function onResetFn(event: any) {
       
    }

    return <Box sx={{ marginTop: { sm: "25vh" } }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent="center">
                 <Grid item xs={8} sm={4} md={5} >
                    <TextField label="number of employees" fullWidth required
                        type="number"
                        helperText={`enter number of employees in range [${minRandomQuantity}-${maxRandomQuantity}]`}
                        name="emplnumber"
                        id="emplnumber"
                        inputProps={{
                            min: `${minRandomQuantity }`,
                            max: `${maxRandomQuantity }`
                        }} />
                </Grid>
                
            </Grid>




            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                <Button type="submit" >Submit</Button>
                <Button type="reset">Reset</Button>
            </Box>



        </form>
        {/* FIXME <Snackbar open={!!alertMessage} autoHideDuration={20000}
                     onClose={() => setAlertMessage('')}>
                        <Alert  onClose = {() => setAlertMessage('')} severity={severity.current} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar> */}
    </Box>
}