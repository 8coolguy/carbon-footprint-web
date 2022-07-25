const express =require('express');
const app =require('../../firebase')
const firebase =require('firebase-admin');
const {getFirestore} =require('firebase-admin/firestore');
const router =express.Router();

const firestore = getFirestore(app);


/**
 * GET USER totals
 * Returns total C02 usage within a span .
 *
 * @param {str} span last month,last year, last week,all time.
 * @param {str}  uid which user to get.
 * @return {JSONObject} object of all the types of C02 usage.
 */
router.get('/total', async (req,res) => {
    
    var uid, span;
    
    uid = req.query.uid
    span = req.query.span
    console.log(uid);
    console.log(span);
    if(!uid || !span){
        res.status(400).json({succes:false,reason:"no parameters"});
        return;
    }
    let docRef = firestore.doc(`users/${uid}`);
    var total =0;
    let date = new Date()
    if(span ==="m"){
        date.setMonth(date.getMonth() - 1);
    }
    else if(span==="w"){    
        date.setDate(date.getDate() - 7);
    }
    else if(span === "y"){
        date.setUTCFullYear(date.getUTCFullYear() - 1);
    }else if(span==="a"){
        date.setUTCFullYear(date.getUTCFullYear() - 100);
    }
    console.log(date);
    var obj={}
    obj['total']=0
    docRef.get()
        .then(docSnapshot => {
            if(docSnapshot.data()){
                
                docRef.collection('carbon-emissons').where('date', '>', date).get()
                    .then(query => {
                        query.forEach(doc => {
                            let curDoc =doc.data();
                            obj['total']+=curDoc['carbon-emisson'];
                            if (curDoc["type"]){
                                if(obj[curDoc["type"]]){
                                    obj[curDoc["type"]]+=curDoc['carbon-emisson'];
                                }else{
                                    obj[curDoc["type"]]=0
                                    obj[curDoc["type"]]+=curDoc['carbon-emisson']
                                }
                            }
                            
                        });
                        res.status(200).json(obj);
                    })
                    .catch(err=>res.status(401).json({reason:"query error"}));
                
            }else{
                throw "err"; 
            }
            
        })
        .catch(err=>res.status(400).json({reason:"user not found"}));

});


module.exports =router;