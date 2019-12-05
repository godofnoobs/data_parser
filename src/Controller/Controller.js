const FileListGetter = require('../FileListGetter/FileListGetter');
const PageFactory = require('../PageFactory/PageFactory');
const PageParser = require('../PageParser/PageParser');
const CSVSsver = require('../CSVSaver/CSVSaver');



class Controller {
    constructor(path) {
        this.path = path;
        this.init();
        this.do();
    }
    
    init() {
        this.fileGetter = new FileListGetter({ pathToDirectory: this.path });
        this.pageFactory = new PageFactory(this.fileGetter.getFileList());
        this.pageParser = new PageParser();
        this.saver = new CSVSsver();
    }
    

    do() {
        let count = 0;
        while(1) {
            const nextPage = this.pageFactory.getPage();
            if (!nextPage) {
                break;
            }
            this.pageParser.createDOM(nextPage);
            const rows = this.pageParser.parsePage();
            count += 1;
            if (count % 100 === 0) {
                console.log('COUNT: ', count);
            }
            if (rows.length) {
                this.saver.saveCSV(rows);
            }
        }
    }
}

module.exports = Controller;
