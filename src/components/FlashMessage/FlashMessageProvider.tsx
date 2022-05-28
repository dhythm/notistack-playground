import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { SnackbarProvider, useSnackbar } from "notistack";
import { ComponentProps, FC, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";

export const FlashMessageProvider: FC<
  ComponentProps<typeof SnackbarProvider>
> = ({ children, ...props }) => (
  <StyledSnackbarProvider
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    autoHideDuration={3000}
    maxSnack={5}
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
      const { closable, ...rest } = {
        closable: true,
        variant: undefined,
        ...options,
      };
      return enqueueSnackbar(message, {
        ...rest,
        ...(closable
          ? {
              action: function Action(key) {
                return (
                  <IconButton
                    data-testid="FlashMessageCloseIconButton"
                    onClick={() => closeFlashMessage(key)}
                  >
                    <CloseIcon />
                  </IconButton>
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

const StyledSnackbarProvider = styled(SnackbarProvider)`
  & .MuiSnackbarContent-action {
    padding-left: 10px;
  }
`;
