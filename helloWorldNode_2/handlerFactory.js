const servePage = require('./utils/servePage');

class DateHandler {
    constructor(dateTransformer, label) {
        this.dateTransformer = dateTransformer;
        this.label = label;
    }

    handle(req, res) {
        const date = new Date();
        const transformedDate = this.dateTransformer(date);
        const message = `${this.label} ${getWeekday(transformedDate.getDay())}.`;
        servePage(res, message);
    }
}

function getWeekday(dayIndex) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayIndex];
}

module.exports = { DateHandler };
