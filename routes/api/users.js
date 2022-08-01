const express =require('express');
const app =require('../../firebase')
const firebase =require('firebase-admin');
const {getFirestore} =require('firebase-admin/firestore');
const router =express.Router();

const firestore = getFirestore(app);

router.get("/",(req,res)=>{
    res.status(200).json({urls:
        {
            "1 get":"/total?uid&span",
            "2 post":"/createUser?uid",
            "3 post":"/createEmisson?uid&type&total",
        }
    })
});
/**
 * GET USER totals
 * Returns total C02 usage within a span .
 *
 * @param {str} span last month,last year, last week,all time.
 * @param {str}  uid which user to get.
 * @return {JSONObject} object of all the types of C02 usage.
 */
router.get('/total', (req,res) => {
    
    var uid, span;
    uid = req.query.uid
    span = req.query.span
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
    var obj={}
    obj['total']=0;
    docRef.get()
        .then(docSnapshot => {
            if(docSnapshot.exists){
                docSnapshot.ref.collection('carbon-emissions').where('date', '>', date).get()
                    .then(query => {
                        query.forEach(doc => {
                            let curDoc =doc.data();
                            let total =curDoc['carbon-emission'];
                            console.log(curDoc)
                            obj['total']+=total;
                            if (curDoc["type"]){
                                if(obj[curDoc["type"]]){
                                    obj[curDoc["type"]]+=total;
                                }else{
                                    obj[curDoc["type"]]=total;
                                }
                            }
                            
                        });
                        res.status(200).json(obj);
                    })
                    .catch(err=>res.status(401).json({reason:"query error"}));
                
            }else{
                return; 
            }
            
        })
        .catch(err=>res.status(400).json({reason:"user not found"}));
});

/**
 * POST USER createuser
 * creates new user in the database
 *
 * @param {str}  uid which user to get.
 * @return {JSONObject} object of all the types of C02 usage.
 */
router.post('/createUser',(req,res) =>{
    var uid =req.body.uid;
    if(!uid){
        res.status(404).json({reason:"no uid"});
        return;
    }
    let newUser = firestore.collection('users').doc(uid);
    newUser.create({
        "carbon-emission":0,
        "last-update":new Date()
    })
        .then((ret)=>res.status(200).json(ret))
        .catch((err)=>res.status(400).json({reason:err}));

});
/**
 * POST USER createuser
 * creates new carbon-emission log
 *
 * @param {str} uid which user to get.
 * @param {str} type what type of emission
 * @param {number} total emisson total of the type
 * @return {JSONObject} object of all the types of C02 usage.
 */
router.post('/createEmission', (req,res) => {
    console.log("1");
    var uid  =req.body.uid;
    var type =req.body.type;
    var total=req.body.total;
    if(!uid || !type || !total){
        res.status(404).json({reason:"no uid"});
    }
    firestore.doc(`users/${uid}`).onSnapshot(snap =>{
        if(snap.exists){
            snap.ref.collection('carbon-emissions').doc().create({
                "carbon-emission":total,
                "date":new Date(),
                "type":type
            })
                .then((ret)=>{
                    res.status(200).json(ret);
                    //let doc =snap.data();
                    //snap.ref.update({
                    //    "carbon-emission":doc["carbon-emission"]+total,
                    //    "last_update": new Date()
                    //})
                    //    .then((ret)=>{
                    //        res.status(200).json(ret);
                    //        console.log("4");
                    //    })
                    //    .catch((err)=>res.status(400).json(err));
                })
                .catch((err)=>res.status(400).json({reason:err}));
        }else{
            res.status(400).json({reason:"User does not exist"});
        }
    })
});
module.exports =router;