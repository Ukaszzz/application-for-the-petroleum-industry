const button = document.querySelector("button");
const presure = document.querySelectorAll(".pColumn input");
const gpAll = document.querySelectorAll(".gpColumn input");

let tablice = document.querySelectorAll(".wyniki");

const c1 = document.querySelector("#c1").value;
const c2 = document.querySelector("#c2").value;
const c3 = document.querySelector("#c3").value;
const co2 = document.querySelector("#co2").value;
const n2 = document.querySelector("#n2").value;

const temp = document.querySelector("#temperature").value;

let tab2 = [];
let tab1 = [];

const c1Value = { Tcri: 190.55, pcri: 4.64, M: 16.04 };
const c2Value = { Tcri: 305.5, pcri: 4.91, M: 30.07 };
const c3Value = { Tcri: 369.8, pcri: 4.26, M: 44.09 };
const c02Value = { Tcri: 304.19, pcri: 7.38, M: 44.01 };
const n2Value = { Tcri: 126.25, pcri: 3.4, M: 28.02 };

const tcAvg =
  c1Value.Tcri * c1 +
  c2Value.Tcri * c2 +
  c3Value.Tcri * c3 +
  c02Value.Tcri * co2 +
  n2Value.Tcri * n2;

const pcAvg =
  (c1Value.pcri * c1 +
    c2Value.pcri * c2 +
    c3Value.pcri * c3 +
    c02Value.pcri * co2 +
    n2Value.pcri * n2) *
  Math.pow(10, 6);
let tablicee = [[], [], [], [], [], [], [], [], [], [], [], [], [], []];

const r = 8.3134;

const a = (27 / 64) * ((r * r * tcAvg * tcAvg) / pcAvg);
const b = (1 / 8) * ((r * tcAvg) / pcAvg);

const addTo = (items, where) => {
  for (let i = 0; i < items.length; i++) {
    where.push(items[i].value);
  }
};

const count = (el, tablicaN) => {
  const A = (a * el) / (r * r * (temp * temp));
  const B = (b * el) / (r * temp);
  tablicaN.push(A.toFixed(4));
  tablicaN.push(B.toFixed(4));
  tablicaN.push(1);
  let cosss = tablicaN[2] / (tablicaN[2] - B) - A / tablicaN[2];
  tablicaN.push(cosss.toFixed(4));
  for (
    let z = 1;
    tablicaN[tablicaN.length - 2] - tablicaN[tablicaN.length - 1] > 0.0001;
    z--
  ) {
    let cossss =
      tablicaN[tablicaN.length - 1] / (tablicaN[tablicaN.length - 1] - B) -
      A / tablicaN[tablicaN.length - 1];
    tablicaN.push(cossss.toFixed(4));
  }
  const pz = el / Math.pow(10, 5) / tablicaN[tablicaN.length - 1];
  tablicaN.push(pz.toFixed(4));
  tab2.push(pz.toFixed(4));
};

const wykres = () => {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: [...tab1],
      datasets: [
        {
          label: "gp pz",
          // backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [...tab2]
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        position: "bottom"
      },
      // hover: {
      //   mode: "label"
      // },
      scales: {
        xAxes: [
          {
            display: true,

            scaleLabel: {
              display: true,
              labelString: "gp"
            }
          }
        ],
        yAxes: [
          {
            display: true,
            ticks: {
              beginAtZero: true,
              steps: 1,
              stepValue: 1,
              // max: 50,
              labelString: "ds"
            }
          }
        ]
      }
    }
  });
};

const show = () => {
  addTo(gpAll, tab1);

  for (let i = 0; i < presure.length; i++) {
    count(presure[i].value * Math.pow(10, 5), tablicee[i]);

    tablice[i].textContent = tablicee[i];
  }
  wykres();
};

button.addEventListener("click", show);
