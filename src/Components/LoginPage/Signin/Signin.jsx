import {useRef, useState} from "react";
import {Link} from "react-router-dom"
import { useDispatch } from 'react-redux'
import axios from "axios";

import { setToken } from '../../../redux/token'

import css from "./Signin.module.css"

const Signin = () => {
    const dispatch = useDispatch()

    const [state, setState] = useState({
        disableButton: true,
        loginError: false,
        passError: false,
    })

    const login = useRef(null);
    const pass = useRef(null);

    const onChange = () => {
        const loginValue = login.current.value;
        const passValue = pass.current.value;

        setState({
            disableButton: loginValue === "" || state.loginError || passValue === "" || state.passError
        })
    }

    const onChangeLogin = () => {
        setState({loginError: false})
        onChange()
    }

    const onChangePass = () => {
        setState({passError: false})
        onChange()
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const phone = /^\+\d[ \d]*\d$/
        const loginValue = login.current.value;
        let loginTest = true;
        const passValue = pass.current.value;

        if (loginValue.slice(0, 1) === "+") {
            loginTest = phone.test(loginValue)
            if (!loginTest) {
                setState({
                    loginError: true,
                    disableButton: true,
                })
            }
        }

        if (loginTest) {
            axios.post(
                'https://gateway.scan-interfax.ru/api/v1/account/login',
                {
                    login: loginValue,
                    password : passValue,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                }
            ).then((response) => {
                dispatch(setToken(response.data))
            }).catch((error) => {
                console.log(error)
                setState({
                    passError: true,
                    disableButton: true,
                })
            })
        }
    }

    return (
        <>
            <form className={css.form} onSubmit={onSubmit}>
                <label className={css.loginLabel} htmlFor="signin-login">Логин или номер телефона:</label>
                <input
                    onChange={onChangeLogin}
                    ref={login}
                    className={state.loginError ? css.inputError : ""}
                    type="text"
                    id="signin-login"
                />
                <div className={css.error}>
                    {state.loginError ? "Введите корректные данные" : <>&nbsp;</>}
                </div>
                <label className={css.passLabel} htmlFor="signin-passwd">Пароль:</label>
                <input
                    onChange={onChangePass}
                    ref={pass}
                    className={state.passError ? css.inputError : ""}
                    type="password"
                    id="signin-passwd"
                />
                <div className={css.error}>
                    {state.passError ? "Неправильный пароль" : <>&nbsp;</>}
                </div>
                <button disabled={state.disableButton} className={css.submit} type="submit">Войти</button>
                <div className={css.reset}>
                    <Link href="/reset">
                        Восстановить пароль
                    </Link>
                </div>
            </form>
            <div className={css.enter}>
                <div className={css.enterText}>
                    Войти через:
                </div>
                <div className={css.enterOAuth}>
                    <div className={css.enterGoogle}></div>
                    <div className={css.enterFacebook}></div>
                    <div className={css.enterYandex}></div>
                </div>
            </div>
        </>
    )
}

export default Signin