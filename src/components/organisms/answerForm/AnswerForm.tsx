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
} from "@mui/material";
import { Answer, Question, Participant } from "@/models";
import { useRouter } from "next/router";
import { AnswersContext, GlobalContext } from "@/contexts";
import { isNil } from "es-toolkit";
import { AnswerSelector } from "./AnswerSelector";
import { Youtube, Popup } from "@/components/atoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAnswer } from "@/firebase";
import { awaitOnAuth } from "@/firebase";

import HowToVoteIcon from "@mui/icons-material/HowToVote";

type Props = {
  answers: Answer[];
  questionNum: number;
  questions: Question[];
  participants: Participant[];
  isUserJoinProject: boolean;
};

const App = ({ answers, questionNum, questions, participants, isUserJoinProject }: Props) => {
  const { projectId } = useContext(AnswersContext);
  const { darkMode } = useContext(GlobalContext);
  const queryClient = useQueryClient();
  
  const registerAnswersMutation = useMutation({
    mutationFn: async (answersData: Answer[]) => {
      const user = await awaitOnAuth();
      if (!user || !user.ok) throw new Error("認証エラー");
      return registerAnswer(user, answersData, projectId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answers", projectId] });
    },
  });

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
    if (isNil(answers)) return;
    const newQues: Array<Answer> = currentAnswers.map((data) => {
      const findAns: Answer | undefined = getAnswerFromQuestionID(
        data,
        answers
      );
      if (isNil(findAns)) {
        return data;
      } else return { ...findAns, url: data.url };
    });
    setCurrentAnswers([...newQues]);
  };

  const getAnswerFromQuestionID = (
    currentAnswer: Answer,
    answers: Array<Answer>
  ): Answer | undefined => {
    if (isNil(currentAnswer.question_id)) return undefined;
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
    try {
      await registerAnswersMutation.mutateAsync(currentAnswers);
      redirect("/projects")(e);
    } catch (error) {
      console.error("回答の登録に失敗しました:", error);
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
                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Box>
                      <Youtube
                        id={questions[value] ? questions[value].url : ""}
                        endSec={60}
                      />
                      <Box m={-0.5} />
                    </Box>
                  </Box>

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
          <Box display="flex" alignItems="center" justifyContent="center">
            <Popup
              popupLabel="プロジェクトに参加していないため回答ができません"
              popupDisable={isUserJoinProject}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<HowToVoteIcon />}
                disabled={!isUserJoinProject}
              >
                回答
              </Button>
            </Popup>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export { App as AnswerForm };
