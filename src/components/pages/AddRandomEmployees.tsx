import InputResult from "../../model/InputResult";
import { Box } from "@mui/material";
import Input from "../common/Input";
import { getRandomEmployee } from "../../Util/random";
import employeeConfig from "../../config/employee-config.json"
import {employeesService } from "../../config/service-config"

const AddRandomEmployees: React.FC = () => {
    const{minSalary, maxSalary, minYear, maxYear, departments,minRandomQuantity, maxRandomQuantity} = employeeConfig;
    function submitFn (inputText:string): InputResult {
        let res: InputResult = {status:"success", message: `${inputText} employees were added` }
        const emplNumber = parseInt(inputText);
        if (emplNumber >= minRandomQuantity && emplNumber <= maxRandomQuantity) {
           [...new Array(emplNumber)].map((_,i) => 
            employeesService.addEmployee(getRandomEmployee
                (minSalary, maxSalary, minYear, maxYear, departments)));
        
        } else {
            res = {status: 'error', message: 'the number sholud be from 1 to 50'}
        }
        return res;
    }


   return <Box>
    <Input submitFn={submitFn} placeholder="number of employees" buttonTitle="Add" type="number" />
   </Box>
}

export default AddRandomEmployees