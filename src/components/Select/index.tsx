import {FC} from 'react'
import Select, {SelectProps} from "./Select";
import Option, {OptionProps} from "./Option";

type SelectType = FC<SelectProps> & {
    Option: FC<OptionProps>;
}
const _Select = Select as SelectType
_Select.Option = Option

export default _Select
