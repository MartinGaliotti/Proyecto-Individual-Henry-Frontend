import Styles from "./MainNav.module.css";
import SearchBar from "../SearchBar/SearchBar";
import BackToLanding from "../BackToLanding/BackToLanding";
import Config from "../Config/Config";

const MainNav = (props) => {
  const { setReload, setConfig } = props;

  return (
    <div className={Styles.container}>
      <BackToLanding className={Styles.back} />
      <SearchBar className={Styles.search} setReload={setReload} />
      <Config className={Styles.config} setConfig={setConfig} />
    </div>
  );
};

export default MainNav;
