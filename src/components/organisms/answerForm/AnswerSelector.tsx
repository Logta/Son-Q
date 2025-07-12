import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from "@son-q/ui-tailwind";
import type { Participant } from "@son-q/types";
import styles from "./AnswerForm.module.scss";

type Props = {
  value: string;
  setValue: (value: string) => void;
  participants: Array<Participant>;
  index: number;
};

const App = (props: Props) => {
  const { value, setValue, participants, index } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <FormControl key={`${index}-radio`}>
      <RadioGroup
        aria-label={`${index}曲目`}
        name={`${index}曲目`}
        value={value}
        onValueChange={setValue}
      >
        {participants.map((participant) => {
          return (
            <Box key={participant.user_id} className="my-1">
              <FormControlLabel
                className={styles.formControl}
                value={participant.user_id}
                control={<Radio value={participant.user_id} />}
                label={participant.user_name}
              />
            </Box>
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export { App as AnswerSelector };
