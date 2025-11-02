import styles from "../../styles/map/CoaMapList.module.css";

function CoaMapList({ key, placeName, roadAddress, onClick }, ref) {
  return (
    <>
      <div className={styles.container} ref={ref} key={key} onClick={onClick}>
        <h2 className={styles.name}>{placeName}</h2>
        <p className={styles.addr}>{roadAddress}</p>
      </div>
    </>
  );
}

export default CoaMapList;
