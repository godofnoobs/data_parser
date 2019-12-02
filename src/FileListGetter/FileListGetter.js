const path = require("path");
const fs = require("fs");

const defaultParams = {
    pathToDirectory: '../../../src/Brest/',
};

// Return list of files by directories by given relative path
class FileListGetter {
    constructor(params = defaultParams) {
        this.params = params;
        this.init();
    }

    init() {
        this.directoryPath = path.join(__dirname, this.params.pathToDirectory);
    }
    
    getFileList(path) {
        this.listPth = [];
        if (path) {
            this.directoryPath = path.join(__dirname, this.params.pathToDirectory);
        }
        this.output();
        return(this.listPth);
    }
    
    output(currentPath = this.directoryPath) {
        const listPth = this.listPth;
        const output = this.output.bind(this);
        const files = fs.readdirSync(currentPath);
        files.forEach(function(file) {
            const fullPath = path.join(currentPath, file);
            if (fs.lstatSync(fullPath).isFile()) {
                listPth.push(fullPath);
            } else if (fs.lstatSync(fullPath).isDirectory()) {
                output(fullPath);
            }

        });
    }
    
    /*
    output(link = this.listObj, currentPath = this.directoryPath) {
        const output = this.output.bind(this);
        const files = fs.readdirSync(currentPath);
        files.forEach(function(file) {
            const fullPath = path.join(currentPath, file);
            if (fs.lstatSync(fullPath).isFile()) {
                if (!link.hasOwnProperty('localFiles')) {
                    link['localFiles'] = [];
                }
                link['localFiles'].push(file);
            } else if (fs.lstatSync(fullPath).isDirectory()) {
                link[file] = {};
                output(link[file], fullPath);
            }

        });
    }
    */
}


module.exports = FileListGetter;
