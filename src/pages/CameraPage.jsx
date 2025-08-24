import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/camera/CameraPage.module.css";
import dragImg from "../assets/camera/drag_img.png";
import { guideFile } from "../api";

function CameraPage() {
  const navigate = useNavigate();

  const imgInput = useRef();
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);

  const handleFile = (file) => {
    console.log("파일", file);
    if (!file) return;

    setData(file);
    const render = new FileReader();
    render.onload = (e) => {
      console.log("이미지", e.target.result);
      setPreview(e.target.result);
    };
    render.readAsDataURL(file);
  };

  const goToResult = async () => {
    try {
      const res = await guideFile(data);
      console.log("성공", res);
    } catch (error) {
      console.log(error);
    }
    // navigate("/camera/result");
  };

  return (
    <>
      <div className={styles.container}>
        {/* onDragOver 드래그 허용 */}
        <div
          className={`${styles.show} ${preview ? styles.select : ""}`}
          onClick={() => {
            imgInput.current.click();
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files[0]);
          }}
        >
          {preview ? (
            <img
              src={preview}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <>
              <img src={dragImg} className={styles.dragImg} />
              드래그해서 가져오기
            </>
          )}
        </div>
        <div className={styles.buttonBox}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={imgInput}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <button
            className={styles.img}
            onClick={() => {
              imgInput.current.click();
            }}
          >
            이미지 불러오기
          </button>
          <button className={styles.finish} onClick={goToResult}>
            완료
          </button>
        </div>
      </div>
    </>
  );
}

export default CameraPage;
