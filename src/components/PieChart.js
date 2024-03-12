import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData ,mountlyPayment }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Monthly Payment: $ {mountlyPayment}</h2>
      <Pie
        data={chartData}
        options={
            {
                plugins: {
                    title: {
                    display: true,
                    //   text: "Users Gained between 2016-2020"
                    }
                }
            }
        }
        
      />
    </div>
  );
}
export default PieChart;