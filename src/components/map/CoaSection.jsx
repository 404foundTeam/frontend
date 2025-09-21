import useUuidStore from "../../store/useUuidStore";

function CoaSection({ title, list, Component }) {
  const storeName = useUuidStore((state) => state.storeName);

  return (
    <div>
      <h1>
        <span>{storeName}</span>
        {title}
      </h1>
      <div>
        {list.map((store) => (
          <Component key={store.storeName} store={store} />
        ))}
      </div>
    </div>
  );
}

export default CoaSection;
