const buttonOn = document.querySelector(".turnOn");
const buttonOff = document.querySelector(".turnOff");
const presure = document.querySelectorAll(".pColumn input");
const temp = document.querySelector("#temperature").value;
const wykres = document.querySelector(".wykre");

const gpAll = document.querySelectorAll(".gpColumn input");
let tablice = document.querySelectorAll(".wyniki");
let intercept = document.querySelector(".intercept");
let slope = document.querySelector(".slope");
let gi = document.querySelector(".gpStart");

const c1 = document.querySelector("#c1").value;
const c2 = document.querySelector("#c2").value;
const c3 = document.querySelector("#c3").value;
const co2 = document.querySelector("#co2").value;
const n2 = document.querySelector("#n2").value;
let table = [];
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

const r = 8.3134;

const a = (27 / 64) * ((r * r * tcAvg * tcAvg) / pcAvg);
const b = (1 / 8) * ((r * tcAvg) / pcAvg);

const createTable = () => {
  for (let i = 0; i < presure.length; i++) {
    table.push([]);
  }
};

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
  let cellValue = tablicaN[2] / (tablicaN[2] - B) - A / tablicaN[2];
  tablicaN.push(cellValue.toFixed(4));
  while (
    tablicaN[tablicaN.length - 2] - tablicaN[tablicaN.length - 1] > 0.0001 ||
    tablicaN.length < 8
  ) {
    let cellValue =
      tablicaN[tablicaN.length - 1] / (tablicaN[tablicaN.length - 1] - B) -
      A / tablicaN[tablicaN.length - 1];
    tablicaN.push(cellValue.toFixed(4));
  }
  const pz = el / Math.pow(10, 5) / tablicaN[tablicaN.length - 1];
  tablicaN.push(pz.toFixed(4));
  tab2.push(pz.toFixed(4));
};

const tabSlice = () => {
  tab1.splice(0, 1);
  tab2.splice(0, 1);
};
const regress = () => {
  let x = tab1.map(i => Number(i));
  let y = tab2.map(i => Number(i));

  const n = y.length;
  let sx = 0;
  let sy = 0;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (let i = 0; i < n; i++) {
    sx += x[i];
    sy += y[i];
    sxy += x[i] * y[i];
    sxx += x[i] * x[i];
    syy += y[i] * y[i];
  }
  const mx = sx / n;
  const my = sy / n;
  const yy = n * syy - sy * sy;
  const xx = n * sxx - sx * sx;
  const xy = n * sxy - sx * sy;
  const slope = xy / xx;
  const intercept = my - slope * mx;

  intercept.textContent = intercept;

  slope.textContent = slope;

  return { slope, intercept };
};

const reset = () => {
  window.location.reload(true);
};

const show = () => {
  createTable();
  addTo(gpAll, tab1);

  for (let i = 0; i < presure.length; i++) {
    count(presure[i].value * Math.pow(10, 5), table[i]);
    let results = document.querySelector(".results");
    newResult = document.createElement("div");
    newResult.classList.add("wyniki");
    results.appendChild(newResult);

    for (let j = 0; j < table[i].length; j++) {
      console.log("działas");
      newP = document.createElement("div");
      newP.innerHTML = ``;
      newP.textContent = table[i][j];
      newResult.appendChild(newP);
    }
  }
  buttonOn.disabled = true;
  buttonOff.disabled = false;
  wykres.style.display = "block";

  tabSlice();

  regress();

  let a = (intercept.textContent = `intercept = ${regress().intercept.toFixed(
    3
  )}`);
  let b = (slope.textContent = `slope = ${regress().slope.toFixed(3)}`);
  gi.textContent = -(regress().intercept / regress().slope).toFixed(3);
};

buttonOn.addEventListener("click", show);
buttonOff.addEventListener("click", reset);
