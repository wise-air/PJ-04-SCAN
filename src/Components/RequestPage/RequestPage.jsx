import css from './RequestPage.module.css'
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setRequest} from "../../redux/request";
import {useNavigate} from "react-router-dom";
import {useToken} from "../../redux/token";

const RequestPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = useToken()
    const request = useSelector((state) => state.request)

    const [state, setState] = useState({
        inn: false,
        innError: false,
        limit: false,
        limitError: false,
        date: false,
        dateError: false,
        disableButton: true,
    })

    const inn = useRef(null)
    const tonality = useRef(null)
    const limit = useRef(null)
    const startDate = useRef(null)
    const endDate = useRef(null)

    const maxFullness = useRef(null)
    const inBusinessNews = useRef(null)
    const onlyMainRole = useRef(null)
    const onlyWithRiskFactors = useRef(null)
    const includeTechNews = useRef(null)
    const includeAnnouncements = useRef(null)
    const includeDigests = useRef(null)

    const updateState = (state) => {
        setState(prev => ({
            ...prev,
            ...state
        }))
    }

    const validateInn = () => {
        const innValue = inn.current.value
        updateState({innError: false})
        if (innValue === "") {
            return false
        }
        if (!innValue.match(/^\d{10}$/)) {
            updateState({innError: true})
            return false
        }
        const innNum = innValue.split('')
        const coefficients = [2, 4, 10, 3, 5, 9, 4, 6, 8]
        let innSumma = 0;
        for (let i in coefficients) {
            innSumma += coefficients[i] * innNum[i];
        }
        const innCheck = innSumma % 11 % 10;
        const result = innNum[9] === innCheck.toString()
        updateState({innError: !result})
        return result
    }

    const validateLimit = () => {
        const limitValue = Number.parseInt(limit.current.value)
        const result = limitValue >= 1 && limitValue <= 1000
        updateState({limitError: !result})
        return result
    }

    const validateDate = () => {
        updateState({dateError: false})
        if (!startDate.current.value || !endDate.current.value) {
            return false
        }
        const startValue = new Date(startDate.current.value)
        const endValue = new Date(endDate.current.value)
        const result = startValue <= endValue
        updateState({dateError: !result})
        return result
    }

    const setButtonState = (inn, limit, date) => {
        updateState({
            inn: inn,
            limit: limit,
            date: date,
            disableButton: !(inn && limit && date)
        })
    }

    const validateForm = (event) => {
        let innState = state.inn
        let limitState = state.limit
        let dateState = state.date

        if (event.target === inn.current) {
            innState = validateInn()
        } else if (event.target === limit.current) {
            limitState = validateLimit()
        } else if (event.target === startDate.current || event.target === endDate.current) {
            dateState = validateDate()
        }

        setButtonState(innState, limitState, dateState)
    }

    useEffect(() => {
        if (token === false) {
            navigate("/login")
            return
        }
        setButtonState(validateInn(), validateLimit(), validateDate())
    }, [token])

    const submit = (event) => {
        event.preventDefault()

        dispatch(setRequest({
            inn: inn.current.value,
            tonality: tonality.current.value,
            limit: limit.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            maxFullness: maxFullness.current.checked,
            inBusinessNews: inBusinessNews.current.checked,
            onlyMainRole: onlyMainRole.current.checked,
            onlyWithRiskFactors: onlyWithRiskFactors.current.checked,
            excludeTechNews: !includeTechNews.current.checked,
            excludeAnnouncements: !includeAnnouncements.current.checked,
            excludeDigests: !includeDigests.current.checked,
        }))

        navigate("/response")
    }

    return (<main className={css.request}>
        <h4 className={css.head}>Найдите необходимые данные в пару кликов</h4>
        <p className={css.subHead}>Задайте параметры поиска.<br/>Чем больше заполните, тем точнее поиск</p>

        <form onSubmit={submit} className={css.form}>
            <div className={css.container}>
                <div className={css.block1}>
                    <label className={css.innLabel} htmlFor="request_inn">ИНН компании *</label>
                    <input onChange={validateForm} ref={inn} id="request_inn"
                           placeholder="10 цифр" pattern="\d{10}" defaultValue={request.inn} required={true}
                           className={state.innError ? `${css.innInput} ${css.redInput}` : `${css.innInput}`}/>
                    <div className={css.inputError}>
                        {state.innError ? "Введите корректные данные" : <>&nbsp;</>}
                    </div>

                    <label className={css.tonalityLabel} htmlFor="request_tonality">Тональность</label>
                    <select className={css.tonalitySelect} ref={tonality} id="request_tonality"
                            defaultValue={request.tonality}>
                        <option value="any">Любая</option>
                        <option value="negative">Негативная</option>
                        <option value="positive">Позитивная</option>
                    </select>
                    <label className={css.limitLabel} htmlFor="request_limit">
                        Количество документов в выдаче *
                    </label>
                    <input onChange={validateForm} ref={limit} id="request_limit"
                           type="number" placeholder="От 1 до 1000" min="1" max="1000" defaultValue={request.limit}
                           className={state.limitError ? `${css.limitInput} ${css.redInput}` : `${css.limitInput}`}/>
                    <div className={css.inputError}>
                        {state.limitError ? "Обязательное поле" : <>&nbsp;</>}
                    </div>
                </div>
                <div className={css.block2}>
                    <label className={css.dateLabel} htmlFor="request_start_date">Диапазон поиска *</label>
                    <input onChange={validateForm} ref={startDate} id="request_start_date"
                           type="date" data-placeholder="Дата начала" required={true}
                           defaultValue={request.startDate}
                           className={state.dateError ? `${css.startDate} ${css.redInput}` : `${css.startDate}`}/>
                    <input onChange={validateForm} ref={endDate} type="date"
                           data-placeholder="Дата окончания" required={true}
                           defaultValue={request.endDate}
                           className={state.dateError ? `${css.endDate} ${css.redInput}` : `${css.endDate}`}/>
                    <div className={css.dateError}>
                        {state.dateError ? "Введите корректные данные" : <>&nbsp;</>}
                    </div>
                </div>

                <div className={css.block3}>
                    <label>
                        <input ref={maxFullness} type="checkbox" defaultChecked={request.maxFullness}/>
                        Признак максимальной полноты
                    </label>
                    <label>
                        <input ref={inBusinessNews} type="checkbox" defaultChecked={request.inBusinessNews}/>
                        Упоминания в бизнес-контексте
                    </label>

                    <label>
                        <input ref={onlyMainRole} type="checkbox" defaultChecked={request.onlyMainRole}/>
                        Главная роль в публикации
                    </label>

                    <label>
                        <input ref={onlyWithRiskFactors} type="checkbox" defaultChecked={request.onlyWithRiskFactors}/>
                        Публикации только с риск-факторами
                    </label>

                    <label>
                        <input ref={includeTechNews} type="checkbox" defaultChecked={!request.excludeTechNews}/>
                        Включать технические новости рынков
                    </label>

                    <label>
                        <input ref={includeAnnouncements} type="checkbox" defaultChecked={!request.excludeAnnouncements}/>
                        Включать анонсы и календари
                    </label>

                    <label>
                        <input ref={includeDigests} type="checkbox" defaultChecked={!request.excludeDigests}/>
                        Включать сводки новостей
                    </label>
                </div>

                <div className={css.block4}>
                    <button disabled={state.disableButton} className={css.submit} type="submit">
                        Поиск
                    </button>
                    <p className={css.terms}>
                        * Обязательные к заполнению поля
                    </p>
                </div>
            </div>
        </form>

        <img className={css.rocket} src="/static/rocket.svg" alt=""/>
        <img className={css.sheet} src="/static/sheet.svg" alt=""/>
        <img className={css.folders} src="/static/folders.svg" alt=""/>


    </main>)

}

export default RequestPage