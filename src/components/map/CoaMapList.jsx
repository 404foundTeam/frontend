import styles from "../../styles/map/CoaMapList.module.css";

function CoaMapList({ key, placeName, roadAddress }) {
  return (
    <>
      <div className={styles.container} key={key}>
        <h2 className={styles.name}>{placeName}</h2>
        <p className={styles.addr}>{roadAddress}</p>
      </div>
    </>
  );
}

export default CoaMapList;
