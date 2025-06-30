import { Button, Popover, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ReactNode } from "react";
import React from "react";

const StyledPopover = styled(Popover)(({ theme }) => ({
  pointerEvents: "none",
  "& .MuiPaper-root": {
    padding: theme.spacing(1),
  },
}));

type Props = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  popup: string;
  popupDisable?: boolean;
  disabled: boolean;
  startIcon?: ReactNode;
};

const App = (props: Props) => {
  const { onClick, children, popup, popupDisable, disabled, startIcon } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        style={{ display: "inlineBlock" }}
        role="button"
        tabIndex={0}
      >
        <Button onClick={onClick} variant="contained" disabled={disabled} startIcon={startIcon}>
          {children}
        </Button>
      </div>
      <StyledPopover
        id="mouse-over-popover"
        open={open && !popupDisable}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography variant="caption" style={{ fontWeight: "bold" }}>
          {popup}
        </Typography>
      </StyledPopover>
    </>
  );
};

export { App as PopupButton };
