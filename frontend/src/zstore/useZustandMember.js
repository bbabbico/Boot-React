import {create} from "zustand";
import {loginPost} from "../api/memberApi";
import {getCookie, setCookie, removeCookie} from "../util/cookieUtil";
import useZustandCart from "./useZustandCart";

const initState = {email: ""};

const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  if (memberInfo && memberInfo.nickname) {
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
  }

  return memberInfo || {...initState};
};

const saveMemberCookie = (member) => {
  setCookie("member", JSON.stringify({...member, nickname: encodeURIComponent(member.nickname)}), 1);
};

const useZustandMember = create((set) => ({
  member: loadMemberCookie(),
  login: async (loginParam) => {
    let data;

    try {
      data = await loginPost(loginParam);
    } catch (error) {
      console.error(error);
      return {error: "ERROR_LOGIN"};
    }

    if (!data.error) {
      saveMemberCookie(data);
      set({member: data});
    }

    return data;
  },
  save: (memberInfo) => {
    saveMemberCookie(memberInfo);
    set({member: memberInfo});
  },
  logout: () => {
    removeCookie("member");
    useZustandCart.getState().reset();
    set({member: {...initState}});
  },
}));

export default useZustandMember;
