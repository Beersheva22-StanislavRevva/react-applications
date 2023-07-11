
import AuthService from "../service/auth/AuthService";
import AuthserviceFake from "../service/auth/AuthServiceFake";
import AuthServiceJwt from "../service/auth/AuthServiceJwt";
import EmployeesService from "../service/EmployeesService";
import EmployeesServiceFire from "../service/EmployeesServiceFire";
import EmployeesServiceRest from "../service/EmployeesServiceRest";
import AuthServiceFire from "../service/auth/AuthServiceFire";

export const authService: AuthService =
 new AuthServiceFire();
 export const employeesService: EmployeesService = 
    new EmployeesServiceFire();