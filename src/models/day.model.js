import mongoose from 'mongoose'

const months = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ]

const DaySchema = new mongoose.Schema({
    date: Date,
    type: String,
    hours: Number,
    person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person' },
    tasks: [{
        project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
        description: String,
        hours: Number
    }]
}, { collection: 'calendar' })


DaySchema.virtual('weekday').get(function() { return this.date.getDay() })

DaySchema.virtual('day').get(function() { return this.date.getDate() })

DaySchema.virtual('month').get(function() { return this.date.getMonth() })

DaySchema.virtual('year').get(function() { return this.date.getFullYear() })

DaySchema.virtual('datum').get(function() { 
    let strDat = this.day + '.' + months[this.month] + '.' + this.year
    if(strDat.length===10) strDat = '0' + strDat
    return strDat
})

DaySchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Day', DaySchema)
