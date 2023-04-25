const { Schema, model } = require('mongoose')

const EventSchema = new Schema({
    event: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    startDate: {
        type: String,
        
    },
    endDate: {
        type: String,
        
    },
});

const CrudSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    events: [EventSchema],
});

const Crud = model('crud', CrudSchema)

module.exports = Crud