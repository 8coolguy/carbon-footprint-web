import React, {useState} from 'react';
import {Chart, registerables} from "chart.js";

import {colors} from "../Styles/Colors";
import {Line} from 'react-chartjs-2';
import {total_line_options} from "../Styles/Options";
import Slider from 'rc-slider';
import '../Styles/index.css';




const Projection = ({user,span,total}) =>{
    //const [total,setTotal] =useState({});
    Chart.register(...registerables);
    const [years,setYears] =useState(3);

    let new_colors={
        ...colors
    };
    new_colors.total="grey";
    const cumulativeSum = (sum => value => sum += value)(0);
    const cumSumArr =(a)=>{
        if (!Array.isArray(a)) {
            return []
        }else{
            return a.map(cumulativeSum);
        }
        
    }
    const strToDate = (a)=>{
        if (!Array.isArray(a)) {
            return []
        }else{
            return a.map((date)=>new Date(date));
        }
    }
    const arrToPoint =(dates,values,years) =>{
        let res=[];
        if(!dates || !values){
            return res
        }
        let tsTon =[];
        for(let i =0; i<dates.length;i++){
            tsTon.push(i)
            let obj={};
            obj.x =dates[i].toUTCString();
            obj.y =values[i]
            res.push(obj);
            
        }
        let pred={};
        
        let pred_date =new Date();
        
        pred_date.setUTCFullYear(pred_date.getUTCFullYear()+years);
        const regression =simpleRegression(tsTon,values)
        pred.x=pred_date;
        pred.y =((values.length-1)+((pred_date- Date.now())/(60*60*24*1000)))*regression.slope +regression.intercept
        res.push({x:Date.now(),y:NaN})
        res.push(pred)
        
        
        return res;

    }
    const simpleRegression =(x,y)=>{
        let lr={};
        
        var n = y.length;
        var sum_x = 0;
        var sum_y = 0;
        var sum_xy = 0;
        var sum_xx = 0;
        

        for (var i = 0; i < y.length; i++) {

            sum_x += x[i];
            sum_y += y[i];
            sum_xy += (x[i]*y[i]);
            sum_xx += (x[i]*x[i]);
        }
        lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
        lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
        return lr;
    }
    const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;
    const line_data=React.useMemo(()=>({
        
        datasets:[{
                "label":"total",
                "fill":false,
                "borderColor":new_colors["total"],
                "data":arrToPoint(strToDate(total.labels),cumSumArr(total["total-date"]),years),
                segment: {
                    borderDash: ctx => skipped(ctx, [6, 6]),
                  }, 
                  spanGaps: true
            }],
        plugins:{
        title:{
            display:true,
            text: `${years} Projections`
        }
    }
        
    }),[total,years]);
    
    

    return(
        <div>
            
            <Line options={total_line_options} data={line_data}></Line>
            <Slider width="70%" min={1} max={30} value={years} onChange={(value)=>setYears(value)} />
        </div>
    )   
}

export default Projection;