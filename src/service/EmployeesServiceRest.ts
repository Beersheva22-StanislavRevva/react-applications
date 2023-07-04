import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { StringDecoder } from "string_decoder";
import { getRandomEmployee } from "../Util/random";

export default class EmployeesServiceRest implements EmployeesService {
    
    constructor(private url: string) { }
    updateEmployee(empl: Employee): Promise<Employee[]> {
    //TODO
        throw new Error("Method not implemented.");
    }
    async deleteEmployee(id: any): Promise<void> {
        let responseText = '';
        try {
          const response = await fetch(this.url+`/${id}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type':'application/json',
                  Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
              }, });
          if (!response.ok) {
             const {status, statusText} = response;
             responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
             throw responseText;
          }
          //return await response.json();
        } catch (error: any) {
 
           throw responseText ? responseText : "Server is unavailable. Repeat later on";
        };
    }
    
    getEmployees(): Observable<Employee[] | string> {
        const res = new Observable<Employee[] | string> ((subscriber) => {
           fetch(this.url, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem(AUTH_DATA_JWT)
                }
            }).then(response => {
                let res: Promise<Employee[] | string>;
                if (response.ok) {
                    res = response.json();
                } else {
                    res = Promise.resolve(response.status == 401 || response.status == 403
                    ?'Authentication' : response.statusText) ;
                }
                return res;
            })
            .then((data) => subscriber.next(data)).catch(error => subscriber.next('Server is unavailable, repeat later'));
        })
        return res;
    }
    async addEmployee(empl: Employee): Promise<Employee> {
        let responseText = '';
       try {
         const response = await fetch(this.url, {
             method: 'POST',
             headers: {
                 'Content-Type':'application/json',
                 Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
             },
             body: JSON.stringify({...empl, userId: 'admin'})
         });
         if (!response.ok) {
            const {status, statusText} = response;
            responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
            throw responseText;
         }
         return await response.json();
       } catch (error: any) {

          throw responseText ? responseText : "Server is unavailable. Repeat later on";
       }
       
    }
    async addRandomEmployees(emplNumber: number): Promise<Employee[]> {
     for (let i = 0 ; i < emplNumber; i++) {
        await this.addEmployee(getRandomEmployee());
    }
    return [];
    }
}