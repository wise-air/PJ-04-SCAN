import {Outlet} from "react-router-dom";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Base = () => {

    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>

    )
}

export default Base