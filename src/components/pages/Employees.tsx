import { Alert, Box, Snackbar, Typography } from "@mui/material"
import exp from "constants"
import { useEffect, useRef, useState } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { Subscription } from 'rxjs'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { StatusType } from "../../model/StatusType";
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelectorAuth } from "../../redux/store";
import UserData from "../../model/UserData";
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
      ], flex: 0.6, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'})
     return columns; 
}
function deleteEmployee(id: GridRowId): void  {
   employeesService.deleteEmployee(id);
   console.log(id);
}

const Employees: React.FC = () => {
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
return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Box sx={{ height: '50vh', width: '80vw' }}>
        <DataGrid columns={getColumns(userData)} rows={employees} />
    </Box>
    <Snackbar open={!!alertMessage} autoHideDuration={20000}
                     onClose={() => setAlertMessage('')}>
                        <Alert  onClose = {() => setAlertMessage('')} severity={severity.current} sx={{ width: '100%' }}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
  </Box>
}
export default Employees;


