import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import Ex1 from "../assets/test/image07.png";
import "../styles/cardnews/CardNewsResultPage.css";
// import img from "../assets/show.png";

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
  // 이미지 박스 크기 스타일
  const [box, setBox] = useState("");
  const chance = 1;

  const canvasRef = useRef(null);
  const resultImgRef = useRef(null);

  useEffect(() => {
    const imgData = {
      url: Ex1,
      text: "여름 휴가 안내 🌞  \n8월 20일부터 23일까지 휴무입니다. \n20일부터 20일부터 20일 부터 20일 부터",
      ratio: "RATIO_3_2", // SQUARE_1_1, RATIO_2_3, RATIO_3_2
      template: "T1_TEXT_ONLY", //  T1_TEXT_ONLY, T2_TEXT_BOTTOM, T3_TEXT_RIGHT
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    // 텍스트 위치 x-y(넓이,높이)
    // (300-350/450/600(570/70),180-830/920(800/70), 600-200/300(400/70))
    // 270-370/470(600,70), ,160-1050/1140/1230(800/70)

    // 이미지 로드
    const image = new Image();
    image.src = imgData.url; // 이미지 경로를 설정하세요.
    image.onload = () => {
      // 이미지 렌더링
      switch (imgData.ratio) {
        case "SQUARE_1_1":
          // 이미지 크기
          canvas.width = 1024;
          canvas.height = 1024;
          setBox("");
          ctx.drawImage(image, 0, 0, 1024, 1024); // (이미지 객체, x, y, 너비, 높이) 1:1
          break;
        case "RATIO_2_3":
          canvas.width = 1080;
          canvas.height = 1350;
          setBox("ratio23");
          ctx.drawImage(image, 0, 0, 1080, 1350); // (이미지 객체, x, y, 너비, 높이) 가로
          break;
        case "RATIO_3_2":
          canvas.width = 1350;
          canvas.height = 1080;
          setBox("ratio32");
          ctx.drawImage(image, 0, 0, 1350, 1080); // (이미지 객체, x, y, 너비, 높이) 세로
          break;
      }

      const lines = imgData.text.split("\n");
      const position = [760, 900, 990];

      // 텍스트 스타일 설정
      ctx.font = "700 45px Inter";
      ctx.fillStyle = "black";

      // 텍스트 그리기
      lines.forEach((line, i) => {
        drawWrappedText(ctx, line, 340, position[i], 800, 70);
        // ctx.fillText(line, 300, position[i]);
      });

      const data = canvas.toDataURL("image/png");
      resultImgRef.current.src = data;
    };
  }, []);

  return (
    <div className="cardnews-container">
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* <Loading /> */}
      <div className="result-container">
        <div className="top-box"></div>
        <div className="result-box">
          {/* 1:1, 가로/세로 스타일 지정 필요 */}
          <img ref={resultImgRef} className={`result-img ${box}`} />
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
