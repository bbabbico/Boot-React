import useCustomLogin from "../hooks/useCustomLogin";

function AboutPage() {
  const {isLogin, moveToLoginReturn} = useCustomLogin();

  if (!isLogin) {
    return moveToLoginReturn();
  }

  return (
    <div className="text-3xl">
      <div>About Page</div>
    </div>
  );
}

export default AboutPage;
