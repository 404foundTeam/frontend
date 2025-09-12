import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { guideFile } from "../../api";
import dragImg from "../../assets/camera/drag_img.png";
import styles from "../../styles/camera/CameraPage.module.css";
import useGuideStore from "../../store/useGuideStore";
import Loading from "../../components/Loading";
import CameraBanner from "../../components/camera/CameraBanner";
import Error from "../../components/Error";
import CameraButton from "../../components/camera/CameraButton";

function CameraPage() {
  const navigate = useNavigate();
  const setGuide = useGuideStore((state) => state.setGuide);

  const imgInput = useRef();
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState(false);

  const handleFile = (file) => {
    if (!file) return;

    setData(file);
    const render = new FileReader();
    render.onload = (e) => {
      setPreview(e.target.result);
    };
    render.readAsDataURL(file);
  };

  const goToResult = async () => {
    if (!data) {
      alert("이미지를 업로드 해주세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await guideFile(data);
      setGuide({ guideImg: preview, guideText: res.guideText });
      navigate("/camera/result");
    } catch (error) {
      setFail(true);
      console.log(error);
    }
  };

  if (loading) return <Loading isCamera={true} />;
  if (fail) return <Error />;

  return (
    <>
      <CameraBanner isShow={true} />
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
          <CameraButton
            label="img"
            onClick={() => {
              imgInput.current.click();
            }}
          >
            이미지 불러오기
          </CameraButton>
          <CameraButton label="finish" onClick={goToResult}>
            완료
          </CameraButton>
        </div>
      </div>
    </>
  );
}

export default CameraPage;
