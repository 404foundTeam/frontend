import Loading from "../components/Loading";
import Ex1 from "../assets/image02.png";
import "../styles/cardnews/CardNewsResultPage.css";

// import img from "../assets/show.png";
import { useEffect, useRef } from "react";

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y); // 마지막 줄 출력
}

function CardNewsResultPage() {
  // 🍊 제주 감귤 에이드 출시! 한 모금마다 상큼 청량함이 가득해요.
  // 8월 한정 10% 혜택으로 더 가볍게 즐겨보세요
  const chance = 1;

  const canvasRef = useRef(null);
  const resultImgRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // 1:1(1024/1024) 가로/세로(1080/1350),(1350,1080)
    // 폰트 45, bold 고정
    // div 스타일 변경(크기), 맥스 와이드 변경(x, 줄바꿈 함수), 이미지 랜더링 크기 변경, 포지션 변경(y)

    // 이미지 로드
    const image = new Image();
    image.src = Ex1; // 이미지 경로를 설정하세요.
    image.onload = () => {
      // 이미지 렌더링
      // ctx.drawImage(image, 0, 0, 1024, 1024); // (이미지 객체, x, y, 너비, 높이)
      ctx.drawImage(image, 0, 0, 1080, 1350); // (이미지 객체, x, y, 너비, 높이)
      // ctx.drawImage(image, 0, 0, 1350, 1080); // (이미지 객체, x, y, 너비, 높이)

      // 텍스트 스타일 설정
      ctx.font = "700 45px Inter";
      ctx.fillStyle = "black";

      const text = "여름 휴가 안내 🌞  \n8월 20일부터 23일까지 휴무입니다.";
      const lines = text.split("\n");
      // const [text01, text02] = text.split("\n");
      const position = [450, 600];

      // 텍스트 그리기
      // ctx.fillText(text01, 300, 450);
      lines.forEach((line, i) => {
        drawWrappedText(ctx, line, 300, position[i], 570, 70);
        // ctx.fillText(line, 300, position[i]);
      });

      const data = canvas.toDataURL("image/png");
      resultImgRef.current.src = data;
    };
  }, []);

  return (
    <div className="cardnews-container">
      <canvas
        ref={canvasRef}
        width={1080}
        height={1350}
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
