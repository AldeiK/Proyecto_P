const { query, text } = require('express');
const {Pool} = require('pg');
const conexion={
    user:  'postgres',
    port:  '5432', 
    database:'AS',
    host:'localhost',
    password:'123',
}
const pool =  new Pool(conexion);

module.exports={
    query:(text,params)=>pool.query(text,params)
}
