import { Transaction } from '@mysten/sui/transactions';
const tx = new Transaction();

const [coin] = tx.splitCoins(tx.gas, [100]);
// transfer the split coin to a specific address
tx.transferObjects([coin], '0xSomeSuiAddress');