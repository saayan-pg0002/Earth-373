import { FC } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DashboardPieChartProps {
  totalSessions: number;
  cancelledSessions: number;
}

export const DashboardPieChart: FC<DashboardPieChartProps> = ({
  totalSessions,
  cancelledSessions
}) => {
  const totalSessionsColor = "rgb(72, 176, 48)";
  const cancelledSessionsColor = "rgb(182, 223, 172)";

  const data = {
    labels: ["Total Sessions", "Cancelled Sessions"],
    datasets: [
      {
        data: [totalSessions === 0 ? 1 : totalSessions, cancelledSessions],
        backgroundColor: [totalSessionsColor, cancelledSessionsColor]
      }
    ]
  };

  return <Doughnut data={data} />;
};
