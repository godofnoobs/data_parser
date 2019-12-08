const cloneDeep = require('lodash.clonedeep');
const { JSDOM } = require("jsdom");


const propsDefaults = {
    court: 'Суд',
    courtType: 'Тип производства',
    caseNum: 'Номер дела',
};


class PageParser{
    constructor() {
        this.propertiesList = [];
        this.rows = [];
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
        this.rowPage = { [propsDefaults['court']]: this.getCourt() };
        if (!this.propertiesList.includes(propsDefaults.court)) {
            this.propertiesList.push(propsDefaults.court);
            this.propertiesList.push(propsDefaults.courtType);
            this.propertiesList.push(propsDefaults.caseNum);
        };
        
        this.parseCourtTypes();
        
        const result = cloneDeep(this.rows);
        this.rows = [];
        
        return result;
    }
    
    destroy() {
        this.dom.window.close();
        this.dom = null;
        this.propertiesList = null;
        this.rowPage = null;
        this.rowType = null;
        this.row = null;
        this.rows = null;
    }
    
    parseCourtTypes() {
        this.rowType = Object.assign({}, this.rowPage);
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
                this.rowType = Object.assign({}, this.rowPage);
                this.rowType[propsDefaults.courtType] = elem.firstChild.innerHTML;
            } else if (elem.tagName === 'TABLE') {
                this.row = Object.assign({}, this.rowType);
                this.parseCase(elem);
            }
        }
    }
    
    parseCase(el) {
        let elem = el.querySelector('tr');
        this.row[propsDefaults.caseNum] = elem.firstChild.innerHTML.split(':')[1].trim(' ');
        while (1) {
            elem = elem.nextSibling;
            if (!elem) {
                break;
            } else if (!elem.tagName) {
                continue;
            }
            const attr = elem.querySelector('span').innerHTML;
            const value = elem.querySelector('td:last-of-type').innerHTML;
            this.row[attr] = value;
            if (!this.propertiesList.includes(attr)) {
                this.propertiesList.push(attr);
            }
        }
        const currenRow = Object.assign({}, this.row);
        this.rows.push(currenRow);
    }

}

module.exports = PageParser;
