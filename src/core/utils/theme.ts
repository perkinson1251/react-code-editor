import themes from "core/configs/themes.json";
import { IDropdownOption } from "core/types";

function getThemeOptions(): IDropdownOption[] {
    return Object.entries(themes).map(([key, value]) => ({
        id: value.id,
        name: value.name,
        value: value.value,
    }));
}

export function getThemeName(value: string): string {
    const theme = themes.find((theme) => theme.value === value);
    return theme ? theme.name : "";
}

export default getThemeOptions;
