import Employee from "../../model/Employee";
import InputResult from "../../model/InputResult";
import { authService, employeesService } from "../../config/service-config";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { RandomEmployeesForm } from "../forms/RandomEmployeesForm";

const AddRandomEmployees: React.FC = () => {
    const dispatch = useDispatch();
    async function submitFn(emplNumber: number): Promise<InputResult> {
        const res: InputResult = {status: 'success', message: ''};
        try {
         await employeesService.addRandomEmployees(emplNumber);
            res.message = `${emplNumber} random employees  have been added`
        } catch (error: any) {
           res.status = 'error' ;
           if((typeof(error) == 'string') && error.includes('Authentication')) {
            authService.logout();
            dispatch(authActions.reset());
            res.message = ""
           }
           res.message = error;
        }
        return res;
    }
    return <RandomEmployeesForm submitFn={submitFn}/>
}
export default AddRandomEmployees;