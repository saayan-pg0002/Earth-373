import React, { useState } from "react";
import { AddNewGoal } from "../components/AddNewGoal";
import { Icon, IconColors, IconName } from "../components/Icon";
import { MenteeProfileHeader } from "../components/MenteeProfileHeader";
import PageHelmet from "../util/PageHelmet";
import { GoalItem } from "../components/GoalItem";

export interface MenteeInfoProps {
  menteeName: string;
  startDate: string;
  birthday: String;
}

export interface GoalProp {
  id: number;
  name: string;
  isComplete: boolean;
}

const MenteeGoals: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday,
}) => {
  menteeName = "Melissa Nguyen";
  startDate = "September 2021";
  birthday = "Aug 2, 2010";

  const [ongoingGoals, setOngoingGoals] = useState<GoalProp[]>([
    {
      id: 1,
      name: "Learn Math",
      isComplete: false,
    },
  ]);

  const [completedGoals, setCompletedGoals] = useState<GoalProp[]>([
    {
      id: 2,
      name: "Learn History",
      isComplete: true,
    },
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

    if (index !== -1) {
      if (isComplete) {
        setCompletedGoals([
          ...completedGoals.slice(0, index),
          editedGoal,
          ...completedGoals.slice(index + 1),
        ]);
      } else {
        setOngoingGoals([
          ...ongoingGoals.slice(0, index),
          editedGoal,
          ...ongoingGoals.slice(index + 1),
        ]);
      }
    }
  };

  const deleteGoal = (deletedGoal: GoalProp): void => {
    const { isComplete } = deletedGoal;
    if (isComplete) {
      setCompletedGoals([
        ...completedGoals.filter((goal) => goal.id !== deletedGoal.id),
      ]);
    } else {
      setOngoingGoals([
        ...ongoingGoals.filter((goal) => goal.id !== deletedGoal.id),
      ]);
    }
  };

  const completeGoal = (goal: GoalProp): void => {
    setCompletedGoals([...completedGoals, { ...goal, isComplete: true }]);

    setOngoingGoals([
      ...ongoingGoals.filter(
        (ongoingGoals) => ongoingGoals.name !== goal.name,
        ongoingGoals
      ),
    ]);
  };

  const uncheckGoal = (goal: GoalProp): void => {
    setOngoingGoals([...ongoingGoals, { ...goal, isComplete: false }]);

    setCompletedGoals([
      ...completedGoals.filter(
        (completedGoals) => completedGoals.name !== goal.name,
        completedGoals
      ),
    ]);
    hideAddNewGoal();
  };

  return (
    <main className="container mentee-goals">
      <PageHelmet title="Mentee Goals" />

      <MenteeProfileHeader
        menteeName={menteeName}
        startDate={startDate}
        birthday={birthday}
      />
      {/* TODO: tab component*/}

      <div className="goal-section">
        <div className="header">
          <h2 className="subtext">Ongoing</h2>
          <Icon
            name={IconName.plus}
            color={IconColors.black}
            onClick={showAddNewGoal}
          ></Icon>
        </div>
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
