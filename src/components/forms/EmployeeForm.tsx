import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, RadioProps, Select, SelectChangeEvent, TextField, styled } from "@mui/material"
import React from "react";
import employeeConfig from "../../config/employee-config.json"
import Employee from "../../model/Employee";

type Props = {
  submitFn: (name:string, birthdate:Date, salary:number,
    department:string, gender:'male' | 'female') => Promise<Employee>
}

const EmployeeForm: React.FC<Props> = ({submitFn}) => {
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name: string = data.get('name')! as string;
    const birthdateString: string = data.get('birthdate')! as string;
    const birthdate = new Date(birthdateString);
    const salary:number = parseInt(data.get('salary')! as string);
    const department: string = data.get('department')! as string;
    const gender: 'male' | 'female' = data.get('gender')! as ('male' | 'female');

    console.log(name, birthdate, salary, department, gender);
    const result = await submitFn(name, birthdate, salary,
      department, gender);
    // message.current = result.message!;
    // severity.current = result.status;
    // message.current && setOpen(true);
  };

  function getSelectMenu() {
    return employeeConfig.departments.map(e => <MenuItem value={e}>{e}</MenuItem>)
  }


  return <Box
    component="form"
    width='90vw'
    onSubmit={handleSubmit}
    display='flex'
    flexDirection='row'
    marginLeft='3vw'>
    <Box margin="normal" marginLeft="2vw" >
      <TextField
        margin="normal"
        id="name"
        label="Employee Name"
        name="name"
        autoComplete="name"
        autoFocus
        required
        InputLabelProps={{
          shrink: true,
        }} />
    </Box>
    <Box margin="normal" marginLeft="2vw" >
       <TextField
        margin="normal"
        id="birthdate"
        label="Birth Date"
        name="birthdate"
        type="date"
        autoComplete="birthdate"
        defaultValue="01-01-2000"
        autoFocus
        InputLabelProps={{
          shrink: true,
        }}
        required />
      {/* <TextField
        margin="normal"
        id="birthdate"
        label="Birth Date"
        name="birthdate"
        autoComplete="birthdate"
        autoFocus
        required /> */}
    </Box>
    <Box margin="normal" marginLeft="2vw" >
      <TextField
        margin="normal"
        id="salary"
        label="Salary"
        name="salary"
        autoComplete="salary"
        autoFocus
        required
        InputLabelProps={{
          shrink: true,
        }} />
    </Box>
    <Box margin="normal" marginLeft="2vw" marginTop='1vh'>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="male"
        name="gender"

      >
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" />
      </RadioGroup>
    </Box>
    <Box margin="normal" marginLeft="2vw" width='20vw' display='flex' flexDirection='column' marginTop='-0.5vh'>
      <InputLabel id="demo-simple-select-label">Department</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        name="department"
        required
      >
        {getSelectMenu()}
      </Select>
    </Box>
    <Box margin="normal" marginTop="1.5vw" marginLeft="2vw">
      <Button type="submit" variant="outlined">Add employee</Button>
    </Box>
  </Box>
}

export default EmployeeForm;