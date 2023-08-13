const xValues = ["mon","tue","wed","thu","fri","sat","sun"];
const yValues = [17.45, 34.91, 52.36, 31.07, 23.39, 43.28, 25.48];


new Chart("myChart",{
    type: "bar",
    data:{
        labels: xValues,
        datasets:[{
            backgroundColor:["#EC755D","#EC755D","#76B5BC","#EC755D","#EC755D","#EC755D","#EC755D"],
            data: yValues,
            label:'$'
        }]
    },
    options:{
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display:false,
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)"
                },
                ticks:{display:false},
                stacked:true,
            }]
        },
        legend:{
            display:false
        }
    }
});
