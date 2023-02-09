const mongoose = require('mongoose');

const {keys} = require('../keys')
mongoose.set(`strictQuery`, true)

async function getConnection (){
   await mongoose.connect(keys).then(()=>{
        console.log('database connected successfuly');
    })
}

module.exports = getConnection;