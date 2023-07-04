import { Observable } from "rxjs";
import Employee from "../model/Employee";

export default interface EmployeesService {
    addRandomEmployees(emplNumber: number): Promise<Employee[]>;
    addEmployee(empl: Employee): Promise<Employee>
    getEmployees():Observable<Employee[] | string>;
    deleteEmployee(id:any):Promise<void>;

}