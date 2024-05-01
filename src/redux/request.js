import { createSlice } from '@reduxjs/toolkit'

export const requestSlice = createSlice({
    name: 'request',
    initialState: {
        empty: true,
        inn: "",
        tonality: "any",
        limit: 1000,
        startDate: null,
        endDate: null,
        maxFullness: true,
        inBusinessNews: true,
        onlyMainRole: true,
        onlyWithRiskFactors: false,
        excludeTechNews: false,
        excludeAnnouncements: true,
        excludeDigests: false,
    },
    reducers: {
        setRequest: (state, action) => {
            const data = action.payload

            state.empty = false
            state.inn = data.inn
            state.tonality = data.tonality
            state.limit = data.limit
            state.startDate = data.startDate
            state.endDate = data.endDate
            state.maxFullness = data.maxFullness
            state.inBusinessNews = data.inBusinessNews
            state.onlyMainRole = data.onlyMainRole
            state.onlyWithRiskFactors = data.onlyWithRiskFactors
            state.excludeTechNews = data.excludeTechNews
            state.excludeAnnouncements = data.excludeAnnouncements
            state.excludeDigests = data.excludeDigests
        },
    }
})

export const { setRequest } = requestSlice.actions

export default requestSlice.reducer