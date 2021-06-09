import { connect } from 'react-redux';
import { getIsMainnet, getPreferences } from '../../../selectors';
import { getNativeCurrency } from '../../../ducks/metamask/metamask';
import { getHexGasTotal } from '../../../helpers/utils/confirm-tx.util';
import { sumHexes } from '../../../helpers/utils/transactions.util';
import TransactionBreakdown from './transaction-breakdown.component';

const mapStateToProps = (state, ownProps) => {
  const { transaction, isTokenApprove } = ownProps;
  const {
    txParams: { gas, gasPrice, value } = {},
    txReceipt: { gasUsed } = {},
  } = transaction;
  const { showFiatInTestnets } = getPreferences(state);
  const isMainnet = getIsMainnet(state);

  const gasLimit = typeof gasUsed === 'string' ? gasUsed : gas;

  const hexGasTotal =
    (gasLimit && gasPrice && getHexGasTotal({ gasLimit, gasPrice })) || '0x0';
  const totalInHex = sumHexes(hexGasTotal, value);

  return {
    nativeCurrency: getNativeCurrency(state),
    showFiat: isMainnet || Boolean(showFiatInTestnets),
    totalInHex,
    gas,
    gasPrice,
    gasUsed,
    isTokenApprove,
  };
};

export default connect(mapStateToProps)(TransactionBreakdown);