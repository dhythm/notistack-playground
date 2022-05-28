import styled from "@emotion/styled";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { css, IconButton } from "@mui/material";
import { SnackbarProvider, useSnackbar, VariantType } from "notistack";
import { ComponentProps, FC, useCallback } from "react";

export const FlashMessageProvider: FC<
  ComponentProps<typeof SnackbarProvider>
> = ({ children, ...props }) => (
  <StyledSnackbarProvider
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    autoHideDuration={3000}
    maxSnack={5}
    iconVariant={{
      success: <StyledCheckCircleOutlineIcon />,
      error: <StyledErrorOutlineIcon />,
      warning: null,
      info: null,
    }}
    {...props}
  >
    {children}
  </StyledSnackbarProvider>
);

type EnqueueSnackbarParameters = Parameters<
  ReturnType<typeof useSnackbar>["enqueueSnackbar"]
>;

export const useFlashMessage = () => {
  const { enqueueSnackbar, closeSnackbar: closeFlashMessage } = useSnackbar();

  const openFlashMessage = useCallback<
    (
      message: EnqueueSnackbarParameters[0],
      options?: EnqueueSnackbarParameters[1] & { closable?: boolean }
    ) => ReturnType<typeof enqueueSnackbar>
  >(
    (message, options) => {
      const {
        closable,
        variant = undefined,
        ...rest
      } = {
        closable: true,
        ...options,
      };
      return enqueueSnackbar(message, {
        variant,
        ...rest,
        ...(closable
          ? {
              action: function Action(key) {
                return (
                  <StyledIconButton
                    $variant={variant}
                    data-testid="FlashMessageCloseIconButton"
                    onClick={() => closeFlashMessage(key)}
                  >
                    <CloseIcon />
                  </StyledIconButton>
                );
              },
            }
          : {}),
      });
    },
    [closeFlashMessage, enqueueSnackbar]
  );

  return { openFlashMessage, closeFlashMessage };
};

const StyledCheckCircleOutlineIcon = styled(CheckCircleOutlineIcon)`
  margin-right: 8px;
`;

const StyledErrorOutlineIcon = styled(ErrorOutlineIcon)`
  margin-right: 8px;
`;

const StyledIconButton = styled(IconButton)<{ $variant?: VariantType }>`
  height: 26px;
  width: 26px;
  color: white;
  ${({ $variant }) => {
    if ($variant === "success" || $variant === "error") {
      const color = $variant === "success" ? "green" : "red";
      return css`
        &:hover {
          background-color: ${color};
        }
      `;
    }
    return "";
  }}
`;

const StyledSnackbarProvider = styled(SnackbarProvider)`
  & .MuiSnackbarContent-action {
    padding-left: 10px;
  }
`;
