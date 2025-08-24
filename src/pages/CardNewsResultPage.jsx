import { useEffect, useRef, useState } from "react";
import styles from "../styles/cardnews/CardNewsResultPage.module.css";
import useTextStore from "../store/useTextStore";
import useCardStore from "../store/useCardStore";
import useUuidStore from "../store/useUuidStore";
import { postCard, postPresignedUrl } from "../api";
import axios from "axios";
import Ex1 from "../assets/test/image08.png";

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

const boxAreas = {
  SQUARE_1_1: {
    T1_TEXT_ONLY: { x: 230, y: 260, w: 570, h: 450 },
    T2_TEXT_BOTTOM: { x: 120, y: 710, w: 820, h: 300 },
    T3_TEXT_RIGHT: { x: 555, y: 110, w: 430, h: 500 },
  },
  RATIO_2_3: {
    T1_TEXT_ONLY: { x: 210, y: 380, w: 670, h: 400 },
    T2_TEXT_BOTTOM: { x: 180, y: 940, w: 650, h: 400 },
    T3_TEXT_RIGHT: { x: 550, y: 220, w: 450, h: 500 },
  },
  RATIO_3_2: {
    T1_TEXT_ONLY: { x: 250, y: 220, w: 860, h: 420 },
    T2_TEXT_BOTTOM: { x: 290, y: 720, w: 720, h: 350 },
    T3_TEXT_RIGHT: { x: 800, y: 150, w: 450, h: 500 },
  },
};

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
  const storeUuid = useUuidStore((state) => state.storeUuid);
  console.log("여긴 결과 페이지");
  console.log("uuid 확인", storeUuid);

  const imgData1 = useCardStore((state) => state);
  console.log("이미지 스토어 데이터 확인 :", imgData1);
  const generatedText = useTextStore((state) => state.generatedText);
  console.log("텍스트 스토어 데이터 확인 :", generatedText);

  // 이미지 박스 크기 스타일
  const [box, setBox] = useState("");

  const canvasRef = useRef(null);
  const resultImgRef = useRef(null);
  const [blob, setBlob] = useState(null);

  useEffect(() => {
    console.log("이미지 데이터 가져오기");
    // const imgData = {
    //   url: Ex1,
    //   text: "추석 연휴에도 정상 영업합니다.\n 가족과 함께 특별한 시간을 보내세요!",
    //   ratio: "RATIO_3_2", // SQUARE_1_1, RATIO_2_3, RATIO_3_2
    //   template: "T3_TEXT_RIGHT", //  T1_TEXT_ONLY, T2_TEXT_BOTTOM, T3_TEXT_RIGHT
    //   // remainingFreeCount: imgData1.remainingFreeCount,
    // };
    const imgData = {
      url: imgData1.url,
      text: generatedText,
      ratio: imgData1.ratio, // SQUARE_1_1, RATIO_2_3, RATIO_3_2
      template: imgData1.template, //  T1_TEXT_ONLY, T2_TEXT_BOTTOM, T3_TEXT_RIGHT
      remainingFreeCount: imgData1.remainingFreeCount,
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 이미지 로드
    console.log("이미지 로드");
    const image = new Image();
    image.crossOrigin = "anonymous"; // 크로스 허용
    image.src = imgData.url; // 이미지 경로를 설정하세요.
    image.src = `${imgData.url}?not-from-cache-please`; // s3 크로스 shit

    console.log("이미지 렌더리 주웅...");
    image.onload = async () => {
      // 이미지 렌더링
      switch (imgData.ratio) {
        case "SQUARE_1_1":
          // 이미지 크기
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
      console.log("비율 적용 완료");

      const area = boxAreas[imgData.ratio][imgData.template];
      const text = testArea[imgData.ratio][imgData.template];
      console.log("텍스트/박스 위치 선정");

      const lines = imgData.text.split("\n");
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
      console.log("텍스트 위치");

      console.log("blob 파일 시작");
      const data = canvas.toDataURL("image/png");
      console.log(data);
      resultImgRef.current.src = data;
      const blobData = await (await fetch(data)).blob();
      console.log("blob 파일 완료");
      setBlob(blobData);
    };
  }, []);

  const saveCard = async () => {
    console.log("이미지 저장하기 시작");
    let fileUrl;

    try {
      const getUrl = await postPresignedUrl(storeUuid);
      console.log("url들 가져오기");
      console.log(getUrl);
      fileUrl = getUrl.fileUrl;
      const uploadUrl = getUrl.uploadUrl;
      console.log("url 확인", fileUrl, uploadUrl);
      // alert("저장이 완료됐습니다.");
      console.log("업로드 시작");
      await axios.put(uploadUrl, blob, {
        headers: {
          "Content-Type": "image/png",
        },
      });
      console.log("업로드 완료", fileUrl);
    } catch (error) {
      console.log(error);
    }

    try {
      console.log("서버로~~~~~~~");
      console.log("파일 url", fileUrl);
      const postImg = await postCard({ storeUuid, finalUrl: fileUrl });
      console.log("성 공");
      console.log(postImg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {/* <Loading /> */}
      <div className={styles.showResult}>
        <div className={styles.topBox}></div>
        <div className={styles.resultBox}>
          <img
            ref={resultImgRef}
            className={`${styles.resultImg} ${styles[box]}`}
          />
          <div className={styles.buttonBox}>
            <button className={styles.save} onClick={saveCard}>
              저장하기
            </button>
            <button className={styles.new}>홍보페이지로 돌아가기</button>
            <button className={styles.back}>새로 만들기</button>
          </div>
          <p className={styles.chance}>
            이번 달 무료 횟수 <span>{imgData1.remainingFreeCount}회</span>
            남았어요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardNewsResultPage;
