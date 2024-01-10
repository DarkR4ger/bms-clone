import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ActionPayload {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const initialState = {
  id: "",
  name: "",
  email: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ActionPayload>) => {
      return { ...state, ...action.payload };
    },
    delUser: () => {
      return initialState;
    },
  },
});

export const { setUser, delUser } = userSlice.actions;
export default userSlice.reducer;
