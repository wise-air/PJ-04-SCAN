import {useSelector} from "react-redux";
import {useToken} from "../../redux/token";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Total from "./Total/Total";
import Documents from "./Documents/Documents";

import css from "./ResponsePage.module.css"
import svg from "./woman-target.svg"

const ResponsePage = () => {
    const navigate = useNavigate()
    const token = useToken()
    const request = useSelector((state) => state.request)
    const [histograms, setHistograms] = useState(null)
    const [objects, setObjects] = useState(null)
    const [error, setError] = useState(false)

    const processHistograms = (response) => {
        const data = {
            totalDocuments: [],
            riskFactors: [],
        }
        for (let l of response.data.data) {
            switch (l.histogramType) {
                case "totalDocuments":
                    data.totalDocuments = l.data
                    break
                case "riskFactors":
                    data.riskFactors = l.data
                    break
                default:
                    break
            }
        }
        data.total = data.totalDocuments
            .reduce((sum, item) => sum + item.value, 0)
            .toLocaleString()
        setHistograms(data)
    }

    const processObjects = (response) => {
        setObjects(response.data.items)
    }

    useEffect(() => {
        if (token === false) {
            navigate("/login")
            return
        }
        if (request.empty) {
            navigate("/request")
            return
        }
        const histogramsUrl = 'https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms'
        const objectsUrl = 'https://gateway.scan-interfax.ru/api/v1/objectsearch'
        const search = {
            issueDateInterval: {
                startDate: new Date(request.startDate).toISOString(),
                endDate: new Date(request.endDate).toISOString(),
            },
            searchContext: {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [
                        {
                            type: "company",
                            sparkId: null,
                            entityId: null,
                            inn: request.inn,
                            maxFullness: request.maxFullness,
                            inBusinessNews: request.inBusinessNews,
                        }
                    ],
                    onlyMainRole: request.onlyMainRole,
                    tonality: request.tonality,
                    onlyWithRiskFactors: request.onlyWithRiskFactors,
                    riskFactors: {
                        and: [],
                        or: [],
                        not: []
                    },
                    themes: {
                        and: [],
                        or: [],
                        not: []
                    }
                },
                themesFilter: {
                    and: [],
                    or: [],
                    not: []
                }
            },
            searchArea: {
                includedSources: [],
                excludedSources: [],
                includedSourceGroups: [],
                excludedSourceGroups: []
            },
            attributeFilters: {
                excludeTechNews: request.excludeTechNews,
                excludeAnnouncements: request.excludeAnnouncements,
                excludeDigests: request.excludeDigests,
            },
            similarMode: "duplicates",
            limit: request.limit,
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: [
                "totalDocuments",
                "riskFactors"
            ]
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        }
        axios
            .post(histogramsUrl, search, config)
            .then(processHistograms)
            .catch(() => {setError(true)})
        axios
            .post(objectsUrl, search, config)
            .then(processObjects)
            .catch(() => {setError(true)})
    }, [token, request])

    return (
        <main className={css.response}>
            <h1 className={css.head}>Ищем. Скоро будут результаты</h1>
            <p className={css.subHead}>Поиск может занять некоторое время, просим сохранять терпение.</p>
            <img className={css.img} src={svg} alt=""/>
            <Total error={error} histograms={histograms}/>
            {objects ? <Documents token={token} objects={objects}/> : "" }
        </main>
    )
}

export default ResponsePage