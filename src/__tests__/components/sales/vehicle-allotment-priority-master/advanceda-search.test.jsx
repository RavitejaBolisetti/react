/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AdvancedSearch } from '@components/Sales/VehicleAllotmentPriorityMaster/AdvancedSearch';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});
const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    return <AdvancedSearch advanceFilterForm={advanceFilterForm} {...props} />;
};

describe('advanced search component render', () => {
    it('should render advanced search button component', async () => {
        customRender(<FormWrapper isVisible={true} setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} />);
        // const searchBtn = screen.getByRole('button', { name: 'Search' });
        // fireEvent.click(searchBtn);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
        // const closeCircle = screen.getAllByRole('button', { name: 'close-circle' });
        // fireEvent.click(closeCircle[0]);
        // fireEvent.click(closeCircle[1]);
    });

    it('should render calender component', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} isVisible={true} />);

        const calendarBtn = screen.getAllByRole('img', { name: 'calendar' });
        fireEvent.click(calendarBtn[0]);
        fireEvent.click(calendarBtn[1]);

        const dateTime1 = screen.getAllByText('28');
        fireEvent.click(dateTime1[0]);
        fireEvent.click(dateTime1[1]);

        const dateTime2 = screen.getAllByText('29');
        fireEvent.click(dateTime2[0]);
        fireEvent.click(dateTime2[1]);


        const closeCircle = screen.getAllByRole('img', { name: 'close-circle' });
        fireEvent.click(closeCircle[0]);
        fireEvent.click(closeCircle[1]);
    });

    it('combobox should work', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} isVisible={true} />);
        const oldModel = screen.getByRole('combobox', { name: 'Old Model' });
        fireEvent.click(oldModel);

        const newModel = screen.getByRole('combobox', { name: 'New Model' });
        fireEvent.click(newModel);
    });

    it('shoild render advanced search input text', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} isVisible={true} />);
        const effectiveFromDate = screen.getByRole('textbox', { name: 'Effective From Date' });
        fireEvent.click(effectiveFromDate);

        const effectiveToDate = screen.getByRole('textbox', { name: 'Effective To Date' });
        fireEvent.click(effectiveToDate);
    });
});
