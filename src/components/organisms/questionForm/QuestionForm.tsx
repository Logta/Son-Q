import styles from "./QuestionForm.module.scss";
import { useState, useContext, useEffect } from "react";
import { Paper, TextField, Button, Box } from "@material-ui/core";
import { Question } from "@/models";
import { QuestionsContext } from "@/contexts";
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
    newQues[id].url = event.target.value;
    setCurrentQuestions([...newQues]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerQuestions(currentQuestions);
    redirect("/projects")(e);
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit}>
        <div className={styles.label}>
          出題するYoutube動画IDを記入してください
        </div>
        {[...Array(nums)].map((_, value) => {
          return (
            <div className={styles.textForm}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="gray"
              >
                https://www.youtube.com/watch?v=
              </Box>
              <Box ml={2}>
                <TextField
                  key={`Label-${+value + 1}`}
                  id="standard-full-width"
                  label={`${+value + 1}題目の動画ID`}
                  placeholder={`${+value + 1}曲目を記入してください。`}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  value={
                    currentQuestions[value] && currentQuestions[value].url
                      ? currentQuestions[value].url
                      : ""
                  }
                  onChange={handleURL(+value)}
                  onBlur={handleURL(+value)}
                  variant="outlined"
                />
              </Box>
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
