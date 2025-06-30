import styles from "./QuestionForm.module.scss";
import { useState, useContext, useEffect } from "react";
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import type { Question, Participant } from "@son-q/types";
import { Popup } from "@son-q/ui";
import { QuestionsContext, GlobalContext } from "@/contexts";
import { useRouter } from "next/router";
import { useRegisterQuestions, useParticipants } from "@son-q/queries";
import { authApi } from "@son-q/api";
import { useQuery } from "@tanstack/react-query";

import CreateIcon from "@mui/icons-material/Create";

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
  const { projectId } = useContext(QuestionsContext);
  const { errorMessage } = useContext(GlobalContext);
  
  // カスタムフックを使用
  const registerQuestionsMutation = useRegisterQuestions();
  const { data: participants = [] } = useParticipants(projectId);
  
  // 現在のユーザー情報を取得
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authApi.getCurrentUser(),
  });

  // 現在のユーザーが参加者リストに含まれているかをチェック
  const isUserJoinProject = Boolean(
    currentUser && 
    participants && 
    participants.length > 0 && 
    participants.some(p => p.user_id === currentUser.id)
  );


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isUserJoinProject) {
      return;
    }
    
    if (!currentUser) {
      errorMessage("ユーザー情報の取得に失敗しました");
      return;
    }
    
    try {
      // select_user_idを現在のユーザーIDに設定し、空のURLを除外
      const questionsWithUserId = currentQuestions
        .filter(q => q.url && q.url.trim() !== "") // 空のURLを除外
        .map(q => ({
          ...q,
          select_user_id: currentUser.id
        }));
      
      if (questionsWithUserId.length === 0) {
        errorMessage("少なくとも1つの問題を入力してください");
        return;
      }
      
      const result = await registerQuestionsMutation.mutateAsync({
        projectId,
        questions: questionsWithUserId
      });
      redirect("/projects")(e);
    } catch (error) {
      console.error("問題の登録に失敗しました:", error);
      errorMessage("問題の登録に失敗しました");
    }
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
          <Popup
            popupLabel="プロジェクトに参加していないため登録ができません"
            popupDisable={isUserJoinProject}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<CreateIcon />}
              disabled={!isUserJoinProject}
            >
              登録
            </Button>
          </Popup>
        </div>
      </form>
    </Paper>
  );
};

export { App as QuestionForm };
