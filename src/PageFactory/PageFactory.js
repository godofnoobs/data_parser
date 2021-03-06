const path = require('path');
const fs = require('fs');
const windows1251 = require('windows-1251');


class PageFactory {
    constructor(listPth = []) {
        this.listPth = listPth;
    }
    
    getPage() {
        const path = this.listPth.pop();
        if (!path) {
            return;
        }
        let pageHTML = windows1251.decode(fs.readFileSync(path).toString('binary'));
        return pageHTML;
    }
}


module.exports = PageFactory;
