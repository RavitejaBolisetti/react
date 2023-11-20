import { BindFormAndResult } from 'components/Sales/Common/ChecklistDetails/CheckListUtils';

describe('Check list utils form Component', () => {
    it('Should render Check list utils dr components', () => {
        const data = {
            answerType: 'dr',
            answerText: 'test',
            answerFromDate: undefined,
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils components', () => {
        const data = {
            answerType: 'dr',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils NWD components', () => {
        const data = {
            answerType: 'nwd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils NWD undefind components', () => {
        const data = {
            answerType: 'nwd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: undefined,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils D components', () => {
        const data = {
            answerType: 'd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils D false components', () => {
        const data = {
            answerType: 'd',
            answerText: 'test',
            answerFromDate: undefined,
            answerToDate: undefined,
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils TG components', () => {
        const data = {
            answerType: 'tg',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils TG false components', () => {
        const data = {
            answerType: 'tg',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: false,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils NRWTD components', () => {
        const data = {
            answerType: 'nrwtd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils NRWTD false components', () => {
        const data = {
            answerType: 'nrwtd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: undefined,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils NRWD components', () => {
        const data = {
            answerType: 'nrwd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });
    it('Should render Check list utils NRWD false components', () => {
        const data = {
            answerType: 'nrwd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: undefined,
            answerToNumberDecimal: undefined,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils FIX components', () => {
        const data = {
            answerType: 'fix',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
            checklistAnswerResponses: [{ key: 1, value: 'test' }],
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils FIX false components', () => {
        const data = {
            answerType: 'fix',
            answerText: undefined,
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils OT components', () => {
        const data = {
            answerType: 'ot',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils nwtd false components', () => {
        const data = {
            answerType: 'nwtd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: undefined,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });

    it('Should render Check list utils NWTD components', () => {
        const data = {
            answerType: 'nwtd',
            answerText: 'test',
            answerFromDate: '02-03-1991',
            answerToDate: '02-03-1991',
            answerBoolean: true,
            answerFromNumber: 254,
            answerToNumber: 234,
            answerDescription: 'testing for data',
            answerFromNumberDecimal: 0.3,
            answerToNumberDecimal: 0.4,
        };
        BindFormAndResult(data);
    });
});
