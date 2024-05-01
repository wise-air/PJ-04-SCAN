import Login from "../../Login/Login";
import css from "./Account.module.css"
import png from "./avatar.png";
import {NavLink} from "react-router-dom";

const Account = ({token}) => {

    return (
        <div className={css.account}>
            <div className={css.left}>
                <div className={css.name}>
                    Vault Boy
                </div>
                <div className={css.exit}>
                    <NavLink className={css.logout} to="/logout">
                        Выйти
                    </NavLink>
                </div>
            </div>
            <div className={css.right}>
                <img className={css.avatar} src={png} alt="avatar" />
            </div>
        </div>
    )

}

export default Account