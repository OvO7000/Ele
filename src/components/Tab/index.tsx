import {FC} from 'react'
import Tabs, {TabsProps} from "./Tabs";
import TabItem, {TabItemProps} from "./TabItem";

type TabsType = FC<TabsProps> & {
    TabItem: FC<TabItemProps>;
}
const _Tabs = Tabs as TabsType
_Tabs.TabItem = TabItem

export default _Tabs
