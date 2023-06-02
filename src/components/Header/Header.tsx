import Dropdown from "components/Dropdown/Dropdown";
import * as S from "./styles";

import { languageOptions } from "core/configs/languageOptions";
import { IDropdownOption } from "core/types";

const Header = () => {
    const handleChange = (option: IDropdownOption | null) => {
        console.log("change", option);
    };

    return (
        <S.StyledHeader>
            <Dropdown
                onChange={handleChange}
                options={languageOptions}
                placeholder="Select language"
            />
        </S.StyledHeader>
    );
};

export default Header;
