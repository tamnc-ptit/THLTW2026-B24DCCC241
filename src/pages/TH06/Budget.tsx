import BudgetSummary from "./components/BudgetSummary";
import { useApp } from "./context/AppContext";

export default function Budget() {
  const { itinerary } = useApp();

  const total = itinerary.reduce((s, i) => s + i.cost, 0);
  const budget = 1000;

  return (
    <>
      <h2>Ngân sách</h2>
      <BudgetSummary total={total} budget={budget} />
    </>
  );
}