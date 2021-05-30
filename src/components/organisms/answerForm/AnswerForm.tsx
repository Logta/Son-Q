import styles from "./AnswerForm.module.scss";
import { useState, useContext, useEffect } from "react";
import {
  Paper,
  Card,
  CardHeader,
  CardContent,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import { Answer } from "@/models";
import { useRouter } from "next/router";
import { AnswersContext, GlobalContext } from "@/contexts";
import _ from "lodash";
import { AnswerSelector } from "./AnswerSelector";
import { Youtube } from "@/components/atoms";

const App = () => {
  const { answers, registerAnswers, questionNum, questions, participants } =
    useContext(AnswersContext);
  const { darkMode } = useContext(GlobalContext);

  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  const [currentAnswers, setCurrentAnswers] = useState<Array<Answer>>(
    [...Array(questionNum)].map((_, index) => {
      return questions[index]
        ? {
            ID: "",
            no: index,
            select_user_id: questions[index].select_user_id,
            guess_user_id: "",
            answer_user_id: "",
            url: questions[index].url,
            question_id: questions[index].ID,
          }
        : {
            ID: "",
            no: index,
            select_user_id: "",
            guess_user_id: "",
            answer_user_id: "",
            url: "",
            question_id: "",
          };
    })
  );

  const handleSetPropsAnswers = async () => {
    if (_.isNil(answers)) return;
    const newQues: Array<Answer> = currentAnswers.map((data) => {
      const findAns: Answer | undefined = getAnswerFromQuestionID(
        data,
        answers
      );
      if (_.isNil(findAns)) {
        return data;
      } else return { ...findAns, url: data.url };
    });
    setCurrentAnswers([...newQues]);
  };

  const getAnswerFromQuestionID = (
    currentAnswer: Answer,
    answers: Array<Answer>
  ): Answer | undefined => {
    if (_.isNil(currentAnswer.question_id)) return undefined;
    return answers.find((a) => a.question_id === currentAnswer.question_id);
  };

  useEffect(() => {
    handleSetPropsAnswers();
  }, []);

  const handleSelector = (id: number) => (value: string) => {
    const newQues = currentAnswers.slice();
    newQues[id].guess_user_id = value;
    setCurrentAnswers([...newQues]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerAnswers(currentAnswers);
    if (result) {
      redirect("/projects")(e);
    }
  };

  return (
    <Paper className={styles.table}>
      <form onSubmit={handleSubmit}>
        {[...Array(questionNum)].map((_, value) => {
          return (
            <div className={styles.backDiv}>
              <Card variant="outlined">
                <CardHeader
                  subheader={`${value + 1} 曲目`}
                  className={
                    darkMode ? styles.darkSubheader : styles.lightSubheader
                  }
                />
                <CardContent>
                  <Grid container alignItems="center" justify="center">
                    <Grid item>
                      <Grid container alignItems="center" justify="center">
                        <Grid item>
                          <Youtube
                            id={questions[value] ? questions[value].url : ""}
                            endSec={60}
                          />
                          <Box m={-0.5} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box mt={0.5} mb={-1}>
                    <AnswerSelector
                      key={`Label-${+value + 1}`}
                      index={value}
                      participants={participants}
                      value={
                        currentAnswers[value] &&
                        currentAnswers[value].guess_user_id
                          ? currentAnswers[value].guess_user_id
                          : ""
                      }
                      setValue={handleSelector(+value)}
                    />
                  </Box>
                </CardContent>
              </Card>
            </div>
          );
        })}
        <Box m={5} p={2}>
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                回答
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Paper>
  );
};

export { App as AnswerForm };
