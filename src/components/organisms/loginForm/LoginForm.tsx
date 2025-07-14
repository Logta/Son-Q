import { Button, TextField } from "@son-q/ui-tailwind";
import React from "react";
import { useGlobalStore } from "@/stores";

// カスタムフックを定義（input 要素用の属性を生成する）
// biome-ignore lint/suspicious/noExplicitAny: custom hook return type
function useInput(initValue: string): any {
  const [value, setValue] = React.useState<string>(initValue);
  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };
}

const App = () => {
  const { signInEmail } = useGlobalStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInEmail(email.value, password.value);
  };

  const email = useInput("");
  const password = useInput("");

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          autoFocus
          id="email"
          label="Eメール"
          fullWidth
          type="email"
          {...email}
        />
        <TextField
          variant="outlined"
          id="password"
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
