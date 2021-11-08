import React, { FC, useState, useRef, useEffect } from "react";
import { Checkbox } from "../form/Checkbox";
import { GoalProp } from "./MenteeGoals";
import { Icon, IconName, IconColors } from "../Icon";

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
  initialGoal,
}) => {
  const [goal, setGoal] = useState<GoalProp>(initialGoal);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [willDelete, setWillDelete] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const isGoalBlank = (): boolean => goal.name.trim() === "";

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onClick = (): void => onClickCheckbox(goal);

  const onClickStartEditing = (): void => setIsEditing(true);

  const onMouseOverDelete = (): void => setWillDelete(true);
  const onMouseOutDelete = (): void => setWillDelete(false);

  const onClickDeleteGoal = (): void => deleteGoal(goal);

  const stopEditing = (): void => {
    if (!willDelete) {
      if (isGoalBlank()) {
        deleteGoal(goal);
      } else {
        updateGoal(goal);
      }
      setIsEditing(false);
    }
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
      <span onClick={onClick}>
        <Checkbox isChecked={goal.isComplete} />
      </span>
      <span className="input" onClick={onClickStartEditing}>
        <input
          type="text"
          value={goal.name}
          onChange={onChange}
          disabled={!isEditing}
          ref={inputRef}
          onKeyPress={handleKeyPress}
        />
      </span>
      {isEditing && (
        <span onMouseOver={onMouseOverDelete} onMouseOut={onMouseOutDelete}>
          <Icon
            name={IconName.x}
            color={IconColors.black}
            onClick={onClickDeleteGoal}
          />
        </span>
      )}
    </div>
  );
};
