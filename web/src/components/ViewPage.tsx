import QuestionForm from "./QuestionForm";
import { LinkedQuestionContext } from "../context/Provider";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Collapse } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const QuestionView = () => {
  const { getRootQuestions } = useContext(LinkedQuestionContext);
  const navigate = useNavigate();

  const list = getRootQuestions().map((e, i) => {
    return {
      label: `Question ${i + 1}`,
      key: e.questionId,
      children: <QuestionForm id={e.questionId} root={true} />,
    };
  });
  return (
    <>
      <Collapse items={list} />
      <div
        style={{ padding: "5px", cursor: "pointer" }}
        onClick={() => navigate("/add")}
      >
        <PlusCircleFilled color="blue" /> Next Question
      </div>
    </>
  );
};

export default QuestionView;
