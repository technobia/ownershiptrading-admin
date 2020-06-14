import * as numeral from "numeral";

export const formatNumber = (num = 0) => numeral(num).format('0,0');
