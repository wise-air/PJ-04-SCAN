import css from './Section1.module.css'
import {useNavigate} from "react-router-dom";

const Section1 = ({token}) => {
    const navigate = useNavigate()

    const click = () => {
        navigate('/request')
    }

    return (
        <section className={css.section}>
            <h2 className={css.text1}>
                сервис по поиску публикаций о компании по его ИНН
            </h2>
            <p className={css.text2}>
                Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
            </p>
            {token ? <button onClick={click} className={css.button}>Запросить данные</button> : ""}
            <img className={css.image} src="/static/main-image.jpg" alt="" />
            <div className={css.patch}></div>
        </section>
    )
}

export default Section1