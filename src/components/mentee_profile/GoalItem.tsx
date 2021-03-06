import React, { FC, useState, useRef, useEffect } from "react";
import { Checkbox } from "../form/Checkbox";
import { GoalProp } from "./MenteeGoals";
import { getFormattedMonthDateYearString } from "../../util/date";

interface GoalItemProps {
  onClickCheckbox: (goal: GoalProp) => void;
  updateGoal: (editedGoal: GoalProp) => void;
  deleteGoal: (deletedGoal: GoalProp) => void;
  initialGoal: GoalProp;
}

export const GoalItem: FC<GoalItemProps> = ({
  updateGoal,
  deleteGoal,
  onClickCheckbox,
  initialGoal
}) => {
  const [goal, setGoal] = useState<GoalProp>(initialGoal);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isGoalBlank = (): boolean => goal.name.trim() === "";

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onClick = (): void => onClickCheckbox(goal);

  const onClickStartEditing = (): void => setIsEditing(true);

  const stopEditing = (): void => {
    if (isGoalBlank()) {
      deleteGoal(goal);
    } else {
      updateGoal(goal);
    }
    setIsEditing(false);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) =>
    setGoal({ ...goal, name: e.currentTarget.value });

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isGoalBlank()) {
        deleteGoal(goal);
      } else {
        updateGoal(goal);
      }

      stopEditing();
    }
  };

  return (
    <div
      className={`goal-item ${isEditing ? "editing" : ""}`}
      onBlur={stopEditing}
    >
      <div className="header">
        <div onClick={onClick}>
          <Checkbox isChecked={goal.isComplete} />
        </div>
        <div className="input" onClick={onClickStartEditing}>
          <input
            type="text"
            value={goal.name}
            onChange={onChange}
            disabled={!isEditing}
            ref={inputRef}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
      <div className="dates">
        {goal.createdDate && (
          <div className="subtext">
            Created: {getFormattedMonthDateYearString(goal.createdDate)}
          </div>
        )}
        {goal.modifiedDate && (
          <div className="subtext">
            Modified: {getFormattedMonthDateYearString(goal.modifiedDate)}
          </div>
        )}
        {goal.isComplete && goal.completedDate && (
          <div className="subtext">
            Completed: {getFormattedMonthDateYearString(goal.completedDate)}
          </div>
        )}
      </div>
    </div>
  );
};
