
import { Select } from "antd";

interface Props {
  onFilter: (value: string) => void;
}

// Định nghĩa component
const DestinationFilter = ({ onFilter }: Props) => {
  return (
    <Select
      placeholder="Chọn loại"
      style={{ width: 200 }}
      onChange={onFilter}
      allowClear
    >
      <Select.Option value="beach">Biển</Select.Option>
      <Select.Option value="mountain">Núi</Select.Option>
      <Select.Option value="city">Thành phố</Select.Option>
    </Select>
  );
};


export default DestinationFilter;