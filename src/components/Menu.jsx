import { NavLink } from "react-router";

const Menu = () => {
  return (
    <div id="menu">
      <nav id="controls">
        <NavLink to="/" end>
          Все котики
        </NavLink>
        <NavLink to="/favourites" end>
          Любимые котики
        </NavLink>
      </nav>
    </div>
  );
};

export default Menu;
