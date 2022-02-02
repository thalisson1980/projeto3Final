const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    createdAt:{
        type: Date,
        required: false,
        default: Date.now
    }, 
    key:{
        type: String,
        required: false,
        default: null
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});
const User = mongoose.model('user', UserSchema);

module.exports = User;