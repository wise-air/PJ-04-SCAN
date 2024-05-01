import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearToken} from "../../redux/token";

const LogoutPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(clearToken())
        navigate('/')
    }, [])

    return ""
}

export default LogoutPage