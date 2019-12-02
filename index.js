const Controller = require('./src/Controller/Controller');

/*
const mock = [
    'E:\\EPAM\\DEBA\\Homework\\3.final_project\\work\\parser\\src\\Brest\\2014\\2014-04-02.txt',
    'E:\\EPAM\\DEBA\\Homework\\3.final_project\\work\\parser\\src\\Brest\\2014\\2014-04-03.txt',
    'E:\\EPAM\\DEBA\\Homework\\3.final_project\\work\\parser\\src\\Brest\\2014\\2014-04-04.txt'
]
*/

const cl = new Controller();
cl.do();


/*

const fileGetter = new FileListGetter();
//const pageFactory = new PageFactory(mock);
const pageParser = new PageParser();

const pageParser = new PageParser();

let count = 0;
while(1) {
    const nextPage = pageFactory.getPage();
    if (!nextPage) {
        break;
    }
    pageParser.createDOM(nextPage);
    pageParser.parsePage();
    count += 1;
    if (count % 100 === 0) {
        console.log('COUNT: ', count);
        //(async () => { await new Promise(resolve => setTimeout(resolve, 30000)); })();
    }
}

console.log('PR', pageParser.propertiesList);


const z = pageFactory.getPage();

pageParser.createDOM(z);
pageParser.parsePage();
*/
