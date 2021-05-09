import styles from "./AnswerForm.module.scss";
import { useState, useContext, useEffect } from "react";
import {
  Paper,
  Card,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";
import { Answer } from "@/models";
import { useRouter } from "next/router";
import { AnswersContext } from "@/contexts";
import _ from "lodash";
import { AnswerSelector } from "./AnswerSelector";
import { Youtube } from "@/components/atoms";

const App = () => {
  const {
    answers,
    registerAnswers,
    questionNum,
    questions,
    participants,
  } = useContext(AnswersContext);

  const router = useRouter();

  const redirect = (href: string) => (e: any) => {
    e.preventDefault();
    router.push(href);
  };

  const [currentAnswers, setCurrentAnswers] = useState<Array<Answer>>(
    [...Array(questionNum)].map((_, index) => {
      return {
        ID: "",
        no: index,
        select_user_id: questions[index].select_user_id,
        guess_user_id: "",
        answer_user_id: "",
        url: questions[index].url,
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
    <Paper>
      <form onSubmit={handleSubmit}>
        {[...Array(questionNum)].map((_, value) => {
          return (
            <div className={styles.card}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {value + 1} 曲目
                  </Typography>
                  <div>
                    <Youtube
                      id={questions[value] ? questions[value].url : ""}
                      endSec={60}
                    />
                  </div>
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
        <div className={styles.button}>
          <Button type="submit" variant="contained" color="primary">
            回答
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export { App as AnswerForm };
