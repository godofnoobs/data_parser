const fs = require('fs');
const path = require('path');

const defaultParams = {
    fileName: 'court_data.csv',
};

const translateDict = {
    'Суд': 'court',
    'Тип производства': 'process_type',
    'Номер дела': 'case_num',
    'Наименование истца': 'claimant',
    'Наименование ответчика': 'defendant',
    'Сущность спора': 'subject',
    'Дата судебного заседания': 'process_date',
    'Время судебного заседания': 'process_time',
    '№ кабинета': 'room_num',
    'Судья': 'judge',
    'Наименование кредитора': 'claimant',
    'Наименование должника': 'defendant',
    'Другие лица, участвующие в деле': 'other_sides',
    'Уполномоченный орган, составивший протокол об административном правонарушении': 'claimant',
    'Лицо, в отношении которого ведется административный процесс': 'defendant',
    'Истец,Взыскатель,Заявитель,Кредитор': 'claimant',
    'Ответчик,Должник': 'defendant',
    'Судья/Примиритель': 'judge',
    'Наименование заявителя': 'claimant',
    '№ дела': 'ext_case_num',
    'Дата слушания': 'process_date',
    'Лицо, подавшее жалобу (протест)': 'claimant',
    'Наименование взыскателя': 'claimant',
};

const keys = [
    'court',
    'process_type',
    'case_num',
    'claimant',
    'defendant',
    'other_sides',
    'judge',
    'subject',
    'process_date',
    'process_time',
    'room_num',
    'ext_case_num'
];


class CSVSsver {
    constructor (params = defaultParams) {
        this.name = params.fileName;
    }

    saveCSV(arr) {
        arr.forEach((it) => {
            const values = [];
            const row = this.normalize(it);
            keys.forEach((key) => {
                values.push(row[key])
            });
            const line = values.join('$') + '\n';
            fs.writeFileSync(this.name, line, { flag: 'a' });
        });
    }
    
    normalize(it) {
        const resObj = {};
        keys.forEach((it) => {
            resObj[it] = '';
        });
        Object.keys(it).forEach((key) => {
            resObj[translateDict[key]] = it[key];
        });
        return resObj;
    }
}

module.exports = CSVSsver;
