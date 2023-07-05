import { Alert, Box, Snackbar, Typography } from "@mui/material"
import exp from "constants"
import { ReactNode, useEffect, useRef, useState } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { Subscription } from 'rxjs'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { StatusType } from "../../model/StatusType";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSelectorAuth } from "../../redux/store";
import UserData from "../../model/UserData";
import Confirm from "../common/Confirm";
import UpdateEmployee from "./UpdateEmployee";

const Employees: React.FC = () => {
function getColumns (userData:UserData) {
const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'},
    {field: 'name',headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center' },
    {field: 'birthDate',  headerName: "Date", flex:0.8, type: 'date', headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'},
    {field: 'department', headerName: 'Department', flex:0.8, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'},
    {field: 'salary', headerName: 'Salary', type: 'number', flex:0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'},
    {field: 'gender', headerName: 'Gender', flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'},
];        
  userData?.role=== "admin" && columns.push(
    {field: 'actions', type: 'actions', getActions: (params: GridRowParams) => [
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => deleteEmployee(params.id)} label="Delete" />,
        <GridActionsCellItem icon={<EditIcon />} onClick={() => editEmployee(params)} label="Edit" />
      ], flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'})
     return columns; 
}
function deleteEmployee(id: GridRowId): void  {
   setOpenConfirm(true);
   emplId.current = +id;
   }
function editEmployee(params: GridRowParams): void {
    setOpenEditForm(true);
    empl.current = params.row;
    emplId.current = +params.id;
}


    const dispatch = useDispatch();
    const userData = useSelectorAuth();
    const [alertMessage, setAlertMessage] = useState('');
    const [employees, setEmployees] = useState<Employee[]>([]);
    const severity = useRef<StatusType>('error');
    useEffect(() => {
        const subscription: Subscription = employeesService.getEmployees()
            .subscribe({
                next(emplArray: Employee[] | string) {
                    if(typeof emplArray === 'string') {
                        //FIXME
                        if(emplArray.includes('Authentication')) {
                            authService.logout();
                            dispatch(authActions.reset());
                        } else {
                            setAlertMessage(emplArray);
                        }
                    } else {
                    setEmployees(emplArray.map(e => ({...e, birthDate: new Date(e.birthDate)})));
                    }   
                }
            });
        return () => subscription.unsubscribe();
    }, []);
    const [openConfirm,setOpenConfirm] = useState(false);
    const emplId = useRef(0);
    const empl = useRef({});
    function handleCloseConfirm(agree:boolean) {
        setOpenConfirm(false);
        agree && employeesService.deleteEmployee(emplId.current);
     }
    const [openEditForm,setOpenEditForm] = useState(false);
    function handleCloseEditForm() {
        setOpenEditForm(false);
    }

 return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Box sx={{ height: '50vh', width: '80vw' }}>
        <DataGrid columns={getColumns(userData)} rows={employees} />
    </Box>
    <Confirm 
        dialogTitle="Delete employee?"
        dialogContent={`Warning! You will delete employee id ${emplId.current} `}
        handleClose={handleCloseConfirm}
        open={openConfirm} />
    <UpdateEmployee
        id = {emplId.current} 
        handleClose={handleCloseEditForm}
        open={openEditForm}
        empl={empl.current} />
    <Snackbar open={!!alertMessage} autoHideDuration={20000}
                     onClose={() => setAlertMessage('')}>
                        <Alert  onClose = {() => setAlertMessage('')} severity={severity.current} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
  </Box>
}
export default Employees;


