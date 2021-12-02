import React, { FC, useState, useRef, useEffect } from "react";
import { Checkbox } from "../form/Checkbox";
import { GoalProp } from "./MenteeGoals";

interface AddNewGoalProps {
  addNewGoal: (newGoal: GoalProp) => void;
  hideAddNewGoal: () => void;
}

export const AddNewGoal: FC<AddNewGoalProps> = ({
  addNewGoal,
  hideAddNewGoal
}) => {
  const [goal, setGoal] = useState<GoalProp>({
    id: Math.floor(Math.random() * 100 + 1),
    name: "",
    isComplete: false,
    createdDate: new Date(),
    modifiedDate: new Date()
  });
  const [willCancel, setWillCancel] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resetGoal = () =>
    setGoal({
      id: Math.floor(Math.random() * 100 + 1),
      name: "",
      isComplete: false,
      createdDate: new Date(),
      modifiedDate: new Date()
    });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const onBlur = () => {
    if (!willCancel) {
      if (goal.name.trim() !== "") {
        addNewGoal(goal);
      }
    }
    hideAddNewGoal();
    resetGoal();
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setGoal({ ...goal, name: e.currentTarget.value });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (goal.name.trim() !== "") {
        addNewGoal(goal);
        resetGoal();
      }
    }
  };

  return (
    <div className="goal-item editing">
      <div className="header">
        <div>
          <Checkbox isChecked={goal.isComplete} />
        </div>
        <div className="input">
          <input
            type="text"
            value={goal.name}
            onChange={onChange}
            ref={inputRef}
            onKeyPress={handleKeyPress}
            onBlur={onBlur}
          />
        </div>
      </div>
    </div>
  );
};
