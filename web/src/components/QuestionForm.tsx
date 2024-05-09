import {
  Layout,
  Typography,
  Input,
  Button,
  Row,
  Col,
  Select,
  Switch,
  Tabs,
} from "antd";
import OptionCard from "./OptionCard";
import { useContext } from "react";
import { LinkedQuestionContext, Questions } from "../context/Provider";

const QuestionForm = ({ id, root = false }: { id: string; root?: boolean }) => {
  const { getQuestionById, getOptionsFromId, getChildQuestionByOptionId } =
    useContext(LinkedQuestionContext);
  const data = getQuestionById(id) as Questions;
  const options = getOptionsFromId(id) || [];
  const TabList = data.linked
    ? options.map((e) => {
        const getOptionLinkedQuestion = getChildQuestionByOptionId(e.optionId);
        return {
          key: e.optionId,
          label: e.optionValue,
          children: getOptionLinkedQuestion?.questionId ? (
            <QuestionForm id={getOptionLinkedQuestion?.questionId} />
          ) : (
            "No Questions found"
          ),
        };
      })
    : [];

  return (
    <Layout>
      <Typography style={{ margin: "5px", paddingLeft: "15px" }}>
        Questions
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          height: "48px",
        }}
      >
        <Input
          placeholder="outline"
          disabled
          variant="filled"
          style={{ maxWidth: "70%", padding: "5px", margin: "5px" }}
          value={data?.question}
        />
        <div style={{ width: "120px" }}>
          {root && (
            <>
              <Button type="primary" size="middle" style={{ width: "120px" }}>
                Save
              </Button>
              <Typography
                style={{
                  textDecoration: "underline",
                  paddingTop: "10px",
                  paddingLeft: "35px",
                }}
              >
                Cancel
              </Typography>
            </>
          )}
        </div>
      </div>
      <Row gutter={16}>
        <Col style={{ margin: "5px 0px 0px 74px" }} span={6}>
          <Typography>Question Type</Typography>
          <Select
            defaultValue={"dropdown"}
            placeholder="Answer Type"
            optionFilterProp="children"
            style={{ width: "50%" }}
            value={data?.answerType}
            disabled
            options={[
              {
                value: "dropdown",
                label: "DropDown",
              },
              {
                value: "text",
                label: "Text",
              },
            ]}
          />
        </Col>
        {data?.answerType === "dropdown" && (
          <Col span={6}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Switch defaultChecked style={{ marginTop: "20px" }} />
              <Typography
                style={{ color: "blue", marginTop: "20px", marginLeft: "5px" }}
              >
                Linked Question
              </Typography>
            </div>
          </Col>
        )}
      </Row>
      <Row gutter={16} style={{ paddingLeft: "65px" }}>
        {options.map((e) => {
          return (
            <Col style={{ margin: "5px", width: "auto" }} span={4}>
              <OptionCard value={e.optionValue} />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col style={{ margin: "5px 0px 0px 74px", width: "100%" }}>
          <Tabs items={TabList} />
        </Col>
      </Row>
    </Layout>
  );
};

export default QuestionForm;
