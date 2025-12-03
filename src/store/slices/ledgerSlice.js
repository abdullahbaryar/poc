import { createSlice } from "@reduxjs/toolkit";

// Initial Mock Data
const initialState = {
  fiatReserves: 1000000000,
  zenithSupply: 1000000000,
  catenaSupply: 1000000000,
  blockHeightZenith: 1024,
  blockHeightCatena: 5012,
  userBalance: 5000,
  merchantBalance: 150000,
  pspBalance: 500000,
  transactions: [],
  settlements: [],
};

const ledgerSlice = createSlice({
  name: "ledger",
  initialState,
  reducers: {
    updateBlocks: (state) => {
      state.blockHeightZenith += 1;
      state.blockHeightCatena += Math.floor(Math.random() * 3) + 1;
    },
    issueCurrency: (state, action) => {
      const amount = action.payload;
      state.fiatReserves += amount;
      state.zenithSupply += amount;
      state.catenaSupply += amount;
      state.userBalance += amount; // Demo logic: give to user for testing
    },
    transferFunds: (state, action) => {
      const { amount, to, from } = action.payload;
      state.userBalance -= amount;
      state.merchantBalance += amount;
      state.transactions.unshift({
        id: `tx_${Date.now()}`,
        from,
        to,
        amount,
        timestamp: new Date().toLocaleTimeString(),
        status: "Settled",
      });
    },
    settleMerchantFunds: (state) => {
      const amount = state.merchantBalance;
      state.merchantBalance = 0;
      state.pspBalance += amount;
      state.settlements.unshift({
        id: `set_${Date.now()}`,
        amount,
        timestamp: new Date().toLocaleString(),
        status: "Completed",
      });
    },
  },
});

export const {
  updateBlocks,
  issueCurrency,
  transferFunds,
  settleMerchantFunds,
} = ledgerSlice.actions;
export default ledgerSlice.reducer;
