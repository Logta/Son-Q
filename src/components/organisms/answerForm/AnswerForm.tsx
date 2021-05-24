import styles from "./AnswerForm.module.scss";
import { useState, useContext, useEffect } from "react";
import { Paper, Card, CardContent, Button, Box, Grid } from "@material-ui/core";
import { Answer, Question } from "@/models";
import { useRouter } from "next/router";
import { AnswersContext } from "@/contexts";
import _ from "lodash";
import { AnswerSelector } from "./AnswerSelector";
import { Youtube, AnswerFormLabel } from "@/components/atoms";
import { getAnswer } from "@/firebase";

const App = () => {
  const { answers, registerAnswers, questionNum, questions, participants } =
    useContext(AnswersContext);

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
    if (result) redirect("/projects")(e);
    else
      alert(
        "回答の登録/更新に失敗しました\n時間をあけてから再度操作を実行してください"
      );
  };

  return (
    <Paper className={styles.table}>
      <form onSubmit={handleSubmit}>
        {[...Array(questionNum)].map((_, value) => {
          return (
            <div className={styles.backDiv}>
              <Card className={styles.card}>
                <CardContent>
                  <AnswerFormLabel>{value + 1} 曲目</AnswerFormLabel>
                  <Grid container alignItems="center" justify="center">
                    <Grid item>
                      <Grid container alignItems="center" justify="center">
                        <Grid item>
                          <Youtube
                            id={questions[value] ? questions[value].url : ""}
                            endSec={60}
                          />
                          <Box m={-0.5} />
                          <Box m={1} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
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
