import { Alert } from "antd";

interface Props {
  total: number;
  budget: number;
}

export default function BudgetSummary({ total, budget }: Props) {
  return (
    <div>
      <h3>Tổng chi: {total}k</h3>
      <h3>Ngân sách: {budget}k</h3>

      {total > budget && (
        <Alert
          type="error"
          message="Bạn đã vượt ngân sách!"
          showIcon
        />
      )}
    </div>
  );
}