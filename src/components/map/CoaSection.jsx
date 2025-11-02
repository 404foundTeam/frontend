import useAuthStore from "../../store/useAuthStore";

function CoaSection({ title, list, Component }) {
  const placeName = useAuthStore((state) => state.placeName);

  return (
    <div>
      <h1>
        <span>{placeName}</span>
        {title}
      </h1>
      <div>
        {list.map((store) => (
          <Component key={store.placeName} store={store} />
        ))}
      </div>
    </div>
  );
}

export default CoaSection;
