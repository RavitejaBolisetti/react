import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, logRoles } from '@testing-library/react';
import AdvanceFilter from 'components/common/CustomerMaster/AdvanceFilter';

describe('Advance Filter component', () => {

    it('should render the advance filter component', () => {
        customRender(<AdvanceFilter />);
    });

    it('individual and corporate toggle button should work', () => {
        customRender(<AdvanceFilter settoggleButton={jest.fn()} />);

        const individualBtn=screen.getByRole('button', { name: 'Individual' });
        fireEvent.click(individualBtn);

        const corporateBtn=screen.getByRole('button', { name: 'Corporate' });
        fireEvent.click(corporateBtn);
    });

    it('options should display', () => {
        const showDealersDataList=[{
            dealerId: 106,
            dealerNm: 'test106'
        }]
        customRender(<AdvanceFilter showDealersDataList={showDealersDataList} />);

    });

    it('add button should work', () => {
        customRender(<AdvanceFilter handleAdd={jest.fn()} />);

        const addBtn=screen.getByRole('button', { name: 'plus Add' })
        fireEvent.click(addBtn);
    });

});