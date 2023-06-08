import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={style.container}>
      <div className={style.links}>
        <Link to="/dogs" className={style.btnPrimary}>
          Dogs
        </Link>
        <Link to="/createdogs" className={style.btnPrimary}>
          Create A Dog
        </Link>
        <Link to="/modify" className={style.btnPrimary}>
          Modify Dog
        </Link>
        <Link to="/" className={style.btnPrimary}>
          Landing
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
