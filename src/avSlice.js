import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
  name: "av",
  initialState: [
    {
      img: "/projector.jpg",
      name: "Projectors",
      cost: 200,
      quantity: 0,
    },
    {
      img: "/speaker.jpg",
      name: "Speaker",
      cost: 35,
      quantity: 0,
    },
    {
      img: "/microphones.jpg",
      name: "Microphones",
      cost: 45,
      quantity: 0,
    },
    {
      img: "/whiteboards.jpg",
      name: "Whiteboards",
      cost: 80,
      quantity: 0,
    },
    {
      img: "/signage.avif",
      name: "Signage",
      cost: 80,
      quantity: 0,
    },
  ],

  reducers: {
    incrementAvQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        state[index].quantity++;
      }
    },
    decrementAvQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
      }
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
