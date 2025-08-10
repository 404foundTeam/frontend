import "../styles/SideBar.css";
import main from "../assets/sidebar/main.png";
import picture from "../assets/sidebar/picture.png";
import carnews from "../assets/sidebar/carnews.png";
import map from "../assets/sidebar/map.png";

function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-box main">
        <img src={main} className="sidebar-img main" />
        <p className="sidebar-text">메인페이지</p>
      </div>
      <div className="sidebar-box picture">
        <img src={picture} className="sidebar-img picture" />
        <p className="sidebar-text">사진 가이드</p>
      </div>
      <div className="sidebar-box cardnews">
        <img src={carnews} className="sidebar-img cardnews" />
        <p className="sidebar-text">카드 뉴스 생성</p>
      </div>
      <div className="sidebar-box usemap">
        <img src={map} className="sidebar-img map" />
        <p className="sidebar-text">지도 이용 제휴</p>
      </div>
    </div>
  );
}

export default SideBar;
