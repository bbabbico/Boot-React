import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginPost} from "../api/memberApi";
import {getCookie, setCookie, removeCookie} from "../util/cookieUtil";

const initState = {
  email: "",
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) => {
  return loginPost(param);
});

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo;
};

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      const data = action.payload;

      return {email: data.email};
    },
    save: (state, action) => {
      const payload = action.payload;

      setCookie("member", JSON.stringify({...payload, nickname: encodeURIComponent(payload.nickname)}), 1);

      return payload;
    },
    logout: () => {
      removeCookie("member");

      return {...initState};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginPostAsync.fulfilled, (state, action) => {
      const payload = action.payload;

      if (payload.nickname) {
        payload.nickname = encodeURIComponent(payload.nickname);
      }

      if (!payload.error) {
        setCookie("member", JSON.stringify(payload), 1);
      }

      return payload;
    });
  },
});

export const {login, save, logout} = loginSlice.actions;

export default loginSlice.reducer;
