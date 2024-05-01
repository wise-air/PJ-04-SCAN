import css from './Header.module.css'
import Menu from "./Menu/Menu";
import Login from "./Login/Login";

import {useToken} from '../../redux/token'
import {useNavigate} from "react-router-dom";
import MobileMenu from "./MobileMenu/MobileMenu";
import Info from "./AccountInfo/Info/Info";
import Account from "./AccountInfo/Account/Account";

const Header = () => {
    const navigate = useNavigate()
    const token = useToken()

    const logoClick = () => {
        navigate("/")
    }

    return (
        <header className={css.header}>
            <img className={css.logo} src="/static/logo.png" alt="" onClick={logoClick}/>
            <Menu />
            <MobileMenu token={token} />
            {token ? <Account token={token}/> : <Login />}
            {token ? <Info token={token}/> : ""}
        </header>
    )
}

export default Header