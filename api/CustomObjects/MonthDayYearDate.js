const {Timestamp} =require('firebase-admin/firestore')
class MoDaYeDate{
    constructor(date){
        this.month =date.getMonth()+1;
        this.year  =date.getUTCFullYear()
        this.day =date.getDate();
        
    }


    static of(_seconds,_nanoseconds){
        let ttod = new Timestamp(_seconds,_nanoseconds).toDate()
        return new this(ttod);
    }

    toString(){
        return  this.month + "/" + this.day + "/" + this.year;
    }
    toDate(){
        //console.log(this.month + "/" + this.day + "/" + this.year);
        return new Date(this.toString());
    }
    equals(d){
        if(this.month==d.month &&this.day==d.day && this.year ==d.year){
            return true
        }else{
            return false
        }
    }
}
module.exports =MoDaYeDate
