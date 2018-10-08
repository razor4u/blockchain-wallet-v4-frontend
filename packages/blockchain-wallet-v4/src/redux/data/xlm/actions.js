import * as AT from './actionTypes'

export const fetchLedgerDetails = () => ({ type: AT.FETCH_LEDGER_DETAILS })
export const setLedgerDetails = ledger => ({
  type: AT.SET_LEDGER_DETAILS,
  payload: { ledger }
})

export const fetchAccount = () => ({ type: AT.FETCH_ACCOUNT })
export const setAccount = account => ({
  type: AT.SET_ACCOUNT,
  payload: { account }
})

export const fetchRates = () => ({ type: AT.FETCH_XLM_RATES })
export const setRates = rates => ({
  type: AT.SET_XLM_RATES,
  payload: { rates }
})
