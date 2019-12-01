const FileListGetter = require('./src/FileListGetter/FileListGetter');
const PageFactory = require('./src/PageFactory/PageFactory');


const mock = [
    'E:\\EPAM\\DEBA\\Homework\\3.final_project\\work\\parser\\src\\Brest\\2014\\2014-04-02.txt',
    'E:\\EPAM\\DEBA\\Homework\\3.final_project\\work\\parser\\src\\Brest\\2014\\2014-04-03.txt',
    'E:\\EPAM\\DEBA\\Homework\\3.final_project\\work\\parser\\src\\Brest\\2014\\2014-04-04.txt'
]

console.log('FLG', FileListGetter);

const fileGetter = new FileListGetter();
const pageFactory = new PageFactory(mock);

const z = pageFactory.getPage().toString('binary');


console.log('nline', z);

/*
let zz = [];
for (let i of z) {
    zz.push(i)
}

console.log('nline', windows1251.zz.join(''));
*/
