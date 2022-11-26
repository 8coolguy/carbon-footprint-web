export const pie_options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Distrubution of Emissions',
            font:{
                size:24,
            },
            color:"black",
        },
    },
  };
export const small_pie_options =  {
    responsive: true,
    events:[],
    plugins: {
        legend: {
            display:false,
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
                size:24,
            },
            color:"black"
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
                size:24,
                
            },
            
            color:"black",
            
        },
        

    }
}

