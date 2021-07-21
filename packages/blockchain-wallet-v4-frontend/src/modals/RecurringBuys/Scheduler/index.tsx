import React, { useEffect } from 'react'
import { connect, ConnectedProps, useDispatch } from 'react-redux'

import { SBPaymentMethodType, SBPaymentTypes } from 'core/types'
import { actions, selectors } from 'data'
import { RootState } from 'data/rootReducer'

import Success from './template.success'

const SchedulerContainer = (props: Props) => {
  const dispatch = useDispatch()
  // const { methods } = props.formValues
  const { method } = props
  // const showScheduler = methods.some((m) => method && method.type === m)

  useEffect(() => {
    dispatch(actions.components.recurringBuy.fetchMethods())
  }, [method])

  return (
    <>
      <Success disabled={false} />
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  // formValues: (selectors.form.getFormValues('recurringBuyScheduler')(state) as {
  //   methods: SBPaymentTypes[]
  // }) || { methods: [] }
})

const connector = connect(mapStateToProps)

type OwnProps = { method?: SBPaymentMethodType }
export type Props = ConnectedProps<typeof connector> & OwnProps

export default connector(SchedulerContainer)
