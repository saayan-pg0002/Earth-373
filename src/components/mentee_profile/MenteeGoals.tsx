import React, { useState } from "react";
import { AddNewGoal } from "./AddNewGoal";
import { Icon, IconColors, IconName } from "../Icon";
import { GoalItem } from "./GoalItem";
import { EmptyState } from "../EmptyState";
import { getFormattedMonthDateyearString } from "../../util/date";

export interface MenteeInfoProps {
  menteeName: string;
  startDate: string;
  birthday: String;
  sessionDay?: String;
  sessionTime?: String;
}

export interface GoalProp {
  id: number;
  name: string;
  isComplete: boolean;
  createdDate: Date;
  modifiedDate: Date;
  completedDate?: Date;
}

const MenteeGoals: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday
}) => {
  menteeName = "Melissa Nguyen";
  startDate = "September 2021";
  birthday = "Aug 2, 2010";

  const [ongoingGoals, setOngoingGoals] = useState<GoalProp[]>([
    {
      id: 1,
      name: "Learn Math",
      isComplete: false,
      createdDate: new Date(2021, 2, 3, 5, 30),
      modifiedDate: new Date(2021, 2, 3, 5, 30)
    }
  ]);

  const [completedGoals, setCompletedGoals] = useState<GoalProp[]>([
    {
      id: 2,
      name: "Learn History",
      isComplete: true,
      createdDate: new Date(2021, 2, 3, 5, 30),
      modifiedDate: new Date(2021, 2, 3, 5, 30),
      completedDate: new Date()
    }
  ]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const showAddNewGoal = () => setIsAddingGoal(true);
  const hideAddNewGoal = () => setIsAddingGoal(false);

  const addNewGoal = (newGoal: GoalProp): void => {
    setOngoingGoals([...ongoingGoals, newGoal]);
    hideAddNewGoal();
    showAddNewGoal();
  };

  const updateGoal = (editedGoal: GoalProp): void => {
    const { isComplete } = editedGoal;
    const targetGoalsList: GoalProp[] = isComplete
      ? completedGoals
      : ongoingGoals;
    const index: number = targetGoalsList.findIndex(
      (goal) => goal.id === editedGoal.id
    );
    editedGoal.modifiedDate = new Date();
    if (index !== -1) {
      if (isComplete) {
        setCompletedGoals([
          ...completedGoals.slice(0, index),
          editedGoal,
          ...completedGoals.slice(index + 1)
        ]);
      } else {
        setOngoingGoals([
          ...ongoingGoals.slice(0, index),
          editedGoal,
          ...ongoingGoals.slice(index + 1)
        ]);
      }
    }
  };

  const deleteGoal = (deletedGoal: GoalProp): void => {
    const { isComplete } = deletedGoal;
    if (isComplete) {
      setCompletedGoals([
        ...completedGoals.filter((goal) => goal.id !== deletedGoal.id)
      ]);
    } else {
      setOngoingGoals([
        ...ongoingGoals.filter((goal) => goal.id !== deletedGoal.id)
      ]);
    }
  };

  const completeGoal = (goal: GoalProp): void => {
    goal.modifiedDate = new Date();
    goal.completedDate = new Date();
    setCompletedGoals([...completedGoals, { ...goal, isComplete: true }]);
    setOngoingGoals([
      ...ongoingGoals.filter(
        (ongoingGoals) => ongoingGoals.name !== goal.name,
        ongoingGoals
      )
    ]);
  };

  const uncheckGoal = (goal: GoalProp): void => {
    goal.modifiedDate = new Date();
    goal.completedDate = undefined;
    setOngoingGoals([...ongoingGoals, { ...goal, isComplete: false }]);
    setCompletedGoals([
      ...completedGoals.filter(
        (completedGoals) => completedGoals.name !== goal.name,
        completedGoals
      )
    ]);
    hideAddNewGoal();
  };

  return (
    <main className="mentee-goals">
      <div className="goal-section">
        <div className="header">
          <h2 className="subtext">Ongoing</h2>
          <Icon
            name={IconName.plus}
            color={IconColors.black}
            onClick={showAddNewGoal}
          ></Icon>
        </div>
        {!isAddingGoal && ongoingGoals.length === 0 && (
          <EmptyState
            title={
              completedGoals.length > 0
                ? "All Goals Complete!"
                : "No Ongoing Goals"
            }
            message="Click the + to create a new goal"
            showGraphic={false}
          />
        )}
        {ongoingGoals.length > 0 &&
          ongoingGoals.map((goal) => (
            <GoalItem
              onClickCheckbox={completeGoal}
              key={goal.id}
              initialGoal={goal}
              updateGoal={updateGoal}
              deleteGoal={deleteGoal}
            />
          ))}
        {isAddingGoal && (
          <AddNewGoal addNewGoal={addNewGoal} hideAddNewGoal={hideAddNewGoal} />
        )}
      </div>

      {completedGoals.length > 0 && (
        <div className="goal-section">
          <div className="header">
            <h2 className="subtext">Complete</h2>
          </div>
          {completedGoals.map((goal) => (
            <GoalItem
              onClickCheckbox={uncheckGoal}
              key={goal.id}
              initialGoal={goal}
              updateGoal={updateGoal}
              deleteGoal={deleteGoal}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default MenteeGoals;
