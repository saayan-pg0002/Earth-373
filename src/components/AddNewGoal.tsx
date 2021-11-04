import { useState } from "react";
import { GoalsProp as Props } from "../apps/MenteeGoals";
import { ContainedIcon, IconColors, IconName } from "./Icon";

interface GoalIProps {
  goal: Props["goals"];
  addGoal: (newGoal: string) => void;
  isAddNewGoalVisible: boolean;
  hideNewGoal: () => void;
}

export const AddNewGoal: React.FC<GoalIProps> = ({
  addGoal,
  isAddNewGoalVisible,
  hideNewGoal,
}) => {
  const [input, setInput] = useState({
    name: "",
  });

  const setChange = (e: any): void => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e: any): void => {
    if (e.key === "Enter") {
      if (!input.name) {
        return;
      }
      addGoal(input.name);
    }
  };

  return (
    <div>
      {isAddNewGoalVisible ? (
        <div>
          <input
            type="text"
            placeholder="enter your new goal"
            value={input.name}
            onKeyPress={handleChange}
            onChange={setChange}
            name="name"
          />
          <span onClick={hideNewGoal}>
            <ContainedIcon
              name={IconName.x}
              color={IconColors.black}
              backgroundColor={IconColors.white}
            ></ContainedIcon>
          </span>
        </div>
      ) : null}
    </div>
  );
};
