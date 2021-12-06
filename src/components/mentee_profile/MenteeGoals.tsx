import React, { useEffect, useState } from "react";
import { AddNewGoal } from "./AddNewGoal";
import { Icon, IconColors, IconName } from "../Icon";
import { GoalItem } from "./GoalItem";
import { EmptyState } from "../EmptyState";
import { Endpoints, RequestType, sendRequest } from "../../util/request";
import { MessageToastType, showMessageToast } from "../MessageToast";
export interface MenteeInfoProps {
  association_id?: string;
  menteeName: string;
  startDate: string;
  birthday: String;
  sessionDay?: String;
  sessionTime?: String;
}
export interface GoalProp {
  id: string;
  name: string;
  isComplete: boolean;
  createdDate: Date;
  modifiedDate: Date;
  completedDate?: Date;
}

const MenteeGoals: React.FC<MenteeInfoProps> = ({
  menteeName,
  startDate,
  birthday,
  association_id
}) => {
  const [ongoingGoals, setOngoingGoals] = useState<GoalProp[]>([]);

  const [completedGoals, setCompletedGoals] = useState<GoalProp[]>([]);

  const [isAddingGoal, setIsAddingGoal] = useState(false);

  const showAddNewGoal = () => setIsAddingGoal(true);
  const hideAddNewGoal = () => setIsAddingGoal(false);

  const addNewGoal = (newGoal: GoalProp): void => {
    if (isGoalCreated(newGoal)) {
      setOngoingGoals([...ongoingGoals, newGoal]);
      hideAddNewGoal();
      showAddNewGoal();
    }
  };

  const updateGoal = (editedGoal: GoalProp): void => {
    if (isGoalUpdated(editedGoal)) {
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
    goal["isComplete"] = true;
    if (isGoalUpdated(goal)) {
      goal.modifiedDate = new Date();
      goal.completedDate = new Date();
      setCompletedGoals([...completedGoals, { ...goal }]);
      setOngoingGoals([
        ...ongoingGoals.filter(
          (ongoingGoals) => ongoingGoals.name !== goal.name,
          ongoingGoals
        )
      ]);
    }
  };

  const uncheckGoal = (goal: GoalProp): void => {
    goal["isComplete"] = false;
    if (isGoalUpdated(goal)) {
      goal.modifiedDate = new Date();
      setOngoingGoals([...ongoingGoals, { ...goal }]);
      setCompletedGoals([
        ...completedGoals.filter(
          (completedGoals) => completedGoals.name !== goal.name,
          completedGoals
        )
      ]);
      hideAddNewGoal();
    }
  };

  const isGoalCreated = (goal: GoalProp): boolean => {
    var isCreated: boolean = true;
    const data = {
      association_id: association_id,
      goal: goal["name"]
    };
    sendRequest(RequestType.POST, { endpoint: Endpoints.createGoal }, data)
      .then()
      .catch((err) => {
        showMessageToast(
          MessageToastType.ERROR,
          "Unable to create new goal. These changes are not applied on server. Please try again later"
        );
        isCreated = false;
      });
    return isCreated;
  };

  const isGoalUpdated = (goal: GoalProp): boolean => {
    var isUpdated: boolean = true;
    const data = {
      association_id: association_id,
      goal_id: goal["id"],
      goal_name: goal["name"],
      is_complete: goal["isComplete"]
    };
    sendRequest(RequestType.PUT, { endpoint: Endpoints.updateGoal }, data)
      .then()
      .catch((err) => {
        showMessageToast(
          MessageToastType.ERROR,
          "Unable to update your goal. These changes are not applied on server. Please try again later"
        );
        isUpdated = false;
      });
    return isUpdated;
  };

  useEffect(() => {
    sendRequest(
      RequestType.POST,
      { endpoint: Endpoints.getGoals },
      { association_id }
    )
      .then(({ data }) => {
        var fetchedCompletedGoals: GoalProp[] = [];
        var fetchedOngoingGoals: GoalProp[] = [];
        for (const goal of data["goals"]) {
          if (goal["is_complete"] && goal["completed_at"]) {
            fetchedCompletedGoals.push({
              id: goal["_id"],
              name: goal["goal_name"],
              isComplete: goal["is_complete"],
              completedDate: new Date(goal["completed_at"].substring(0, 19)),
              modifiedDate: new Date(goal["updated_at"].substring(0, 19)),
              createdDate: new Date(goal["created_at"].substring(0, 19))
            });
          } else {
            fetchedOngoingGoals.push({
              id: goal["_id"],
              name: goal["goal_name"],
              isComplete: goal["is_complete"],
              completedDate: undefined,
              modifiedDate: new Date(goal["updated_at"].substring(0, 19)),
              createdDate: new Date(goal["created_at"].substring(0, 19))
            });
          }
        }
        setCompletedGoals([...completedGoals, ...fetchedCompletedGoals]);
        setOngoingGoals([...ongoingGoals, ...fetchedOngoingGoals]);
      })
      .catch((err) => {
        showMessageToast(
          MessageToastType.ERROR,
          "Unable to load goals, please try again later!"
        );
      });
  }, []);

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
