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
        title: {
            display: false,
            text: 'Rate of Co2 emissions per day',
            font:{
                size:30,
            }
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