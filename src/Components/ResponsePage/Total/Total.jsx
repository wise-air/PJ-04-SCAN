import css from "./Total.module.css"
import {useRef} from "react";

import arrow from "./arrow.png"


const Total = ({error, histograms}) => {
    const ref = useRef(null)

    const scroll = (shift) => {
        if (!ref.current) {
            return
        }
        const width = ref.current.firstChild.offsetWidth
        const rect = ref.current.getBoundingClientRect()
        const p_rect = ref.current.parentElement.getBoundingClientRect()
        const s = p_rect.left - rect.left + shift * width;
        ref.current.parentElement.scroll({left: s, behavior: "smooth"})
    }

    const left = () => {
        scroll(1)
    }

    const right = () => {
        scroll(-1)
    }

    return (
        <div className={css.total}>
            <h2 className={css.head2}>
                Общая сводка
            </h2>
            <p className={css.foundCount}>
                {histograms ? `Найдено ${histograms.total} вариантов` : <>&nbsp;</>}
            </p>
            <div className={css.carousel}>
                <img onClick={left} className={css.imgLeft} src={arrow} alt=""/>
                <div className={css.content}>
                    <div className={css.legend}>
                        <div>Период</div>
                        <div>Всего</div>
                        <div>Риски</div>
                    </div>
                    {error ?
                        <div className={css.noItems}>
                            <div className={css.waitText}>
                                Что-то пошло не так. Пожалуйста попробуйте еще раз.
                            </div>
                        </div>
                        :
                        histograms ? (
                                histograms.totalDocuments.length ?
                                    <div className={css.items}>
                                        <div ref={ref} className={css.itemsContainer}>
                                            {
                                                histograms.totalDocuments.map((item, key) =>
                                                    <div key={key} className={css.item}>
                                                        <div>{new Date(item.date).toLocaleDateString()}</div>
                                                        <div>{item.value}</div>
                                                        <div>{histograms.riskFactors[key].value}</div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className={css.noItems}>
                                        <div className={css.waitText}>
                                            Ничего не найдено. Попробуйте изменить условия поиска.
                                        </div>
                                    </div>
                            )
                            :
                            <div className={css.noItems}>
                                <div className={css.wait}></div>
                                <div className={css.waitText}>
                                    Загружаем данные
                                </div>
                            </div>
                    }
                </div>
                <img onClick={right} className={css.imgRight} src={arrow} alt=""/>
            </div>
        </div>
    )
}

export default Total