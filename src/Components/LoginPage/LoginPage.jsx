import css from "./LoginPage.module.css"
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {useToken} from "../../redux/token";
import {useEffect} from "react";

import characters from "./characters.svg"

const LoginPage = (props) => {
    const navigate = useNavigate();
    const token = useToken()

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token])

    return (
        <main className={css.signin}>
            <div className={css.left}>
                <h1 className={css.text}>
                    Для оформления подписки на тариф, необходимо авторизоваться.
                </h1>
                <img className={css.image} src={characters} alt="" />
            </div>
            <div className={css.right}>
                <div className={css.form}>
                    <div className={css.frame}>
                        <div className={css.menu}>
                            <NavLink to="/login"  className={({isActive}) => isActive ? css.menuActive : css.menuNormal}>
                                Войти
                            </NavLink>
                            <NavLink to="/login/register"  className={({isActive}) => isActive ? css.menuActive : css.menuNormal}>
                                Зарегистрироваться
                            </NavLink>
                        </div>
                        <Outlet />
                    </div>
                    <div className={css.lock}></div>
                </div>
            </div>
            <img className={css.imageBottom} src={characters} alt="" />
        </main>
    )
}

export default LoginPage