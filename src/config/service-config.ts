
import AuthService from "../service/auth/AuthService";
import AuthserviceFake from "../service/auth/AuthServiceFake";
import AuthServiceJwt from "../service/auth/AuthServiceJwt";
import EmployeesService from "../service/crud/EmployeesService";
import EmployeesServiceRest from "../service/crud/EmployeesServiceRest";


// export const authService: AuthService =
//  new AuthServiceFire();
//  export const employeesService: EmployeesService = 
//     new EmployeesServiceFire();
export const authService: AuthService = new AuthServiceJwt('http://localhost:3500/login')
export const employeesService: EmployeesService = new EmployeesServiceRest(
    'http://localhost:3500/employees',
);