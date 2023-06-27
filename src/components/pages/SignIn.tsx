import { useDispatch } from "react-redux";
import Input from "../common/Input";
import InputResult from "../../model/InputResult";
import { authActions } from '../../redux/Slices/authSlice'
const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    return <Input submitFn={function (username: string): InputResult {
        setTimeout(() => dispatch(authActions.set(username)), 3000);
        return {status: "success", message:'success'}
    } } placeholder="username" />
}

 export default SignIn;