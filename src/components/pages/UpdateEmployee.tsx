import Employee from "../../model/Employee";
import { EmployeeForm } from "../forms/EmployeeForm";
import InputResult from "../../model/InputResult";
import { authService, employeesService } from "../../config/service-config";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { Box, Modal, Typography } from "@mui/material";
import { UpdateEmployeeForm } from "../forms/UpdateEmployeeForm copy";
type Props = {
    id:number,
    handleClose: () => void,
    open:boolean,
    empl: any
}
const UpdateEmployee: React.FC<Props> = ({id,open,handleClose,empl}) => {
    const dispatch = useDispatch();
    async function submitFn(empl: Employee): Promise<InputResult> {
        console.log()
        const res: InputResult = {status: 'success', message: ''};
        try {
            const employee = await employeesService.updateEmployee(empl, id);
            res.message = `employee with id: ${id} has been added`
        } catch (error: any) {
           res.status = 'error' ;
           if((typeof(error) == 'string') && error.includes('Authentication')) {
            authService.logout();
            dispatch(authActions.reset());
            res.message = ""
           }
           res.message = error;
           res.message = error;
        }
        handleClose();
        return res;
    }
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="edit-form-modal-title"
        aria-describedby="edit-form-modal">
        <Box sx={style} display="flex" flexDirection="column" alignItems="center">
            <Typography id="edit-form-modal-title" variant="h5" component="h3">
            Update Employee
          </Typography>
        <Typography id="edit-form-modal" sx={{ mt: 2 }}>
            <UpdateEmployeeForm submitFn={submitFn} empl={empl} />
        </Typography>
        </Box>
    </Modal>
}
export default UpdateEmployee;