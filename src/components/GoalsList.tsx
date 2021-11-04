import { useState } from "react";
import { GoalsProp as Props } from "../apps/MenteeGoals";

interface GoalsIProp {
  goals: Props["goals"];
  addToCompletedList: (addnewCompletedGoals: string) => void;
  isCompleted: boolean;
  addGoal: (newGoal: string) => void;
}
const GoalsList: React.FC<GoalsIProp> = ({
  goals,
  addToCompletedList,
  isCompleted,
  addGoal,
}) => {

  const [checked, setChecked] = useState(isCompleted)

  const onCheckingGoal = (event: any): void => {
    if (isCompleted === true) {
      addGoal(event.target.defaultValue);
      setChecked(true);
    } else {
      addToCompletedList(event.target.defaultValue);
      setChecked(false);
    }

  };

  const renderList = (): JSX.Element[] => {
    return goals.map((g: any, index: number) => {
      return (
        <ul className="List " key={index}>
          <p className={`goal ${isCompleted ? "completed" : ""}`}>
            <input
              type="checkbox"
              defaultChecked={checked}
              onChange={onCheckingGoal}
              value={g.name}
            />
            {g.name}
          </p>
        </ul>
      );
    });
  };

  return <ul>{renderList()}</ul>;
};

export default GoalsList;
