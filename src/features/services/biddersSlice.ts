import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Bidder {
  id: number;
  product: string;
  seller: string;
  bid: number;
  endTime: Date;
  remainingTime?: string;
  description?: string | undefined;
}

interface BiddersState {
  bidders: Bidder[];
}

const initialState: BiddersState = {
  bidders: [
    {
      id: 1,
      product: "Super Cool",
      seller: "test",
      bid: 120,
      description: "asdasd",
      endTime: new Date("2024-04-20"),
    },
    {
      id: 2,
      product: "Article Hot",
      seller: "test",
      bid: 50,
      description: "asdasd",
      endTime: new Date("2024-04-21"),
    },
    {
      id: 3,
      product: "Juicy Dude",
      seller: "test",
      bid: 360,
      description: "asdasd",
      endTime: new Date("2024-02-01"),
    },
    {
      id: 4,
      product: "My Soul",
      seller: "test",
      bid: 190,
      description: "asdasd",
      endTime: new Date("2024-04-29"),
    },
  ],
};

export const biddersSlice = createSlice({
  name: "bidders",
  initialState,
  reducers: {
    addBidder: (state, action: PayloadAction<Bidder>) => {
      state.bidders = [...state.bidders, action.payload];
    },
    removeBidder: (state, action: PayloadAction<number>) => {
      state.bidders = state.bidders.filter(
        (bidder) => bidder.id !== action.payload
      );
    },
    updateBid: (
      state,
      action: PayloadAction<{ id: number; newBid: number }>
    ) => {
      const { id, newBid } = action.payload;
      const index = state.bidders.findIndex((bidder) => bidder.id === id);
      if (index !== -1) {
        state.bidders[index].bid = newBid;
      }
    },
  },
});

export const { addBidder, removeBidder, updateBid } = biddersSlice.actions;

export const selectBidders = (state: RootState) => state.bidders.bidders;

export default biddersSlice.reducer;
