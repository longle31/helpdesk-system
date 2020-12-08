const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema =  mongoose.Schema;

const accountSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength : [6, 'Minium password is 6 characters']
    },
    employee:{
        type:Schema.Types.ObjectId,
        ref:'Employee',
        required: false
    },
    auth:{
        type: Number, // 0: manager  -1: technician -2: employee
        required: true
    }
});

accountSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

accountSchema.statics.login = async function (username, password){
    const account = await this.findOne({username});
    if(account){
        const auth = await bcrypt.compare(password, account.password);
        if(auth){
            return account;
        }
        throw Error ('incorrect password');
    }
    throw Error('incorrect username')
}
 
const Account = mongoose.model('Account', accountSchema);
module.exports = Account;