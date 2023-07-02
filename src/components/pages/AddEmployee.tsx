import { Typography } from "@mui/material"
import exp from "constants"
import EmployeeForm from "../forms/EmployeeForm";
import Employee from "../../model/Employee";
import { useDispatch } from "react-redux";
import { employeesService } from "../../config/service-config";


const AddEmployee: React.FC = () => {
  // const dispatch = useDispatch();
  async function submitFn(name:string, birthdate:Date, salary:number,
    department:string, gender:'male' | 'female'): Promise<Employee> {
    const employee:Employee = { id: '',
      birthdate: birthdate,
      name: name,
      department: department,
      salary: salary,
      gender: gender}
    const res = await employeesService.addEmployee(employee);
    // res && dispatch(authActions.set(res));
    // return {status: res ? 'success' : 'error',
    //  message: res ? '' : 'Incorrect Credentials'}
    return employee;
}
  return  <EmployeeForm submitFn={submitFn}/>
    //return <Typography variant = "h4" align = "center">AddEmployee page</Typography>
}
export default AddEmployee;