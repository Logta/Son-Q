import styles from "./QuestionForm.module.scss";
import { useState, useContext, useEffect } from "react";
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@material-ui/core";
import { Question } from "@/models";
import { QuestionsContext, GlobalContext } from "@/contexts";
import { useRouter } from "next/router";
import _ from "lodash";

type Props = {
  questions: Array<Question>;
  nums: number;
};

const App = ({ questions, nums }: Props) => {
  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  const [currentQuestions, setCurrentQuestions] = useState<Array<Question>>(
    [...Array(nums)].map((_, index) => {
      return { ID: "", no: index, url: "", select_user_id: "" };
    })
  );
  const { registerQuestions } = useContext(QuestionsContext);
  const { errorMessage } = useContext(GlobalContext);

  const handleSetPropsQuestions = async () => {
    const newQues: Array<Question> = currentQuestions.map((data, index) => {
      return questions && questions[index] ? questions[index] : data;
    });
    setCurrentQuestions([...newQues]);
  };
  useEffect(() => {
    handleSetPropsQuestions();
  }, []);

  const handleURL = (id: number) => (event: any) => {
    const newQues = currentQuestions.slice();
    var regex = /.*\?.*|.*\=.*|.*\/.*|.*\\.*|.*\:.*|.*\&.*/;

    if (regex.test(event.target.value)) {
      errorMessage("不正な入力があります。");
      return;
    }
    newQues[id].url = event.target.value;
    setCurrentQuestions([...newQues]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerQuestions(currentQuestions);
    if (result) redirect("/projects")(e);
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        {[...Array(nums)].map((_, value) => {
          return (
            <div className={styles.textForm}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-amount">
                  {`${+value + 1}題目：`}
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={
                    currentQuestions[value] && currentQuestions[value].url
                      ? currentQuestions[value].url
                      : ""
                  }
                  onChange={handleURL(+value)}
                  onBlur={handleURL(+value)}
                  startAdornment={
                    <InputAdornment position="start">
                      https://www.youtube.com/watch?v=
                    </InputAdornment>
                  }
                  labelWidth={60}
                />
              </FormControl>
            </div>
          );
        })}
        <div className={styles.button}>
          <Button type="submit" variant="contained" color="primary">
            登録
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export { App as QuestionForm };
