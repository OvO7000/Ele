import {FC} from 'react'
import Menu, {MenuProps} from "./Menu";
import MenuItem, {MenuItemProps} from "./MenuItem";
import SubMenu, {SubMenuProps} from "./SubMenu";

type MenuType = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
}
const _Menu = Menu as MenuType
_Menu.Item = MenuItem
_Menu.SubMenu = SubMenu

export default _Menu
