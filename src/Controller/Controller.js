const FileListGetter = require('../FileListGetter/FileListGetter');
const PageFactory = require('../PageFactory/PageFactory');
const PageParser = require('../PageParser/PageParser');



class Controller {
    constructor() {
        this.init();
        this.do();
    }
    
    init() {
        this.fileGetter = new FileListGetter();
        this.pageFactory = new PageFactory(this.fileGetter.getFileList());
        this.pageParser = new PageParser();
    }

    do() {
        let count = 0;
        while(1) {
            const nextPage = this.pageFactory.getPage();
            if (!nextPage || count > 500) {
                break;
            }
            this.pageParser.createDOM(nextPage);
            this.pageParser.parsePage();
            count += 1;
            if (count % 100 === 0) {
                console.log('COUNT: ', count);
            }
        }

        console.log('PR', this.pageParser.propertiesList);
    }
}

module.exports = Controller;
