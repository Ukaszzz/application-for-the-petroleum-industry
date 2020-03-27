// // // const gpAlle = document.querySelectorAll("gpColumn input");
// // // // console.log(gpAlle[0].value);
// // // var ctx = document.getElementById("myChart").getContext("2d");
// // // var chart = new Chart(ctx, {
// // //   // The type of chart we want to create
// // //   type: "line",

// // //   // The data for our dataset
// // //   data: {
// // //     labels: [...tab1],
// // //     datasets: [
// // //       {
// // //         label: "gp pz",
// // //         // backgroundColor: "rgb(255, 99, 132)",
// // //         borderColor: "rgb(255, 99, 132)",
// // //         data: [...tab2]
// // //       }
// // //     ]
// // //   },
// // //   options: {
// // //     responsive: true,
// // //     legend: {
// // //       position: "bottom"
// // //     },
// // //     // hover: {
// // //     //   mode: "label"
// // //     // },
// // //     scales: {
// // //       xAxes: [
// // //         {
// // //           display: true,

// // //           scaleLabel: {
// // //             display: true,
// // //             labelString: "gp"
// // //           }
// // //         }
// // //       ],
// // //       yAxes: [
// // //         {
// // //           display: true,
// // //           ticks: {
// // //             beginAtZero: true,
// // //             steps: 1,
// // //             stepValue: 1,
// // //             // max: 50,
// // //             labelString: "ds"
// // //           }
// // //         }
// // //       ]
// // //     }
// // //     // title: {
// // //     //   display: true,
// // //     //   text: "Chart.js Line Chart - Legend"
// // //     // }
// // //   }
// // // });

// // [248, 317, 355, 461, 501, 515, 524, 567, 578, 614, 628, 690, 693],
// //   [
// //     30.4328164190662,
// //     26.6334071011561,
// //     26.1509134610254,
// //     22.4688576081863,
// //     20.145117685717,
// //     19.9148954924778,
// //     19.4556038686928,
// //     17.2946042710547,
// //     17.2946042710547,
// //     15.2779336050894,
// //     15.0556490467503,
// //     13.2899579564013,
// //     12.5243899909728
// //   ];

// const regress = (x, y) => {
//   const n = y.length;
//   let sx = 0;
//   let sy = 0;
//   let sxy = 0;
//   let sxx = 0;
//   let syy = 0;
//   for (let i = 0; i < n; i++) {
//     sx += x[i];
//     sy += y[i];
//     sxy += x[i] * y[i];
//     sxx += x[i] * x[i];
//     syy += y[i] * y[i];
//   }
//   const mx = sx / n;
//   const my = sy / n;
//   const yy = n * syy - sy * sy;
//   const xx = n * sxx - sx * sx;
//   const xy = n * sxy - sx * sy;
//   const slope = xy / xx;
//   const intercept = my - slope * mx;
//   const r = xy / Math.sqrt(xx * yy);
//   const r2 = Math.pow(r, 2);
//   let sst = 0;
//   for (let i = 0; i < n; i++) {
//     sst += Math.pow(y[i] - my, 2);
//   }
//   const sse = sst - r2 * sst;
//   const see = Math.sqrt(sse / (n - 2));
//   const ssr = sst - sse;
//   return { slope, intercept, r, r2, sse, ssr, sst, sy, sx, see };
// };
// regress(
//   [
//     248.3,
//     317.7,
//     355.3,
//     461.3,
//     501,
//     515.1,
//     524,
//     567,
//     578.1,
//     614.6,
//     628.8,
//     690,
//     693.3
//   ],
//   [
//     30.4328164190662,
//     26.6334071011561,
//     26.1509134610254,
//     22.4688576081863,
//     20.145117685717,
//     19.9148954924778,
//     19.4556038686928,
//     17.2946042710547,
//     17.2946042710547,
//     15.2779336050894,
//     15.0556490467503,
//     13.2899579564013,
//     12.5243899909728
//   ]
// );

// console.log(
//   regress(
//     [
//       248.3,
//       317.7,
//       355.3,
//       461.3,
//       501,
//       515.1,
//       524,
//       567,
//       578.1,
//       614.6,
//       628.8,
//       690,
//       693.3
//     ],
//     [
//       30.4328164190662,
//       26.6334071011561,
//       26.1509134610254,
//       22.4688576081863,
//       20.145117685717,
//       19.9148954924778,
//       19.4556038686928,
//       17.2946042710547,
//       17.2946042710547,
//       15.2779336050894,
//       15.0556490467503,
//       13.2899579564013,
//       12.5243899909728
//     ]
//   ).intercept
// );

let tab1 = ["1", "2", "2"];
let a = tab1.map(i => Number(i));
console.log(a);
