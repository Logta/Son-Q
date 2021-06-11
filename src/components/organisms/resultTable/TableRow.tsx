import { TableRow, TableCell, Chip } from "@material-ui/core";
import { ResultsContext, GlobalContext } from "@/contexts";
import { useContext } from "react";
import { YoutubeAnswer } from "@/components/atoms";
import { getQuestioner, getRespondent } from "@/utils";
import _ from "lodash";

const App = () => {
  const { participants, answers, questions } = useContext(ResultsContext);
  const { darkMode } = useContext(GlobalContext);

  return (
    <>
      {questions.map((ques, index) => {
        return (
          <TableRow key={`${ques.ID}-result`}>
            <TableCell
              key={`${ques.ID}-result-partName`}
              component="th"
              scope="row"
              align="center"
              style={{ fontWeight: "bold" }}
            >
              {index + 1}
            </TableCell>
            <TableCell
              key={`${ques.ID}-result-partName`}
              component="th"
              scope="row"
              align="center"
              style={{
                fontWeight: "bold",
                borderLeftWidth: "1px",
                borderLeftStyle: "solid",
                borderLeftColor: "lightGray",
              }}
            >
              {getQuestioner(participants, ques)}
            </TableCell>
            <TableCell
              key={`${ques.ID}-result-partName-youtube`}
              component="th"
              scope="row"
              align="center"
              style={{
                borderLeftWidth: "2px",
                borderLeftStyle: "dotted",
                borderLeftColor: "lightGray",
              }}
            >
              <YoutubeAnswer id={ques.url} />
            </TableCell>
            {participants.map((part) => {
              return (
                <>
                  <TableCell
                    align="center"
                    style={{
                      width: "5em",
                      minWidth: "5em",
                      borderLeftWidth: "3px",
                      borderLeftStyle: "solid",
                      borderLeftColor: "lightGray",
                    }}
                    key={`${part.user_id}-${ques.ID}-result-mark`}
                  >
                    {getQuestioner(participants, ques) ===
                    getRespondent(part, participants, ques, answers) ? (
                      <Chip
                        label="〇"
                        color="secondary"
                        variant={darkMode ? "default" : "outlined"}
                      />
                    ) : (
                      <Chip
                        label="×"
                        color="primary"
                        variant={darkMode ? "default" : "outlined"}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    key={`${part.user_id}-${ques.ID}-result`}
                    align="center"
                    style={{
                      borderLeftWidth: "2px",
                      borderLeftStyle: "dotted",
                      borderLeftColor: "lightGray",
                      width: `calc(90% / ${participants.length})`,
                    }}
                  >
                    {getRespondent(part, participants, ques, answers)}
                  </TableCell>
                </>
              );
            })}
          </TableRow>
        );
      })}
    </>
  );
};

export { App as TableRow };
