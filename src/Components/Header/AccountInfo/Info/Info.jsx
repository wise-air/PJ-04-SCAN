import css from './Info.module.css'
import {useEffect, useState} from "react";
import axios from "axios";

const Info = ({token}) => {
    const [info, setInfo] = useState(null)

    useEffect(() => {
        axios.get(
            'https://gateway.scan-interfax.ru/api/v1/account/info',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            }
        ).then((response) => {
            setInfo(response.data)
        }).catch((error) => {
        })
    }, [token])

    return info ? <div className={css.info}>
        <div className={css.bg}></div>
        <table className={css.desktop}>
            <tbody>
            <tr>
                <td className={css.used}>
                    Использовано компаний
                </td>
                <td className={css.usedCount}>
                    {info.eventFiltersInfo.usedCompanyCount}
                </td>
            </tr>
            <tr>
                <td className={css.limit}>
                    Лимит по компаниям
                </td>
                <td className={css.limitCount}>
                    {info.eventFiltersInfo.companyLimit}
                </td>

            </tr>
            </tbody>
        </table>
        <div className={css.mobile}>
            <div className={css.used}>
                Использовано компаний
            </div>
            <div className={css.usedCount}>
                {info.eventFiltersInfo.usedCompanyCount}
            </div>
            <div className={css.limit}>
                Лимит по компаниям
            </div>
            <div className={css.limitCount}>
                {info.eventFiltersInfo.companyLimit}
            </div>
        </div>
    </div> : <div className={css.info}>
        <div className={css.wait}></div>
    </div>

}

export default Info