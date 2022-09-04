const express =require('express');
const app =require('../../firebase')
const firebase =require('firebase-admin');
const {getFirestore,Timestamp} =require('firebase-admin/firestore');
const router =express.Router();
const MoDaYeDate = require("../../CustomObjects/MonthDayYearDate")

const firestore = getFirestore(app);
const groups =["energy","transportation","food"]
const categories={
    "veg":"food",
    "nonveg":"food",
    "electric":"energy",
    "gas":"energy",
    "carMileage":"transportation",
    "airMileage":"transportation",
}
//router.use(decodeIDToken);
/**
 * Decodes the JSON Web Token sent via the frontend app
 * Makes the currentUser (firebase) data available on the body.
 */
async function decodeIDToken(req, res, next) {
    
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req['currentUser'] = decodedToken;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}


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
                docSnapshot.ref.collection('carbon-emissions').where('date', '>', date).orderBy('date').get()
                    .then(query => {
                        query.forEach(doc => {
                            let curDoc =doc.data();
                            let d = curDoc['date'];
                            
                            
                            
                                                        
                            let total =curDoc['carbon-emission'];
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
 * GET USER totals if there is not document for the day add the last document
 * 
 * 
 * Returns total C02 usage within a span .
 * ex:
 * {
 *  total:x
 *  cat1:y
 *  cat2:z
 *  [labels day1 to current]
 *  [total day1 to current]
 *  [cat1 day1 to current]
 *  [cat2 day1 to current]
 *
 * }
 *
 * @param {str} span last month,last year, last week,all time.
 * @param {str}  uid which user to get.
 * @return {JSONObject} object of all the types of C02 usage.
 */
router.get('/totaler', (req,res) => {
    
    var uid, span;
    uid = req.query.uid
    span = req.query.span
    if(!uid || !span || uid ===undefined || uid ==="undefined"){
        res.status(400).json({succes:false,reason:"no parameters"});
        return;
    }
    let docRef = firestore.doc(`users/${uid}`);
    let date =new Date()
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
    obj["total-date"]=[];
    obj.labels=[];
    groups.forEach((key)=>{
        obj[key]=0
        obj[key+"-date"]=[];
    });
    docRef.get()
        .then(docSnapshot => {
            if(docSnapshot.exists){
                docSnapshot.ref.collection('carbon-emissions').where('date', '>', date).orderBy('date').get()
                    .then(query => {
                        let n = query.docs.length;
                        
                        let docs =query.docs;
                        let i = 0;
                        while(i < n){
                            
                            let cur_d=MoDaYeDate.of(docs[i].data()['date']["_seconds"],docs[i].data()['date']["_nanoseconds"]).toDate();
                            let next_d;
                            if(i==n-1){
                                next_d=new MoDaYeDate(new Date()).toDate();
                                next_d.setDate(next_d.getDate() + 1)
                            }else{
                                next_d=MoDaYeDate.of(docs[i+1].data()['date']["_seconds"],docs[i+1].data()['date']["_nanoseconds"]).toDate();
                            }
                            
                            for (var d = cur_d; d <next_d; d.setDate(d.getDate() + 1)) {
                                
                                obj.labels.push(new MoDaYeDate(d).toString());
                                
                                let doc = docs[i].data();
                                let cur_t=0
                                let cur_cat={}
                                groups.forEach((key)=>cur_cat[key]=0);

                                Object.keys(categories).forEach((key)=>{
                                    cur_cat[categories[key]]+=doc[key]
                                    cur_t+=doc[key]
                                    
                                })
                                
                                
                                obj.total+=cur_t;
                                obj["total-date"].push(cur_t)
                                groups.forEach((key)=>{
                                    obj[key]+=cur_cat[key]
                                    obj[key+"-date"].push(cur_cat[key])
                                });
                            }
                            i+=1
                        }
                
                        res.status(200).json(obj);
                    })
                    .catch(err=>res.status(401).json({reason:"query error","obj":obj}));
                
            }else{
                return; 
            }
            
        })
        .catch(err=>res.status(400).json({reason:"user not found"}));
});

/**
 * GET USER gets last span docs
 * gets most recent doc in the span
 *
 * @param {str}  uid which user to get.
 * @param {str}  span which user to get.
 * @return {JSONObject} of all docs in query.
 */
router.get('/all',(req,res)=>{
    var uid, span;
    uid = req.query.uid
    span = req.query.span
    if(!uid || !span){
        res.status(400).json({succes:false,reason:"no parameters"});
        return;
    }
    let docRef = firestore.doc(`users/${uid}`);
    
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
    var obj={};
    docRef.get()
        .then(docSnapshot => {
            if(docSnapshot.exists){
                docSnapshot.ref.collection('carbon-emissions').where('date', '>', date).orderBy('date',"desc").get()
                    .then((query)=>{
                        query.forEach((doc)=>{
                            let curDoc =doc.data()
                            if (curDoc["type"]){
                                if(obj[curDoc["type"]]){
                                    obj[curDoc["type"]].push(curDoc)
                                }
                                else{
                                    obj[curDoc["type"]]=[]
                                    obj[curDoc["type"]].push(curDoc)
                                }
                            }
                        })
                        res.status(200).json(obj);
                    })
            }else{
                res.status(400).json({user:"does not exist"})
            }
        });




});
/**
 * GET USER gets last category update
 * gets most recent doc in the categoty
 *
 * @param {str}  uid which user to get.
 * @param {str}  category which user to get.
 * @return {JSONObject} of time taken to make query.
 */
router.get('/lastupdatecat',(req,res)=>{
    const category =req.query.category;
    const uid=req.query.uid;

    let docRef = firestore.doc(`users/${uid}`);
    docRef.get()
        .then((snap)=>{
            if(snap.exists){
                docRef.collection("carbon-emissions").where("category","==",category).orderBy('date',"desc").limit(1).get().then(query =>{
                    if(query.empty){
                        res.status(200).json(0);
                    }else{
                        query.forEach(doc => {
                            res.status(200).json(doc.data()["carbon-emission"])
                            return;
                        });
                    }
                })
            }else{
                res.status(400).json({"user":"not found"});
            }

        })

});
router.get('/lastdoc',(req,res)=>{
    
    const uid=req.query.uid;

    let docRef = firestore.doc(`users/${uid}`);
    docRef.get()
        .then((snap)=>{
            if(snap.exists){
                docRef.collection("carbon-emissions").orderBy('date',"desc").limit(1).get().then(query =>{
                    if(query.empty){
                        res.status(200).json({});
                    }else{
                        query.forEach(doc => {
                            res.status(200).json(doc.data())
                            return;
                        });
                    }
                })
            }else{
                res.status(400).json({"user":"not found"});
            }

        })

});

router.get('/lastupdated',(req,res)=>{
    const uid =req.query.uid;

    let docRef = firestore.doc(`users/${uid}`);
    docRef.get()
        .then((snap)=>{
            if(snap.exists){
                res.status(200).json(snap.data()["last_update"])
            }else{
                res.status(400).json({"user":"not found"});
            }

        })


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
        "last_update":new Date()
    })
        .then((ret)=>res.status(200).json(ret))
        .catch((err)=>res.status(200).json({reason:err}));

});
/**
 * POST USER createuser
 * creates new carbon-emission log
 *
 * @param {str} uid which user to get.
 * @param {str} type what type of emission
 * @param {number} total emisson total of the type
 * @return {JSONObject} time taken for update
 */
router.post('/createEmission', (req,res) => {
    var uid  =req.body.uid;
    var type =req.body.type;
    var total=req.body.total;
    var category=req.body.category;
    if(!uid || !type || !total ||!category){
        res.status(404).json({reason:"no uid"});
    }
    let userdoc =firestore.doc(`users/${uid}`);
    userdoc.get().then(snap =>{
        if(snap.exists){
            snap.ref.collection('carbon-emissions').doc().create({
                "carbon-emission":total,
                "date":new Date(),
                "type":type,
                "category":category
            })
                .then((ret)=>{
                    let doc =snap.data();
                    userdoc.update({
                        "last_update": new Date()
                    })
                    
                        .then((ret)=>{
                            res.status(200).json(ret);
                        })
                        .catch((err)=>res.status(400).json(err));
                })
                .catch((err)=>res.status(400).json({reason:err}));
        }else{
            res.status(400).json({reason:"User does not exist"});
        }
    })
});

/**
 * POST USER createuser
 * creates new user in the database
 *
 * @param {str}  uid which user to get.
 * @param {Object} data of all the types of categories
 * @return {JSONObject} object of all the types of C02 usage.
 */
router.post('/createdoc',(req,res)=>{
    var uid = req.body.uid;
    var date;
    if(req.body.date){
        date=new Date(req.body.date);
    }
    var data =req.body.data;
    if(!uid || !data){
        res.status(404).json({reason:"missing info to post"});
    }
    let userDoc =firestore.collection('users').doc(uid);
    userDoc.get().then((snap)=>{
        //check if user exists
        if(snap.exists){
            let last_update =snap.data()["last_update"]
            //create new doc for the day in data'
            last_update =MoDaYeDate.of(last_update["_seconds"],last_update["_nanoseconds"])
            let currentDate=new MoDaYeDate(Timestamp.now().toDate());
            if(date){
                currentDate=new MoDaYeDate(date)
            }
            
            if (currentDate.equals(last_update) || date){//doc created today already just needs to upodate it
                snap.ref.collection('carbon-emissions').where("date","==",currentDate.toDate()).limit(1).get()
                    .then(query=>{
                        if(query._size > 0){
                            console.log("updating doc")
                            query.forEach((doc=>{
                                doc.ref.update(data)
                                    .then((ret)=>res.status(200).json(ret))
                                    .catch((err)=>res.status(400).json(err))
                            }))
                        }else{//no document in query occurs only on new account creation ]
                            
                            console.log("creating  old doc")
                            data["date"]=currentDate.toDate();
                            snap.ref.collection('carbon-emissions').doc().create(data)
                                .then(()=>{
                                    if(!req.body.date){
                                        userDoc.update({last_update:data["date"]})
                                    }
                                })
                                .then((ret)=>res.status(200).json(ret))
                                .catch((err)=>res.status(400).json(err));
                        }
                    })
                
            }else{
                //creating new doc
                data["date"]=currentDate.toDate();
                snap.ref.collection('carbon-emissions').doc().create(data)
                    .then(()=>{
                        userDoc.update({last_update:data["date"]})
                    })
                    .then((ret)=>res.status(200).json(ret))
                    .catch((err)=>res.status(400).json(err));
            }
        }else{
            res.status(400).json({"reason":"uid does not exist"})
        }
    })

})
router.get('/profile',(req,res)=>{
    var uid = req.query.uid;

    let userDoc =firestore.collection('users').doc(uid);
    userDoc.get()
        .then((snap)=>{
        //check if user exists
        if(snap.exists){
            res.status(200).json(snap.data());
        }else{
            res.status(400).json({"reason":"user not found"})
        }
        })
        .catch(()=>res.status(400).json({"reason":"idk"}))
        

})

router.post('/profile',(req,res)=>{
    var uid =req.body.uid;
    var data=req.body.data;

    let userDoc =firestore.collection('users').doc(uid);
    userDoc.get()
        .then((snap)=>{
        //check if user exists
        if(snap.exists){
            snap.ref.update(data)
                .then(()=>res.status(200).json(data))
                .catch(()=>res.status(400).json({"reason":"idk"}))
            
        }else{
            res.status(400).json({"reason":"user not found"})
        }
        })
        .catch(()=>res.status(400).json({"reason":"idk"}))



})


module.exports =router;