import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";

export default class EmployeesServiceRest implements EmployeesService {
    bearer = localStorage.getItem(AUTH_DATA_JWT)
    constructor(private url: string) { };
    async addEmployee(empl: Employee): Promise<Employee> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.bearer}`
            },
            body: JSON.stringify({ ...empl, userId: "admin" })
        }).then(response => response.json());
        return response;
    }
}