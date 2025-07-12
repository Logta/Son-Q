import { Card, CardContent, CardHeader, CardMedia, Typography } from "@son-q/ui-tailwind";
import styles from "./HomeStep.module.scss";

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
    <Card className="mx-2 shadow-md">
      <CardHeader title={`${index} STEP`} className={styles.header} />
      <CardMedia height={height} image={mediaUrl} title={mediaAlt} />
      <CardContent className="px-6 py-4">
        <Typography variant="body2" component="p" className="leading-relaxed">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

export { App as HomeStep };
