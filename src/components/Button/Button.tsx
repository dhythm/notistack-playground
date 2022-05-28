import { Button as MuiButton } from "@mui/material";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof MuiButton>;

export const Button: FC<Props> = ({ variant = "contained", ...props }) => (
  <MuiButton variant={variant} {...props} />
);
