const { MEMCACHED_HOST, MEMCACHED_PORT } = require('./constants');
const Memcached = require('memcached');
const { rejects } = require('assert');
const { resolve } = require('path');
const memcached = new Memcached(`${MEMCACHED_HOST}:${MEMCACHED_PORT}`);

module.exports.add = (event,data) => {
  return new Promise((resolve, reject) =>{
    memcached.add(event, data, 100, (err) => {
     if(err) reject({status:'fail',error:err});
     resolve({status:'success'});
   })
  })
}
module.exports.gets = (event) => {
  console.log(event);
  if(!event.length) return {status:'success',message:'No Data Found'};
  return new Promise((resolve,reject) => {
    memcached.getMulti(event, (err, data) =>{
      if(err) rejects({status:'fail',error:err});
      console.log(data);
      resolve({status:'success',data:Object.keys(data)});
    });
  });
}