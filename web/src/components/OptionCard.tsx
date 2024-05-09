import { Card, Input } from "antd";

const OptionCard = ({ value }: { value: string }) => {
  return (
    <Card size="small" title="Option 2" extra={<a href="#">remove</a>}>
      <Input variant="filled" value={value} disabled />
    </Card>
  );
};

export default OptionCard;
