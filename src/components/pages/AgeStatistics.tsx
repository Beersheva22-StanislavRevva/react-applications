import { Alert, Box, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography } from "@mui/material"
import exp from "constants"
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Employee from "../../model/Employee";
import { authService, employeesService } from "../../config/service-config";
import { Subscription } from 'rxjs'
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowParams } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/slices/authSlice";
import { StatusType } from "../../model/StatusType";
import { useSelectorAuth } from "../../redux/store";
import UserData from "../../model/UserData";
import employeeConfig from "../../config/employee-config.json"
import { count } from "../../Util/number-functions";
import { getStatistics } from "../../service/EmployeesServiceRest";
import { log } from "console";

const AgeStatistics: React.FC = () => {
const rangeValues:number[] = [10, 1, 2, 3, 5];
const field = "age";
const [range, setRange] = useState(rangeValues[0]);
function getColumns (userData:UserData) {
const columns: GridColDef[] = [
    {field: 'id', headerName: 'ID', flex: 0.2, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'},
    {field: 'min',headerName: 'Range', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center' },
    {field: 'max',headerName: 'Range', flex: 0.5, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center' },
    {field: 'count', headerName: 'Quantity', flex: 0.3, headerClassName: 'data-grid-header',
        align: 'center', headerAlign: 'center'},
];        
       return columns; 
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
    employees.map(e => (e.age = e.birthDate.getFullYear(),e));
    const rowsData = useMemo(()=> getStatistics(employees, field, range),[employees,range]);
    console.log(employees);
    function handlerSelect(event:any):void {
        setRange(event.target.value); 
    }
        
    return <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} marginLeft="3vw">
        <Box width= "20vw">
            <FormControl fullWidth required>
                <InputLabel id="select-range">Select range</InputLabel>
                <Select labelId="select-range" label="Range"
                    value={range} defaultValue={5000}
                    onChange={handlerSelect}>
                    {rangeValues.map(r => <MenuItem value={r} key={r}>{r}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
        <Box sx={{ height: '50vh', width: '80vw' }} marginTop='5vh'>
            <DataGrid columns={getColumns(userData)} rows={rowsData} />
        </Box>
        <Snackbar open={!!alertMessage} autoHideDuration={20000}
            onClose={() => setAlertMessage('')}>
            <Alert onClose={() => setAlertMessage('')} severity={severity.current} sx={{ width: '100%' }}>
                {alertMessage}
            </Alert>
        </Snackbar>
    </Box>
}
export default AgeStatistics;


