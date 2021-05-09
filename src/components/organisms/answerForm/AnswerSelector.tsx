import styles from "./AnswerForm.module.scss";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { Participant } from "@/models";

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
              <FormControlLabel
                value={participant.user_id}
                control={<Radio />}
                label={participant.user_name}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export { App as AnswerSelector };
