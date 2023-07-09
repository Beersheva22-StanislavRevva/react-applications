import { Observable, Subscriber } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeesService from "./EmployeesService";
import { log } from "console";
const POLLER_INTERVAL = 2000;
class Cache {
    cacheString: string = '';
    set(employees: Employee[]): void {
        this.cacheString = JSON.stringify(employees);
    }
    reset():void {
        this.cacheString = '';
    }
    isEqual(employees:Employee[]): boolean {
        return this.cacheString === JSON.stringify(employees);
    }
    getCache(): Employee[] {
        return !this.isEmpty() ? JSON.parse(this.cacheString) : [];
    }
    isEmpty():boolean {
        return this.cacheString.length === 0;
    }
}
export default class EmployeesServiceRest implements EmployeesService {
    private observable: Observable<Employee[] |string> | null = null;
    private cache: Cache = new Cache();
    constructor(private url: string) { }
   
    async updateEmployee(empl: Employee): Promise<Employee> {
        await this.sendRequest("GET", `/${empl.id}`);
        return this.sendRequest("PUT", `/${empl.id}`, JSON.stringify(empl));
        // let responseText = '';
        // let flUpdate = false;
        // try {
        //     await this.getEmployee(empl.id);
        //     flUpdate = true;
        //     const response = await fetch(`${this.url}/${empl.id}`, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
        //         },
        //         body: JSON.stringify(empl)
                
        //     });
        //     if (!response.ok) {
        //         const { status, statusText } = response;
        //         responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
        //         throw responseText;
        //     }
        //     return await response.json();
        // } catch (error: any) {
        //     if (!flUpdate) {
        //         throw error;
        //     }
        //     throw responseText ? responseText : "Server is unavailable. Repeat later on";
    }
    
    async getEmployee(id: any): Promise<Employee> {
        return await this.sendRequest("GET", `/${id}`);
        // let responseText = '';
        // try {
        //     const response = await fetch(`${this.url}/${id}`, {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
        //         },
                
        //     });
        //     if (!response.ok) {
        //         const { status, statusText } = response;
        //         responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
        //         throw responseText;
        //     }
        //     return await response.json();
        // } catch (error: any) {

        //     throw responseText ? responseText : "Server is unavailable. Repeat later on";
        // }
    }
    async deleteEmployee(id: any): Promise<void> {
        await this.sendRequest("GET", `/${id}`);
        return this.sendRequest("DELETE", `/${id}`);
        // let responseText = '';
        // let flDelete = false;
        // try {
        //     await this.getEmployee(id);
        //     flDelete = true;
        //     const response = await fetch(`${this.url}/${id}`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
        //         },
                
        //     });
        //     if (!response.ok) {
        //         const { status, statusText } = response;
        //         responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
        //         throw responseText;
        //     }
        //     return await response.json();
        // } catch (error: any) {
        //     if(!flDelete) {
        //         throw error;
        //     }
        //     throw responseText ? responseText : "Server is unavailable. Repeat later on";
        // }
    }
    getEmployees(): Observable<Employee[] | string> {
       if (this.observable === null) {
        this.observable = new Observable ((subscriber) =>{ 
            if(this.cache.isEmpty()) {
                this.sendEmployeesToSubscriber(subscriber);
            } else {
                const cachedEmployees= this.cache.getCache();
                subscriber.next(cachedEmployees);
                console.log(`${cachedEmployees.length} employees restored from cache`);
            };
            const intervalId = setInterval(
                () => this.sendEmployeesToSubscriber(subscriber),
                POLLER_INTERVAL
            );
            return () => clearInterval(intervalId);
        });
        } 
        return this.observable
    }
    
    async sendEmployeesToSubscriber(subscriber: Subscriber<Employee[] | string>): Promise<void> {
        try {
            const employees: Employee[] = await this.fetchEmployees();
            if (!this.cache.isEqual(employees)) {
                subscriber.next(employees);
                this.cache.set(employees);
                console.log(`Fetched new data with ${employees.length} employees`);
            } else {
                console.log('Data is not changed');
            }

        } catch (error) {
            subscriber.next(error as string);
        }
    }
    
    async fetchEmployees(): Promise<Employee[]> {
        const employees = await this.sendRequest("GET", "",);
        return employees.map((empl: Employee) => ({
            ...empl, birthDate: new Date(empl.birthDate),
        }))
    }
    async sendRequest (method: string, path: string, body?:string): Promise<any> {
        const token = window.localStorage.getItem(AUTH_DATA_JWT);
        const headers: HeadersInit = {
            "Content-Type": "application/json"
        };
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        try{
            const response = await fetch(this.url + path, {
                method,
                headers,
                body
            });
            console.log({
                method,
                headers,
               body
            });
               if (!response.ok) {
                 return Promise.resolve(response.status == 401 || response.status == 403 ?
                     'Authentication' : response.statusText); 
             }
            return await response.json();
            } catch(e) {
                if(e instanceof Error) {
                    throw "Server is unavaible, repeat later";
                } else {
                    throw e;
                }
            }
    }
    
    async addEmployee(empl: Employee): Promise<Employee> {
        return await this.sendRequest("POST","",JSON.stringify({...empl, userId: 'admin' }));
        // let responseText = '';
        // try {
        //     const response = await fetch(this.url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
        //         },
        //         body: JSON.stringify({ ...empl, userId: 'admin' })
        //     });
        //     if (!response.ok) {
        //         const { status, statusText } = response;
        //         responseText = status == 401 || status == 403 ? 'Authentication' : statusText;
        //         throw responseText;
        //     }
        //     return await response.json();
        // } catch (error: any) {

        //     throw responseText ? responseText : "Server is unavailable. Repeat later on";
        // }

    }

}
