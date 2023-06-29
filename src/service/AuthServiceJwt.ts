import UserData from "../model/UserData";
import AuthService from "./AuthService";
function getUserData (data: any): UserData {
    const jwtPayloadJson = atob(data.accessToken.split('.')[1]);
    const jwtPayloadObj = JSON.parse(jwtPayloadJson);
    return {email:jwtPayloadObj.email, role:jwtPayloadObj.sub}
}
export default class AuthServiceJwt implements AuthService {
    constructor(private url: string){}
    async login(loginData: { email: string; password: string; }): Promise<UserData> {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        return response.ok ? getUserData(await response.json()) : null;
    }
    async logout(): Promise<void> {
      
    }
    
}