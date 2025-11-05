// import { useEffect, useRef, useState } from "react";
import styles from "../styles/welcome/WelcomePage.module.css";
import {
  TextBox,
  HeaderSection,
  CardWrapper,
  MatchMap,
} from "../components/welcome";
// import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  // const accessToken = useAuthStore((state) => state.accessToken);

  const goToLogin = () => {
    navigate("/login");
  };

  const gotToSignup = () => {
    navigate("/signup");
  };

  // useEffect(() => {
  //   if (storeUuid) navigate("/main");
  // }, [storeUuid, navigate]);

  return (
    <div className={styles.container}>
      <HeaderSection onClick={goToLogin} />
      <TextBox
        title={
          "복잡한 매출과 리뷰, 방문 데이터를 \nAI가 자동으로 분석합니다. \nmarketBEE와 함께라면, 홍보는 쉬워지고 \n성장은 빨라집니다."
        }
      />
      {/* <div className={styles.line}></div> */}
      <CardWrapper />
      {/* <div className={styles.line}></div> */}
      <TextBox
        title={"가게 운영과 마케팅을 한 번에 잡는 스마트 솔루션"}
        content={"사장님을 위한 새로운 성장과 전략, 지금 시작하세요."}
      />
      <MatchMap onClick={gotToSignup} />
    </div>
  );
}

export default WelcomePage;
