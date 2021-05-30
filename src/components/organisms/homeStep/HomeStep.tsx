import styles from "./HomeStep.module.scss";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

type Props = {
  index: number;
  text: string;
  mediaUrl: string;
  mediaAlt: string;
  height: number;
};

const App = (props: Props) => {
  const { index, text, mediaUrl, mediaAlt, height } = props;

  return (
    <Card>
      <CardHeader title={`${index} STEP`} className={styles.header} />
      <CardMedia
        component="img"
        alt={mediaAlt}
        height={height}
        image={mediaUrl}
        title={mediaAlt}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { App as HomeStep };
