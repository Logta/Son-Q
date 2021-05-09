import styles from "./ProjectTable.module.scss";
import React from "react";
import { Button, TextField } from "@material-ui/core";
import { GlobalContext } from "@/contexts";
import { useContext } from "react";

// カスタムフックを定義（input 要素用の属性を生成する）
function useInput(initValue: string): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
  };
}

const App = () => {
  const { signInEmail } = useContext(GlobalContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInEmail({ email: email.value, password: password.value });
  };

  const email = useInput("");
  const password = useInput("");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="name"
          label="Eメール"
          fullWidth
          type="email"
          {...email}
        />
        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="name"
          label="パスワード"
          fullWidth
          type="password"
          {...password}
        />
        <Button type="submit" color="primary">
          ログイン
        </Button>
      </form>
    </div>
  );
};

export { App as LoginForm };
