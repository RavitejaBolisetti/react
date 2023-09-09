import React from 'react';
import customRender from '@utils/test-utils';
import { tableColumn } from '@components/Sales/VehicleRecieptChecklist/CheckListDetails/tableCoulmn';

describe('CheckList Details table colcumn container', () => {
    it('Should render CheckList Details table colcumn components', () => {

        const props = {
            handleButtonClick: jest.fn(),
            formActionType: { viewMode: true }
        };

        const columns = tableColumn(props);
        customRender(<div>{columns[3].render('Test')}</div>);
    })
});