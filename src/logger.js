'use strict'
const chalk = require('chalk');
const log = console.log;

function printLog(text, focus) {
    if (focus) {
        log(chalk.bgBlueBright.bold(new Date().toLocaleString() + ' - ' + text));
    } else {
        log(chalk.whiteBright(new Date().toLocaleString() + ' - ' + text));
    }
}

function printError(text) {
    log(chalk.redBright.bgWhite.bold(new Date().toLocaleString() + ' - ' + text));
}

function printLine() {
    log(chalk.greenBright.bold('------------------------------------------------------------------------------------------'));
}

function clear() {
    console.clear();
}

function printLogo() {
    log(`
    #  ╦ ╦┌─┐┌┬┐┌─┐┬ ┬┌┬┐┌─┐┌┐┌
    #  ║║║├─┤ │ │  ├─┤│││├┤ │││
    #  ╚╩╝┴ ┴ ┴ └─┘┴ ┴┴ ┴└─┘┘└┘ exportador  - 1.0.0 beta
    ----------------------------------------------------
    `
    );
}
module.exports = { printLog, printError, printLine, clear, printLogo };
