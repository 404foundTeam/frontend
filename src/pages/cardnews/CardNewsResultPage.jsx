import { useEffect, useRef, useState } from "react";
import { uploadFinalSnsCard, getPresignedUrlForCard } from "../../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/cardnews/CardNewsResultPage.module.css";
import useTextStore from "../../store/useTextStore";
import useCardStore from "../../store/useCardStore";
import useAuthStore from "../../store/useAuthStore";
import ResultButtonButton from "../../components/cardnews/ResultButton";
import ChanceText from "../../components/cardnews/ChanceText";
import { toast } from "react-toastify";
import ToastMessage from "../../components/shared/ToastMessage";

// 텍스트 조정 함수
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

// 배경 라디우스
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

// 배경 박스 위치
const boxAreas = {
  SQUARE_1_1: {
    T1_TEXT_ONLY: { x: 230, y: 260, w: 570, h: 450 },
    T2_TEXT_BOTTOM: { x: 120, y: 710, w: 820, h: 300 },
    T3_TEXT_RIGHT: { x: 555, y: 110, w: 430, h: 500 },
  },
  RATIO_2_3: {
    T1_TEXT_ONLY: { x: 210, y: 380, w: 670, h: 400 },
    T2_TEXT_BOTTOM: { x: 180, y: 940, w: 660, h: 400 },
    T3_TEXT_RIGHT: { x: 550, y: 220, w: 450, h: 500 },
  },
  RATIO_3_2: {
    T1_TEXT_ONLY: { x: 250, y: 220, w: 860, h: 420 },
    T2_TEXT_BOTTOM: { x: 290, y: 720, w: 740, h: 350 },
    T3_TEXT_RIGHT: { x: 800, y: 150, w: 450, h: 500 },
  },
};
// 텍스트 위치
const testArea = {
  SQUARE_1_1: {
    T1_TEXT_ONLY: { x: 280, y: [360, 530], w: 550 },
    T2_TEXT_BOTTOM: { x: 160, y: [790, 910], w: 800 },
    T3_TEXT_RIGHT: { x: 590, y: [200, 400], w: 350 },
  },
  RATIO_2_3: {
    T1_TEXT_ONLY: { x: 240, y: [470, 640], w: 600 },
    T2_TEXT_BOTTOM: { x: 220, y: [1030, 1210], w: 650 },
    T3_TEXT_RIGHT: { x: 580, y: [320, 480], w: 450 },
  },
  RATIO_3_2: {
    T1_TEXT_ONLY: { x: 280, y: [300, 490], w: 830 },
    T2_TEXT_BOTTOM: { x: 320, y: [820, 960], w: 600 },
    T3_TEXT_RIGHT: { x: 830, y: [250, 480], w: 420 },
  },
};

function CardNewsResultPage() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const resultImgRef = useRef(null);
  // 이미지 업로드
  const [blob, setBlob] = useState(null);

  const storeUuid = useAuthStore((state) => state.storeUuid);

  const imgData1 = useCardStore((state) => state);
  const generatedText = useTextStore((state) => state.generatedText);

  // 이미지 박스 크기 스타일
  const [box, setBox] = useState("");

  useEffect(() => {
    const imgData = {
      url: imgData1.url,
      text: generatedText,
      ratio: imgData1.ratio,
      template: imgData1.template,
      remainingFreeCount: imgData1.remainingFreeCount,
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 이미지 로드
    const image = new Image();
    image.crossOrigin = "anonymous"; // 크로스 허용
    image.src = `${imgData.url}?not-from-cache-please`; // s3 크로스

    image.onload = async () => {
      // 이미지 렌더링
      // 이미지 크기
      switch (imgData.ratio) {
        case "SQUARE_1_1":
          canvas.width = 1024;
          canvas.height = 1024;
          setBox("");
          ctx.drawImage(image, 0, 0, 1024, 1024);
          break;
        case "RATIO_2_3":
          canvas.width = 1080;
          canvas.height = 1350;
          setBox("ratio23");
          ctx.drawImage(image, 0, 0, 1080, 1350);
          break;
        case "RATIO_3_2":
          canvas.width = 1350;
          canvas.height = 1080;
          setBox("ratio32");
          ctx.drawImage(image, 0, 0, 1350, 1080);
          break;
      }

      const area = boxAreas[imgData.ratio][imgData.template];
      const text = testArea[imgData.ratio][imgData.template];

      const lines = imgData.text.split("\n"); // 텍스트 구분
      // 배경 그리기
      drawRoundedRect(
        ctx,
        area.x,
        area.y,
        area.w,
        area.h,
        60,
        "rgba(255,255,255,0.8)"
      );
      console.log("박스 위치");

      // 텍스트 스타일 설정
      ctx.font = "700 45px Inter";
      ctx.fillStyle = "black";

      // 텍스트 그리기
      lines.forEach((line, i) => {
        drawWrappedText(ctx, line, text.x, text.y[i], text.w, 60);
      });
      // blob 파일 생성
      const data = canvas.toDataURL("image/png");
      resultImgRef.current.src = data;
      const blobData = await (await fetch(data)).blob();
      setBlob(blobData);
    };
  }, []);

  const saveCard = async () => {
    let fileUrl;

    try {
      const getUrl = await getPresignedUrlForCard(storeUuid);
      fileUrl = getUrl.fileUrl;
      const uploadUrl = getUrl.uploadUrl;
      await axios.put(uploadUrl, blob, {
        headers: {
          "Content-Type": "image/png",
        },
      });
    } catch (error) {
      console.log(error);
    }

    try {
      const postImg = await uploadFinalSnsCard({
        storeUuid,
        finalUrl: fileUrl,
      });
      toast(<ToastMessage>"저장이 완료됐습니다.</ToastMessage>, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return postImg;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className={styles.showResult}>
        <div className={styles.topBox}></div>
        <div className={styles.resultBox}>
          <img
            ref={resultImgRef}
            className={`${styles.resultImg} ${styles[box]}`}
          />
          <div className={styles.buttonBox}>
            <ResultButtonButton type="save" onClick={saveCard}>
              저장하기
            </ResultButtonButton>
            <ResultButtonButton
              type="new"
              onClick={() => navigate("/marketing")}
            >
              메인페이지로 돌아가기
            </ResultButtonButton>
          </div>
          <ChanceText chance={imgData1.remainingFreeCount} />
        </div>
      </div>
    </div>
  );
}

export default CardNewsResultPage;
