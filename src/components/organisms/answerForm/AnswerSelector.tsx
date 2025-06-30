import styles from "./AnswerForm.module.scss";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";
import type { Participant } from "@son-q/types";

type Props = {
  value: string;
  setValue: Function;
  participants: Array<Participant>;
  index: number;
};

const App = (props: Props) => {
  const { value, setValue, participants, index } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <>
      <FormControl component="fieldset" key={`${index}-radio`}>
        <RadioGroup
          aria-label={`${index}曲目`}
          name={`${index}曲目`}
          value={value}
          onChange={handleChange}
        >
          {participants.map((participant) => {
            return (
              <Box my={-0.25}>
                <FormControlLabel
                  className={styles.formControl}
                  value={participant.user_id}
                  control={<Radio size="small" />}
                  label={participant.user_name}
                />
              </Box>
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export { App as AnswerSelector };
