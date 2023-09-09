/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AdvancedSearch } from '@components/Sales/VehiclePurchaseOrder/AdvancedSearch';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});
const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    return <AdvancedSearch advanceFilterForm={advanceFilterForm} {...props} />;
};

describe('advanced search component render', () => {
    it('should render advanced search component', async () => {
        customRender(<FormWrapper isVisible={true} typeData={['PO_CNCL_RSN']} />);
    });

    it('should click when user click on button', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} isVisible={true} typeData={['PO_CNCL_RSN']} />);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
        const searchBtn = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchBtn);
    });

    it('should click when user click on img button', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} isVisible={true} typeData={['PO_CNCL_RSN']} />);
        const closeBtn = screen.getByRole('img', { name: 'close' });
        fireEvent.click(closeBtn);
        const calendarBtn = screen.getAllByRole('img', { name: 'calendar' });
        fireEvent.click(calendarBtn[0]);
        fireEvent.click(calendarBtn[1]);
    });

    it('should click when user click on combobox', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} isVisible={true} typeData={['PO_CNCL_RSN']} />);
        const closeBtn = screen.getByRole('combobox', { name: 'Order Type' });
        fireEvent.click(closeBtn);
        const calendarBtn = screen.getByRole('combobox', { name: 'Order Status' });
        fireEvent.click(calendarBtn);
    });

    it('should click when user click on textbox', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} isVisible={true} typeData={['PO_CNCL_RSN']} />);
        const fromdateBtn = screen.getByRole('textbox', { name: 'From Date' });
        fireEvent.click(fromdateBtn);
        const todateBtn = screen.getByRole('textbox', { name: 'To Date' });
        fireEvent.click(todateBtn);
        const purchaseOrderBtn = screen.getByRole('textbox', { name: 'Purchase Order Number' });
        fireEvent.click(purchaseOrderBtn);
    });

    it('should click when user click on dialog button', async () => {
        customRender(<FormWrapper setFilterString={jest.fn()} isVisible={true} typeData={['PO_CNCL_RSN']} />);
        const dialogBtn = screen.getByRole('dialog', { name: '' });
        fireEvent.click(dialogBtn);
    });
});
