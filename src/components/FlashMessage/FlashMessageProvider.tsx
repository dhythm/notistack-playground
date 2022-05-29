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
    // content={(key, message) => (
    //   <SnackbarContent
    //     key={key}
    //     sx={{
    //       backgroundColor:
    //         props.variant === "success"
    //           ? "#3AB795"
    //           : props.variant === "error"
    //           ? "#FF595E"
    //           : props.variant === "info"
    //           ? "#0974E8"
    //           : props.variant === "warning"
    //           ? "#FFCA3A"
    //           : "#000000",
    //     }}
    //     message={<Typography color={"white"}>{message}</Typography>}
    //   />
    // )}
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
    switch ($variant) {
      case "success":
        return css`
          &:hover {
            background-color: #59cbac;
          }
        `;
      case "error":
        return css`
          &:hover {
            background-color: #ff8c8f;
          }
        `;
      case "info":
        return css`
          &:hover {
            background-color: #2d8ef7;
          }
        `;
      case "warning":
        return css`
          &:hover {
            background-color: #ffd86d;
          }
        `;
      default:
        return;
    }
  }}
`;

const StyledSnackbarProvider = styled(SnackbarProvider)`
  margin-top: -2px;
  margin-bottom: -2px;
  &.SnackbarItem-contentRoot {
    min-width: 0px;
    align-content: center;
    flex-wrap: nowrap;
  }
  &.SnackbarItem-lessPadding {
    padding-left: 16px;
  }
  &.SnackbarItem-variantSuccess {
    background-color: #3ab795;
  }
  &.SnackbarItem-variantError {
    background-color: #ff595e;
  }
  &.SnackbarItem-variantInfo {
    background-color: #0974e8;
  }
  &.SnackbarItem-variantWarning {
    background-color: #ffca3a;
  }
`;
