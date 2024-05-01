import {NavLink} from "react-router-dom";
import css from "./Menu.module.css";
import {mainMenu} from "../MainMenu";

const Menu = () => {
    return (
        <nav className={css.menu}>
            <ul className={css.menuList}>
                {
                    mainMenu.map((item, key) =>
                        <li key={key} className={css.menuItem}>
                            <NavLink to={item.link} className={({isActive}) => isActive ? css.menuActive : css.menuNormal}>
                                {item.name}
                            </NavLink>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}

export default Menu
