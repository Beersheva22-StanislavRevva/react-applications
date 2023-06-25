import { useDispatch } from "react-redux";
import InputResult from "../../model/InputResult";
import { admFlActions } from "../../redux/Slices/admFlSlice";
import { userFlActions } from "../../redux/Slices/userFlSlice";
import Input from "../common/Input";
import { useNavigate } from "react-router-dom";
const ADMIN_LOGIN = "admin";

const SignIn: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function inputCheck(inputString:string):InputResult {
        if (inputString.toLocaleLowerCase() === ADMIN_LOGIN) {
            dispatch(admFlActions.setFl(true));
            dispatch(userFlActions.setFl(true));
        } else {
            dispatch(admFlActions.setFl(false));
            dispatch(userFlActions.setFl(true));
        }
        navigate("/");
          return {status: "success"};
    }
    

return <p className="component-logo">
    <div>Sign in Component</div>
    <Input placeholder="Enter login" buttonTitle="Login" type="text" submitFn={inputCheck} />
 </p>
}
 
export default SignIn;
