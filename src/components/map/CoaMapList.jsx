import styles from "../../styles/map/CoaMapList.module.css";

function CoaMapList({ key, placeName, roadAddress, onClick, isSelected }) {
  return (
    <>
      <div
        className={`${styles.container} ${isSelected ? styles.select : ""}`}
        onClick={onClick}
      >
        <h2 className={styles.name}>{placeName}</h2>
        <p className={styles.addr}>{roadAddress}</p>
      </div>
    </>
  );
}

export default CoaMapList;
