const moment = require("moment");

const date = new Date();

const res = moment("2020-01-18T21:03:53.616Z").format("DD-MM-YY");
const res2 = moment(date).format("DD-MM-YY");

moment(res, "DD-MM-YY").fromNow();
moment().diff("2020-01-18T21:03:53.616Z", "m");
