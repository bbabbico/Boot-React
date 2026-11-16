import {useActionState} from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import jwtAxios from "../../util/jwtUtil";
import {API_SERVER_HOST} from "../../api/todoApi";
import FetchingModal from "../common/FetchingModal";
import ResultModal from "../common/ResultModal";

const initState = {result: "", error: ""};

const modifyAction = async (state, formData) => {
  const email = formData.get("email");
  const pw = formData.get("pw");
  const nickname = formData.get("nickname");

  if (pw.length < 8) {
    return {result: "", error: "패스워드는 8자 이상이어야 합니다."};
  }

  try {
    await jwtAxios.put(`${API_SERVER_HOST}/api/member/modify`, {email, pw, nickname});
  } catch (err) {
    return {result: "", error: err.response?.data?.error || "수정 중 오류가 발생했습니다."};
  }

  return {result: "Modified", error: ""};
};

const inputClass = "w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md";

const ModifyComponent = () => {
  const {loginState, doLogout, moveToLogin} = useCustomLogin();

  const [state, action, isPending] = useActionState(modifyAction, initState);

  const closeModal = () => {
    doLogout();
    moveToLogin();
  };

  return (
    <div className="mt-6">
      {isPending ? <FetchingModal/> : null}
      {state.error ? <div className="bg-amber-500">{state.error}</div> : null}
      {state.result ? (
        <ResultModal title="회원정보 수정 결과" content="회원정보가 수정되었습니다." callbackFn={closeModal}/>
      ) : null}

      <form action={action}>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Email</div>
            <input className={inputClass} name="email" type="text" defaultValue={loginState.email} readOnly/>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Password</div>
            <input className={inputClass} name="pw" type="password"/>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">Nickname</div>
            <input className={inputClass} name="nickname" type="text" defaultValue={loginState.nickname}/>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative mb-4 flex w-full flex-wrap justify-end">
            <button type="submit" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500">
              Modify
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModifyComponent;
