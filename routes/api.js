var express = require('express');
var router = express.Router();
const { add, gets } = require('./../memcached');
let trackingID = [];
let counter = 0;

router.get('/', (req, res, next) => {
    res.send({status:'Backend is UP'});
});

router.get('/dataCaptured',async (req,res,next) => {
    const result = await gets(trackingID);
    if(result.message) res.send(result);
    else{
        trackingID.splice(0,trackingID.length);
        trackingID = result.data;
        const jsonObj = {};
        result.data.forEach(id=>{
            let  key = id.substring(0,id.indexOf('_'));
            if(!jsonObj[key]) jsonObj[key] =1;
            else jsonObj[key] += 1;
        })
        const output = {
            totalEventsCaptured:result.data.length,
            eventsCapturedByTrackingIds: jsonObj
        }
        res.send(output);
    }
});

router.post('/setEvents',async (req,res,next) => {
    counter++;
    trackingID.push(req.body.value.trackingId+"_"+counter);

    const result = await add(req.body.value.trackingId+"_"+counter, '');
    res.send(result);
});

module.exports = router;
