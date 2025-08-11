import styles from "../styles/SearchListBox.module.css";
import listIcon from "../assets/list_icon.png";

function SearchListBox() {
  return (
    <div className="search-list-box">
      <img src={listIcon} className="list-box-ico" />
      <div className="store-info">
        <h1>모퉁이 꽃집</h1>
        <p>
          경기도 용인시 기흥구 기흥역로58번길 78 기흥역더샵오피스텔 201동 112호
        </p>
      </div>
    </div>
  );
}

export default SearchListBox;
