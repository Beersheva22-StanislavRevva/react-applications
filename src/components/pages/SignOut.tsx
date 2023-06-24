import { useDispatch } from "react-redux";
import { admFlActions } from "../../redux/Slices/admFlSlice";
import { userFlActions } from "../../redux/Slices/userFlSlice";

const SignOut: React.FC = () => {
    const dispatch = useDispatch();
    
    function signOutFn() {
    dispatch(admFlActions.setFl(false));
    dispatch(userFlActions.setFl(false)); 
    }
return <p className="component-logo">
<div>Sign out Component</div>
<button onClick={signOutFn} className="btn">SignOut</button>
</p>
}

export default SignOut;


