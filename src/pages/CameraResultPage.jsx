import Loading from "../components/Loading";
import "../styles/CameraResultPage.css";
import img from "../assets/ex1.png";

function CameraResultPage() {
  return (
    <>
      {/* <Loading isCamera={true} /> */}
      <div className="camera-result-container">
        <img src={img} />
        <div className="guide-box">
          <h2>
            <span>AI</span>가 분석해준 촬영 가이드 결과입니다.
          </h2>
          <div>
            창가 쪽에서 안쪽으로 찍으면 자연광이 인물과 공간을 부드럽게
            비춥니다. 역광보다는 측광·순광이 좋아요. 나무, 초록 식물, 따뜻한
            조명이 있으면 사진 분위기가 한층 좋아질거에요. 가로사진은 3:2 비율,
            세로사진은 4:5 비율이 SNS에서 가장 반응이 좋아요. 오전 10시~오후 3시
            사이가 가장 자연광이 예쁘게 들어오는 시간이기 때문에 이 시간대에
            사진을 촬영하는 것을 추천해요.
          </div>
          <p>
            이번 달 무료 횟수 <span>1회</span> 남았어요.
          </p>
        </div>
      </div>
    </>
  );
}

export default CameraResultPage;
