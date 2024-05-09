import { createContext, useEffect, useState } from "react";
import { fetchQuestionAndOptions } from "../shared/api";

export interface options {
  optionId: string;
  optionValue: string;
  questionId: string;
}

export interface Questions {
  questionId: string;
  question: string;
  answerType: "dropdown" | "text";
  linked: 0 | 1;
  isDefault: 0 | 1;
  leadFrom: string | null;
}

interface contextTypes {
  questions: Questions[] | [];
  options: options[] | [];
  getRootQuestions: () => [] | Questions[];
  getQuestionById: (id: string) => Questions | undefined;
  getOptionsFromId: (id: string) => options[] | undefined;
  getChildQuestionByOptionId: (id: string) => Questions | undefined;
  updateOption: (data: Partial<options>, index: number) => void;
  updateQuestion: (data: Partial<Questions>, index: number) => void;
}

export const LinkedQuestionContext = createContext<contextTypes>({
  questions: [],
  options: [],
  getRootQuestions: () => [],
  getQuestionById: (_id: string) => undefined,
  getOptionsFromId: (_id: string) => undefined,
  updateOption: (_data, _index) => {},
  updateQuestion: (_data, _index) => {},
  getChildQuestionByOptionId: (_id) => undefined,
});

export const questionDefaultValue: Questions = {
  questionId: "",
  question: "",
  answerType: "dropdown",
  isDefault: 0,
  linked: 0,
  leadFrom: null,
};

const Provider = ({ children }: any) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [options, setOptions] = useState<options[]>([]);

  const fetch = async () => {
    try {
      const { data } = await fetchQuestionAndOptions();
      setQuestions(data.questions);
      setOptions(data.options);
    } catch (err) {
      alert("Something went wrong please Try Again");
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  const getRootQuestions = () => {
    return questions.filter((e) => !e.leadFrom);
  };
  const getOptionsFromId = (id: string) => {
    return options.filter((e) => e.questionId == id);
  };
  const getQuestionById = (id: string) => {
    return questions.find((value) => value.questionId === id) || undefined;
  };

  const updateOption = (data: Partial<options>, index: number) => {
    setOptions((pre) => {
      const temp = Array.from(pre);
      temp[index] = { ...temp[index], ...data };
      return temp;
    });
  };
  const updateQuestion = (data: Partial<options>, index: number) => {
    setQuestions((pre) => {
      const temp = Array.from(pre);
      temp[index] = { ...temp[index], ...data };
      return temp;
    });
  };

  const getChildQuestionByOptionId = (id: string) => {
    return questions.find((e) => e.leadFrom === id);
  };
  return (
    <LinkedQuestionContext.Provider
      value={{
        getChildQuestionByOptionId,
        questions,
        options,
        getRootQuestions,
        getQuestionById,
        getOptionsFromId,
        updateOption,
        updateQuestion,
      }}
    >
      {children};
    </LinkedQuestionContext.Provider>
  );
};

export default Provider;
