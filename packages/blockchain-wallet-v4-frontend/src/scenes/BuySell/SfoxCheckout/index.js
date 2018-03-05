import React from 'react'
import { actions } from 'data'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getBase, getData, getErrors, getQuote, getTrades } from './selectors'
import Success from './template.success'

class Checkout extends React.Component {
  componentWillMount () {
    this.props.sfoxDataActions.fetchProfile()
    this.props.sfoxDataActions.fetchAccounts()
    this.props.sfoxDataActions.fetchQuote({quote: { amt: 1e8, baseCurr: 'BTC', quoteCurr: 'USD' }})
  }

  render () {
    const { data, errors, quote, base, trades, modalActions, sfoxDataActions } = this.props
    const { handleTrade, fetchQuote } = sfoxDataActions
    const { showModal } = modalActions

    return data.cata({
      Success: (value) => <Success base={base} value={value} errors={errors} quote={quote} handleTrade={handleTrade} showModal={showModal} fetchQuote={(quote) => fetchQuote({ quote, nextAddress: value.nextAddress })} />,
      Failure: (msg) => <div>{msg.error}</div>,
      Loading: () => <div>Loading...</div>,
      NotAsked: () => <div />
    })
  }
}

const mapStateToProps = state => ({
  base: getBase(state),
  data: getData(state),
  quote: getQuote(state),
  trades: getTrades(state),
  errors: getErrors(state)
})

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(actions.modals, dispatch),
  sfoxDataActions: bindActionCreators(actions.core.data.sfox, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
