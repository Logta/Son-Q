import styles from "./AppBarButton.module.scss";
import { ReactNode } from "react";
import { Button } from "@material-ui/core";

type Props = {
  children: ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const App = (props: Props) => {
  const { onClick, children } = props;
  return (
    <>
      <Button onClick={onClick} className={styles.button} variant="outlined">
        {children}
      </Button>
    </>
  );
};

export { App as AppBarButton };
