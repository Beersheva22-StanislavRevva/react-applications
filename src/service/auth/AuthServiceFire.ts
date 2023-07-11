import LoginData from "../../model/LoginData";
import UserData from "../../model/UserData";
import AuthService from "./AuthService";
import {getFirestore, collection, getCountFromServer,
    query, where, doc, getDoc} from "firebase/firestore"
import {GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import appFirebase from "../../config/firebase-config";

export default class AuthServiceFire implements AuthService{
   private auth = getAuth(appFirebase);
   private adminitsrators = collection(getFirestore(appFirebase), 'administrators');
   private async isAdmin(uid: any): Promise<boolean> {
      const docRef = doc(this.adminitsrators, uid)
        return  (await getDoc(docRef)).exists();
   }
    async login(loginData: LoginData): Promise<UserData> {
        let userData: UserData = null;
        try{ 
            const userAuth = loginData.email==="GOOGLE" ?
            await signInWithPopup(this.auth, new GoogleAuthProvider()) :
            await signInWithEmailAndPassword(this.auth, loginData.email,
                loginData.password);
            userData = {email: userAuth.user.email as string,
                role: await this.isAdmin(userAuth.user.uid) ? 'admin' : 'user'}
        } catch(error) { 
            console.log();            
        }
        return userData;
    }
    logout(): Promise<void> {
        return signOut(this.auth);
    }
}