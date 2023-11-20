import Styles from "./Config.module.css";

const Config = (props) => {
  const { setConfig } = props;

  const handleClick = () => {
    setConfig(true);
  };

  return (
    <div className={Styles.container}>
      <button onClick={handleClick} className={Styles.button}>
        .
      </button>
    </div>
  );
};

export default Config;
