import styles from "./AppBarButton.module.scss";
import { ReactNode } from "react";
import { Button, Popover, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

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
  const classes = useStyles();

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
        <Button
          onClick={onClick}
          variant="contained"
          disabled={disabled}
          startIcon={startIcon}
        >
          {children}
        </Button>
      </div>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
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
      </Popover>
    </>
  );
};

export { App as PopupButton };
