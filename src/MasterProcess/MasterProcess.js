const path = require('path');
const childProcess = require('child_process');

const defaultArgsList = [
    '..\\..\\..\\src\\Brest\\2014',
    '..\\..\\..\\src\\Brest\\2015',
    '..\\..\\..\\src\\Brest\\2016',
    '..\\..\\..\\src\\Gomel\\2014',
    '..\\..\\..\\src\\Gomel\\2015',
    '..\\..\\..\\src\\Gomel\\2016',
    '..\\..\\..\\src\\Grodno\\2014',
    '..\\..\\..\\src\\Grodno\\2015',
    '..\\..\\..\\src\\Grodno\\2016',
    '..\\..\\..\\src\\Minsk\\2014',
    '..\\..\\..\\src\\Minsk\\2015',
    '..\\..\\..\\src\\Minsk\\2016',
    '..\\..\\..\\src\\Minsk_city\\2014',
    '..\\..\\..\\src\\Minsk_city\\2015',
    '..\\..\\..\\src\\Minsk_city\\2016',
    '..\\..\\..\\src\\Vitebsk\\2014',
    '..\\..\\..\\src\\Vitebsk\\2015',
    '..\\..\\..\\src\\Vitebsk\\2016'
];

const defaultChildPath = '../childProcess/childProcess.js';



class MasterProcess {
    constructor(argsList = defaultArgsList, childPath = defaultChildPath) {
        this.argsList = argsList;
        this.childPath = path.join(__dirname, childPath);
    }

    doNextChild() {
        const arg = this.argsList.pop();
        const doNext = this.doNextChild.bind(this);
        if (!arg) {
            return;
        }
        const workerProcess = childProcess.fork(this.childPath, [arg]);
        workerProcess.on('close', function (code, signal) {
            console.log('child process exited with code ' + code, signal);
            doNext();
        });
    }
}




module.exports = MasterProcess;
