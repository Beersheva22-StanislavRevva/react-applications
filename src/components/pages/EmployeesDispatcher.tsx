import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Employees from "../pages/Employees"
import EmployeesPortrait from "./EmployeesPortrait";

const EmployeesDispatcher: React.FC = () => {
    const theme = useTheme();
    const isPortrait = useMediaQuery(theme.breakpoints.down('md'));
    return !isPortrait ? <Employees/> : <EmployeesPortrait/>
}
export default EmployeesDispatcher