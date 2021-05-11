import styles from "./AnswerForm.module.scss";
import { useState, useContext, useEffect } from "react";
import {
  Paper,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { Answer } from "@/models";
import { useRouter } from "next/router";
import { AnswersContext } from "@/contexts";
import _ from "lodash";
import { AnswerSelector } from "./AnswerSelector";
import { Youtube } from "@/components/atoms";

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
          }
        : {
            ID: "",
            no: index,
            select_user_id: "",
            guess_user_id: "",
            answer_user_id: "",
            url: "",
          };
    })
  );

  const handleSetPropsAnswers = async () => {
    const newQues: Array<Answer> = currentAnswers.map((data, index) => {
      return answers && answers[index] ? answers[index] : data;
    });
    setCurrentAnswers([...newQues]);
  };
  useEffect(() => {
    handleSetPropsAnswers();
  }, []);

  const handleSelector = (id: number) => (value: string) => {
    const newQues = currentAnswers.slice();
    newQues[id].guess_user_id = value;
    setCurrentAnswers([...newQues]);
    console.log(currentAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerAnswers(currentAnswers);
    redirect("/projects")(e);
  };

  return (
    <Paper style={{ backgroundColor: "#E3F2FD" }}>
      <form onSubmit={handleSubmit}>
        {[...Array(questionNum)].map((_, value) => {
          return (
            <div className={styles.card}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {value + 1} 曲目
                  </Typography>
                  <Box m={2}>
                    <Paper style={{ backgroundColor: "#F5F5F5" }}>
                      <Grid container alignItems="center" justify="center">
                        <Grid item>
                          <Youtube
                            id={questions[value] ? questions[value].url : ""}
                            endSec={60}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Box>
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
