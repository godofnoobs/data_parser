// const jsdom = require("jsdom");
const { JSDOM } = require("jsdom");



class PageParser{
    constructor() {
        this.propertiesList = [];
    }
    
    createDOM(pageHTML) {
        this.dom = new JSDOM(pageHTML);
    }
    
    getCourt() {
        const elem = this.dom.window.document.querySelector('.b-oblcourt_top');
        const court = (elem) ? elem.innerHTML.trim(' ') : elem;
        return court;
    }
    
    getSchedule() {
        const schedulefFirstSibiling = this.dom.window.document.querySelector('.b-schedule_list');
        return schedulefFirstSibiling;
    }
    
    getCourtType(elem) {
        const courtType = elem.innerHTML;
        return courtType;
    }
    
    parsePage() {
        const rowPage = { [propsDefaults['court']]: this.getCourt() };
        if (!this.propertiesList.includes(propsDefaults.court)) {
            this.propertiesList.push(propsDefaults.court);
            this.propertiesList.push(propsDefaults.courtType);
            this.propertiesList.push(propsDefaults.caseNum);
        };
        
        this.parseCourtTypes(rowPage);
        
        // try to avoid memory leaks
        this.dom = null;
        //console.log('PR', this.propertiesList);
    }
    
    parseCourtTypes(rowPage) {
        let rowType = Object.assign({}, rowPage);
        let elem = this.getSchedule();
        if (!elem) {
            return;
        }
        while (1) {
            elem = elem.nextSibling;
            if (!elem) {
                break;
            } else if (!elem.tagName) {
                continue;
            }
            if (elem.tagName === 'H4') {
                rowType = Object.assign({}, rowPage);
                rowType[propsDefaults.courtType] = elem.firstChild.innerHTML;
            } else if (elem.tagName === 'TABLE') {
                let row = Object.assign({}, rowType);
                this.parseCase(elem, row);
            }
        }
        // try to avoid memory leaks
        elem = null;
        rowType = null;
    }
    
    parseCase(el, row) {
        let elem = el.querySelector('tr');
        row[propsDefaults.caseNum] = elem.firstChild.innerHTML.split(':')[1].trim(' ');
        while (1) {
            elem = elem.nextSibling;
            if (!elem) {
                break;
            } else if (!elem.tagName) {
                continue;
            }
            const attr = elem.querySelector('span').innerHTML;
            const value = elem.querySelector('td:last-of-type').innerHTML;
            row[attr] = value;
            if (!this.propertiesList.includes(attr)) {
                this.propertiesList.push(attr);
            }
        }
        //console.log('ROW', row);
    }

}

var propsDefaults = {
    court: 'Суд',
    courtType: 'Тип производства',
    caseNum: 'Номер дела',
};

module.exports = PageParser;
