import css from './Tariff.module.css'
import {useNavigate} from "react-router-dom";

const Tariff = ({item}) => {
    const navigate = useNavigate()

    const clickTariff = () => {
        navigate("/tariff")
    }

    const clickAccount = () => {
        navigate("/account")
    }

    return (
        <div className={css.tariff} style={{borderColor: item.background}}>
            <div className={css.head} style={{backgroundColor: item.background}}>
                <div className={css.title} style={{color: item.color}}>
                    {item.title}
                </div>
                <div className={css.subTitle} style={{color: item.color}}>
                    {item.subTitle}
                </div>
                <img className={css.icon} src={item.icon} alt=""/>
            </div>
            <div className={css.body}>
                {item.current
                    ?
                    <div className={css.current}>
                        Текущий тариф
                    </div>
                    :
                    ""
                }
                <div className={css.price}>
                    {item.price}
                    {item.oldPrice
                        ?
                        <span className={css.oldPrice}>
                            {item.oldPrice}
                        </span>
                        :
                        ""
                    }
                </div>
                <p className={css.priceText}>
                    {item.textPrice}
                </p>
                <div className={css.content}>
                    В тариф входит:
                </div>
                <ul className={css.contentList}>
                    {item.content.map((content_item, key) =>
                        <li key={key} className={css.contentItem}>
                            {content_item}
                        </li>
                    )}
                </ul>

                <div className={css.button}>
                    {item.current
                        ?
                        <button onClick={clickAccount} className={css.buttonAccount}>
                            Перейти в личный кабинет
                        </button>
                        :
                        <button onClick={clickTariff} className={css.buttonMore}>
                            Подробнее
                        </button>
                    }
                </div>
            </div>
        </div>
    )

}

export default Tariff