import React, { useState } from "react";
import { AddNewGoal } from "../components/AddNewGoal";
import GoalsList from "../components/GoalsList";
import { ContainedIcon, IconColors, IconName } from "../components/Icon";
import { MenteeProfileHeader } from "../components/MenteeProfileHeader";
import PageHelmet from "../util/PageHelmet";

export interface MenteeInfoProps {
  menteeName: string;
  startDate: string;
  birthday: String;
}

export interface GoalsProp {
  goals: {
    name: string;
  }[];
}

const MenteeGoals: React.FC<MenteeInfoProps & GoalsProp> = ({
  menteeName,
  startDate,
  birthday,
}) => {
  menteeName = "Melissa Nguyen";
  startDate = "September 2021";
  birthday = "Aug 2, 2010";

  const [ongoingGoal, setOngoingGoal] = useState<GoalsProp["goals"]>([
    {
      name: "Learn Math",
    },
  ]);

  const [completedGoals, addCompletedGoals] = useState<GoalsProp["goals"]>([
    {
      name: "Learn History",
    },
  ]);

  const [isAddNewGoalVisible, setIsAddNewGoalVisible] = useState(false);

  const hideNewGoal = () => setIsAddNewGoalVisible(false);

  const isAddingGoal = (event: any): void => {
    event.preventDefault();
    setIsAddNewGoalVisible(true);
  };

  const addToCompletedList = (addnewCompletedGoals: string): void => {
    addCompletedGoals([
      ...completedGoals,
      {
        name: addnewCompletedGoals,
      },
    ]);

    setOngoingGoal([
      ...ongoingGoal.filter(
        (ongoingGoal) => ongoingGoal.name !== addnewCompletedGoals,
        ongoingGoal
      ),
    ]);
  };

  const addGoal = (newGoal: string): void => {
    setOngoingGoal([
      ...ongoingGoal,
      {
        name: newGoal,
      },
    ]);

    addCompletedGoals([
      ...completedGoals.filter(
        (completedGoals) => completedGoals.name !== newGoal,
        completedGoals
      ),
    ]);
    setIsAddNewGoalVisible(false);
  };

  return (
    <main className="container">
      <PageHelmet title="Mentee Goals" />

      <MenteeProfileHeader
        menteeName={menteeName}
        startDate={startDate}
        birthday={birthday}
      />
      {/* TODO: tab component*/}

      <div>
        <div className="subtext statusTag">
          ongoing
          <span onClick={isAddingGoal}>
            <ContainedIcon
              name={IconName.plus}
              color={IconColors.black}
              backgroundColor={IconColors.white}
            ></ContainedIcon>
          </span>
        </div>

        <GoalsList
          goals={ongoingGoal}
          addToCompletedList={addToCompletedList}
          isCompleted={false}
          addGoal={addGoal}
        />

        {isAddNewGoalVisible && (
          <AddNewGoal
            goal={ongoingGoal}
            addGoal={addGoal}
            isAddNewGoalVisible={isAddNewGoalVisible}
            hideNewGoal={hideNewGoal}
          />
        )}
      </div>

      <div>
        <p className="subtext statusTag"> Complete </p>
        <GoalsList
          goals={completedGoals}
          addToCompletedList={addToCompletedList}
          isCompleted={true}
          addGoal={addGoal}
        />
      </div>
    </main>
  );
};

export default MenteeGoals;
