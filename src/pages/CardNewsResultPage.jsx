import Loading from "../components/Loading";
import Ex1 from "../assets/image.png";
import "../styles/CardNewsResultPage.css";

// import img from "../assets/show.png";
import { useEffect, useRef } from "react";

function CardNewsResultPage() {
  // 🍊 제주 감귤 에이드 출시! 한 모금마다 상큼 청량함이 가득해요.
  // 8월 한정 10% 혜택으로 더 가볍게 즐겨보세요
  const chance = 1;

  const canvasRef = useRef(null);
  const resultImgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    console.log(1);

    // 이미지 로드
    const image = new Image();
    image.src = Ex1; // 이미지 경로를 설정하세요.
    image.onload = () => {
      // 이미지 렌더링
      ctx.drawImage(image, 0, 0, 1024, 1024); // (이미지 객체, x, y, 너비, 높이) -  1:1, 가로/세로

      // 텍스트 스타일 설정
      ctx.font = "45px bold";
      ctx.fillStyle = "red";

      const text = "여름 휴가 안내 🌞"; // 텍스트 두 줄

      // 텍스트 크기 계산
      // const metrics = ctx.measureText(text);
      // const textWidth = metrics.width;
      // const textHeight = 24;
      // const x = 400;
      // const y = 300;

      // 박스 그리기 (배경)
      // ctx.fillStyle = "rgba(255, 255, 255, 0.7)"; // 반투명 흰색
      // ctx.fillRect(x - 80, y - textHeight, textWidth + 10, textHeight + 10);

      // 텍스트 그리기
      ctx.fillStyle = "black";
      ctx.fillText(text, 300, 600);

      const data = canvas.toDataURL("image/png");
      resultImgRef.current.src = data;
    };
  }, []);

  return (
    <div className="cardnews-container">
      <canvas
        ref={canvasRef}
        width={1024}
        height={1024}
        style={{ display: "none" }}
      />
      {/* <Loading /> */}
      <div className="result-container">
        <div className="top-box"></div>
        <div className="result-box">
          {/* 1:1, 가로/세로 스타일 지정 필요 */}
          <img ref={resultImgRef} className="result-img" />
          <div className="button-container">
            <button className="save">저장하기</button>
            <button className="back">홍보페이지로 돌아가기</button>
            <button className="new">새로 만들기</button>
          </div>
          <p>
            이번 달 무료 횟수 <span>{chance}회</span> 남았어요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardNewsResultPage;
