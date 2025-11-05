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
        title={"소상공인을 위한 쉽고 빠른 플랫폼, market BEE"}
        content={
          "매출, 방문 패턴, 고객 리뷰 등 복잡한 영업 데이터를 AI가 자동으로 분석하여 \n효율적인 홍보 전략과 맞춤형 리포트를 제공합니다."
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
