Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
}

Date.prototype.addHours = function(hours){
    this.setHours(this.getHours()+hours)
    return this;
}

module.exports= Date;