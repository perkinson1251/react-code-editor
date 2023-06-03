import { useState, useEffect, useRef, useCallback, memo } from "react";

import * as S from "./styles";

import { IDropdownOption as Option } from "core/types";

interface Props {
    placeholder: string;
    options: Option[];
    onChange: (selectedOption: Option | null) => void;
}

const Dropdown = ({ placeholder, options, onChange }: Props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);

    const handleOptionSelect = useCallback(
        (option: Option) => {
            setSelectedOption(option);
            setIsOpen(false);
            onChange(option);
        },
        [onChange]
    );

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    return (
        <S.DropdownWrapper ref={dropdownRef}>
            <S.DropdownButton isOpen={isOpen} onClick={handleToggle}>
                {selectedOption ? selectedOption.name : placeholder}
            </S.DropdownButton>
            {isOpen && (
                <S.DropdownList>
                    {options.map((option) => (
                        <S.DropdownItem
                            key={option.id}
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option.name}
                        </S.DropdownItem>
                    ))}
                </S.DropdownList>
            )}
        </S.DropdownWrapper>
    );
};

export default memo(Dropdown);
