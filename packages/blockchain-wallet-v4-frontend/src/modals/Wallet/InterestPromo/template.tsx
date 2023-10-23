import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { fiatToString } from '@core/exchange/utils'
import { WalletFiatType } from '@core/types'
import { Button, Link, Modal, ModalBody, ModalHeader, Text } from 'blockchain-info-components'
import { BlueCartridge } from 'components/Cartridge'

import { Props as OwnProps, SuccessStateType } from './index'
import { calcBasicInterest } from './InterestPromo.utils'

const ModalHeaderBorderless = styled(ModalHeader)`
  border-bottom: none;
  padding: 28px 38px 0 32px;
`
const ModalFooterBorderless = styled.div`
  border-top: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px 32px;
`
const ModalBodyStyled = styled(ModalBody)`
  padding: 28px 32px;
`

export const CustomBlueCartridge = styled(BlueCartridge)`
  display: flex;
  align-items: center;
  font-size: 14px;
`

type Props = OwnProps & SuccessStateType

const Success: React.FC<Props> = ({
  afterTransaction,
  closeAll,
  interestActions,
  interestRates,
  position,
  productAuthMetadata,
  total,
  userData,
  walletCurrency
}) => {
  const { currency, fiatAmount, fiatCurrency } = afterTransaction
  const purchaseAmount = fiatAmount || 0
  const interestAmount = calcBasicInterest(purchaseAmount, interestRates[currency || 'BTC'])
  const worthCurrency = fiatCurrency || (walletCurrency as WalletFiatType)
  const isUserFromUK = userData?.address?.country === 'GB'
  const isIpFromUk = productAuthMetadata?.ipCountry === 'GB'
  return (
    <Modal size='medium' position={position} total={total}>
      <ModalHeaderBorderless onClose={closeAll}>
        <CustomBlueCartridge>
          <FormattedMessage
            id='components.alerts.first_pax_trade_info_dyk'
            defaultMessage='Did you know?'
          />
        </CustomBlueCartridge>
      </ModalHeaderBorderless>
      <ModalBodyStyled>
        <Text size='24px' color='grey900' weight={600} style={{ marginTop: '16px' }}>
          <FormattedMessage
            id='modals.interestpromo.title'
            defaultMessage='Earn {interestRate}% Rewards on your {coin}'
            values={{
              coin: currency,
              interestRate: interestRates[currency]
            }}
          />
        </Text>
        {isUserFromUK && (
          <Text color='grey600' weight={500} size='14px' italic>
            APYs are always indicative based on past performance and are not guaranteed. Find out
            more about Staking and Rewards as well as the risks{' '}
            <Link
              size='12px'
              href='https://support.blockchain.com/hc/en-us/articles/10857163796380-Staking-and-Rewards-what-are-the-risks'
              target='_blank'
              style={{ textDecoration: 'underline' }}
            >
              here
            </Link>
            .
          </Text>
        )}
        <Text
          size='14px'
          color='grey600'
          weight={500}
          style={{ lineHeight: 1.5, marginTop: '4px', maxWidth: '414px' }}
        >
          <FormattedMessage
            id='modals.interestpromo.body'
            defaultMessage='Your recent {amount} purchase of {coin} could be worth <b>{worthAmount}*</b> in the next 12 months.'
            values={{
              amount: fiatToString({
                unit: worthCurrency,
                value: purchaseAmount
              }),
              coin: currency,
              worthAmount: fiatToString({
                unit: worthCurrency,
                value: interestAmount
              })
            }}
          />
        </Text>
        <Text
          size='12px'
          color='grey600'
          weight={500}
          style={{ lineHeight: 1.5, marginTop: '4px', maxWidth: '414px' }}
        >
          <FormattedMessage
            id='modals.interestpromo.disclaimer'
            defaultMessage='*Averaged periodic estimations based on current rate and price'
          />
        </Text>
      </ModalBodyStyled>
      <ModalFooterBorderless>
        <Button
          style={{ marginTop: '16px', maxWidth: '376px' }}
          nature='primary'
          data-e2e='startEarningInterestNow'
          fullwidth
          onClick={() => {
            interestActions.showInterestModal({ coin: currency, step: 'DEPOSIT' })
          }}
        >
          <FormattedMessage id='modals.interestpromo.button' defaultMessage='Start Earning Now' />
        </Button>
        <Link
          size='16px'
          weight={600}
          style={{
            marginTop: '16px',
            textAlign: 'center',
            width: '100%'
          }}
          onClick={() => {
            interestActions.stopShowingInterestModal()
          }}
        >
          <FormattedMessage
            id='modals.interestpromo.dont_show_again'
            defaultMessage='Don’t show again'
          />
        </Link>
      </ModalFooterBorderless>
    </Modal>
  )
}

export default Success
