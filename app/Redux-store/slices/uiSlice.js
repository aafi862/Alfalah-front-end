// Redux slice for UI states
// Example: global loader, modals, alerts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;
