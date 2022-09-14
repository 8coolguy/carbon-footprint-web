export const pie_options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Rate of Co2 emissions per day',
            font:{
                size:30,
            }
        },
    },
  };
export const small_pie_options =  {
    responsive: true,
    plugins: {
        legend: {
            display:false,
            position: 'top',
        },
    },
};
export const line_options= {
    type:'line',
    plugins:{
        title: {
            display: true,
            text: 'Average Co2 emissions per day',
            font:{
                size:30,
            }
        },
    }
}
export const total_line_options= {
    type:'line',
    scales: {
        x: {
            type: 'time'
        }
    },
    plugins:{
        title:{
            display:true,
            text: "Future Projections",
            font:{
                size:30,
                color:"black",
            }
        }

    }
}
