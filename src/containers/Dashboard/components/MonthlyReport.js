import React, { useEffect, useState } from "react";
import * as Chartjs from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import sortBy from "lodash/sortBy";
import { Spinner } from "src/shared/Loader";

const MonthlyReport = (props) => {
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    if (!isEmpty(props.monthlyDataReport)) {
      const { labels, data } = sortBy(props.monthlyDataReport, "date")
        .reduce((result, item) => {
          result.labels.push(item.date);
          result.data.push(item.imps);
          return result;
        }, {labels: [], data: []});

      setChartData({ labels, data });
    } else {
      setChartData({ labels: [], data: [] })
    }
    // eslint-disable-next-line
  }, [props.monthlyDataReport]);

  return (
    <Card className="mb-4">
      <Card.Header>
        Monthly Data Report
      </Card.Header>
      <Card.Body style={{ minHeight: "12rem" }}>
        {props.monthlyDataLoading ? (
          <div className="text-center"><Spinner /></div>
        ) : (
          <Chartjs.Line
            height={210}
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  label: "",
                  data: chartData.data,
                  borderWidth: 1,
                  backgroundColor: "rgba(28,180,255,.05)",
                  borderColor: "rgba(28,180,255,1)",
                },
              ],
            }}
            options={{
              legend: false,
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      fontColor: "#aaa",
                    },
                  },
                ],
                yAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      fontColor: "#aaa",
                      maxTicksLimit: 5
                    },
                  },
                ],
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default connect(
  state => ({
    monthlyDataLoading: state.dashboard.monthlyDataLoading,
    monthlyDataReport: state.dashboard.monthlyDataReport,
  })
)(MonthlyReport);
