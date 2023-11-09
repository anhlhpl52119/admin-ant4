import { stringToNumber } from '@/utils/number.util';

export const invoiceNetTake = (invoice: API.SourceInvoice): number => {
  const { commission_rate, total_amount, tax, discount } = invoice;
  if (!total_amount) {
    return 0;
  }
  let amount = Math.round(total_amount);
  const rate = stringToNumber(commission_rate) / 100;
  if (rate) {
    amount = Math.round(amount * rate);
  }
  if (tax) {
    // TODO: prepare for additional logic later. this not available right now
  }
  if (discount) {
    // TODO: prepare for add additional later. this not available right now
  }
  return amount;
};
