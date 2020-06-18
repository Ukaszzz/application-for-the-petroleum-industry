var dps = []; //dataPoints.

var chart = new CanvasJS.Chart("chartContainer", {
  title: {
    text: "",
  },
  axisX: {
    title: "GP [mln Nm3]",
  },
  axisY: {
    title: "P/Z [MPa]",
  },
  data: [
    {
      type: "scatter",
      dataPoints: dps,
    },
  ],
});

function addDataPointsAndRender() {
  let tabx = tab1;
  let taby = tab2;
  for (let i = 0; i < tabx.length; i++) {
    xValue = Number(tabx[i]);
    yValue = Number(taby[i]);
    dps.push({
      x: xValue,
      y: yValue,
    });
  }

  chart.render();
  calculateTrendLine(chart);
}

function calculateTrendLine(chart) {
  var a, b, c, d, e, slope, yIntercept;
  var xSum = 0,
    ySum = 0,
    xySum = 0,
    xSquare = 0,
    dpsLength = chart.data[0].dataPoints.length;
  for (var i = 0; i < dpsLength; i++)
    xySum += chart.data[0].dataPoints[i].x * chart.data[0].dataPoints[i].y;
  a = xySum * dpsLength;

  for (var i = 0; i < dpsLength; i++) {
    xSum += chart.data[0].dataPoints[i].x;
    ySum += chart.data[0].dataPoints[i].y;
  }
  b = xSum * ySum;

  for (var i = 0; i < dpsLength; i++)
    xSquare += Math.pow(chart.data[0].dataPoints[i].x, 2);
  c = dpsLength * xSquare;

  d = Math.pow(xSum, 2);
  slope = (a - b) / (c - d);
  e = slope * xSum;
  yIntercept = (ySum - e) / dpsLength;

  var startPoint = getTrendLinePoint(
    chart.data[0].dataPoints[0].x,
    slope,
    yIntercept
  );
  var endPoint = getTrendLinePoint(
    chart.data[0].dataPoints[dpsLength - 1].x + 400,
    slope,
    yIntercept
  );

  chart.addTo("data", {
    type: "line", //Line series showing trend
    markerSize: 0,
    dataPoints: [startPoint, endPoint],
  });
}

function getTrendLinePoint(x, slope, intercept) {
  return { x: x, y: slope * x + intercept };
}

buttonOn.addEventListener("click", addDataPointsAndRender);
