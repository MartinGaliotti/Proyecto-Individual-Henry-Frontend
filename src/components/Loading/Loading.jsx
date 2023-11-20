import Style from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={Style.container}>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Loading;
