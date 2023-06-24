import {NavLink, Outlet } from "react-router-dom"
import { useSelectorAdmFl, useSelectorUserFl } from "../../redux/store";


const Navigator: React.FC = () => {
    const admFl = useSelectorAdmFl();
    const userFl = useSelectorUserFl();
    if (admFl && userFl) {
        return <div>
                <nav>
                    <ul className="navigator-list">
                        <li className="navigator-item">
                            <NavLink to = "/home">Home</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/customers">Customers</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/orders">Orders</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/products">Products</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/shoppingcart">Shopping Cart</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/signout">Sign out</NavLink>
                        </li>
                    </ul>
                </nav>
            <Outlet></Outlet>
        </div>
    }
    if (!admFl && userFl) {
        return <div>
                <nav>
                    <ul className="navigator-list">
                        <li className="navigator-item">
                            <NavLink to = "/home">Home</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/products">Products</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/shoppingcart">Shopping Cart</NavLink>
                        </li>
                        <li className="navigator-item">
                            <NavLink to = "/signout">Sign out</NavLink>

                        </li>
                    </ul>
                </nav>
            <Outlet></Outlet>
        </div>
    } else {
        return <div>
            <nav>
                <ul className="navigator-list">
                    <li className="navigator-item">
                        <NavLink to = "/home">Home</NavLink>
                    </li>
                    <li className="navigator-item">
                        <NavLink to = "/signin">Sign in</NavLink>

                    </li>
                </ul>
            </nav>
        <Outlet></Outlet>
    </div>
    }
}
export default Navigator;