import styles from "./Popup.module.scss";
import { ReactNode } from "react";
import { Popover, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const StyledPopover = styled(Popover)(({ theme }) => ({
  pointerEvents: "none",
  '& .MuiPaper-root': {
    padding: theme.spacing(1),
  },
}));

type Props = {
  children: ReactNode;
  popupLabel: string;
  popupDisable?: boolean;
};

const App = (props: Props) => {
  const { children, popupLabel, popupDisable } = props;

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
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
      >
        {children}
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
          {popupLabel}
        </Typography>
      </StyledPopover>
    </>
  );
};

export { App as Popup };
