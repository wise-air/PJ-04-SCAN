import css from './Main.module.css'
import Section1 from "./Section1/Section1";
import Section2 from "./Section2/Section2";
import Section3 from "./Section3/Section3";
import Section4 from "./Section4/Section4";
import {useToken} from "../../redux/token";

const Main = () => {
    const token = useToken()

    return (
        <main className={css.main}>
            <Section1 token={token} />
            <Section2 />
            <Section3 />
            <Section4 token={token} />
        </main>
        
    )
}

export default Main