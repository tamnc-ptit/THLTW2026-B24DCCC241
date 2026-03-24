import { Form, Input, InputNumber, DatePicker } from "antd";

interface FieldConfig {
  id: number;
  name: string;
  type: "string" | "number" | "date";
}

interface Props {
  fields: FieldConfig[];
}

const DynamicField: React.FC<Props> = ({ fields }) => {
  return (
    <>
      {fields.map((field) => {
        switch (field.type) {
          case "string":
            return (
              <Form.Item key={field.id} name={field.name} label={field.name}>
                <Input />
              </Form.Item>
            );

          case "number":
            return (
              <Form.Item key={field.id} name={field.name} label={field.name}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            );

          case "date":
            return (
              <Form.Item key={field.id} name={field.name} label={field.name}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default DynamicField;