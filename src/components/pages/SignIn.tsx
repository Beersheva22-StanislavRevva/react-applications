import { useDispatch } from "react-redux";
import LoginData from "../../model/LoginData";
import InputResult from "../../model/InputResult";
import { authService } from "../../config/service-config";
import UserData from "../../model/UserData";
import { authActions } from "../../redux/Slices/authSlice";
import SignInForm from "../forms/SignInForm";


const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    async function submitFn(loginData:LoginData) : Promise<InputResult> {
        const res: UserData = await authService.login(loginData);
        res && dispatch(authActions.set(res));
        return {status: res ? 'success' : 'error',
                message: res ? '' : 'Incorrect Credentials' }
    }
    return <SignInForm submitFn = {submitFn}/>
}

 export default SignIn;