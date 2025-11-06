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
          "매출과 리뷰 AI가 대신 분석해드려요. \n이제껏 없던 쉽고 스마트한 올인원 마케팅 플랫폼, \nmarketBEE와 함께라면 당신의 가게가 새로워질 거예요."
        }
      />
      <CardWrapper />
      <TextBox
        title={"가게 운영과 마케팅을 한 번에 잡는 스마트 솔루션"}
        content={"사장님을 위한 새로운 성장과 전략, 지금 시작하세요."}
      />
      <MatchMap onClick={gotToSignup} />
    </div>
  );
}

export default WelcomePage;
