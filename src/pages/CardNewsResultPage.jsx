import { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import Ex1 from "../assets/test/image03.png";
import "../styles/cardnews/CardNewsResultPage.css";
// import useTextStore from "../store/useTextStore";
// import useCardStore from "../store/useCardStore";
// import img from "../assets/show.png";

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  // 왼쪽 정렬
  ctx.textAlign = "left";
  // ctx.textBaseline = "top";
  const words = text.split(" ");
  let line = "";
  const lines = [];

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && n > 0) {
      lines.push(line.trim());
      line = words[n] + " ";
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim());

  // 줄마다 lineHeight 적용
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i], x, y + i * lineHeight);
  }
}

function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function CardNewsResultPage() {
  // console.log(generatedText);
  // const generatedText = useTextStore((state) => state.generatedText);
  // const imgData = useCardStore((state) => state);
  const remainingFreeCount = 1;
  // 이미지 박스 크기 스타일
  const [box, setBox] = useState("");

  const canvasRef = useRef(null);
  const resultImgRef = useRef(null);

  useEffect(() => {
    const imgData = {
      url: Ex1,
      // "추석 연휴에도 정상 영업합니다.\n 가족과 함께 특별한 시간을 보내세요!"
      // "부드럽고 고소한 까눌레와 휘낭시에!\n 특별한 날, 소중한 분께 완벽한 선물이 됩니다."
      // "깔끔한 인테리어와 아늑한 룸, 편리한 주차 공간까지!\n 편안한 시간을 만끽하세요."
      text: "추석 연휴에도 정상 영업합니다.\n 가족과 함께 특별한 시간을 보내세요!",
      ratio: "SQUARE_1_1", // SQUARE_1_1, RATIO_2_3, RATIO_3_2
      template: "T1_TEXT_ONLY", //  T1_TEXT_ONLY, T2_TEXT_BOTTOM, T3_TEXT_RIGHT
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

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
          ctx.drawImage(image, 0, 0, 1024, 1024); // (이미지 객체, x, y, 너비, 높이)
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

      // 텍스트 위치 x-y(넓이,높이)
      // 280-360/530/700(550, 60), 180-810/890(800,60), 625-200/400(350,60)
      // 260-480/630/750(600, 60), 230-1040/1140(650,60), 600-320/480(450,60)
      // 290-320/480/620(830, 60), 360-850/940(600,60), 850-250/430(400,60)

      // x/y/넓이/높이(230)
      //240/260/550/400, 140/710/800/300, 585/110/400/500

      const lines = imgData.text.split("\n");
      const position = [200, 400, 700];
      // 590, 140, 370, 500, 40,
      drawRoundedRect(ctx, 585, 110, 400, 500, 60, "rgba(255,255,255,0.8)");

      // 텍스트 스타일 설정
      ctx.font = "700 45px Inter";
      ctx.fillStyle = "black";

      // 텍스트 그리기
      lines.forEach((line, i) => {
        drawWrappedText(ctx, line, 625, position[i], 350, 60);
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
            이번 달 무료 횟수 <span>{remainingFreeCount}회</span> 남았어요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardNewsResultPage;
