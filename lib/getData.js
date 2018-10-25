'use strict';

const moment = require("moment");
const neatCsv = require('neat-csv');
const R = require("ramda");

module.exports = async function getData(startDate, endDate) {
    if (!moment(startDate, "YYYY-MM-DD", true).isValid()) throw new Error("Start date is invalid.");
    if (!moment(endDate, "YYYY-MM-DD", true).isValid()) throw new Error("End date is invalid.");

    const baseUrl = `https://dashboard.yieldlove.com/api/${this.key}/${startDate}/${endDate}`;

    const csv = await this.dispatch(baseUrl);
    const csvParsed = await neatCsv(csv, {separator: ";"});

    const csfFiltered = csvParsed.filter(row =>
        Object.values(row)[0] !== undefined
    );

    return findSum(csfFiltered, {});
};

function findSum(csv, result) {
    const index = R.findIndex(row => row.Placement === "SUM", csv);

    if (index <= 0) return result;

    const data = csv[index];
    const webName = R.head(R.split("_", csv[index - 1]["Placement"]));

    if (webName && webName !== "") result[webName] = data;

    return findSum(R.takeLast(csv.length - index - 1, csv), result)
}