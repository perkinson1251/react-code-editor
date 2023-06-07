import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

import * as S from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    AnchorHTMLAttributes<HTMLAnchorElement>;

const Button = ({ children, ...rest }: ButtonProps) => {
    const { href, ...buttonProps } = rest;

    if (href) {
        return (
            <S.StyledButton as="a" {...buttonProps} href={href}>
                {children}
            </S.StyledButton>
        );
    }

    return <S.StyledButton {...buttonProps}>{children}</S.StyledButton>;
};

export default Button;
