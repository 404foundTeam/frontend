import "../styles/MapCoaPage.css";
import img from "../assets/image.png";

function MapCoaPage() {
  return (
    <>
      <div className="coa-header-container">
        <img src={img} />
        <h1 className="banner-title">어웨이 커피</h1>
        <p className="banner-content">
          를 위한 SNS 카드 뉴스를 만들어드릴게요.
        </p>
      </div>
    </>
  );
}

export default MapCoaPage;
