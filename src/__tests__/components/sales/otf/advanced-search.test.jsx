/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { AdvancedSearch } from 'components/Sales/OTF/AdvancedSearch';
import { Form } from 'antd';
afterEach(() => {
    jest.restoreAllMocks();
  });
const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    return <AdvancedSearch advanceFilterForm={advanceFilterForm} {...props} />
}

describe('advanced search component render', () => {

    it("should render advanced search component",async ()=>{
        customRender(<FormWrapper isVisible={true}/>);
    });

    it("reset button should work",async ()=>{
        customRender(<FormWrapper setFilterString={jest.fn()} isVisible={true}/>);
        const resetBtn=screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it("apply button with form submitted successfully should work",async ()=>{
        customRender(<FormWrapper setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} isVisible={true}/>);
        const calendarBtn=screen.getAllByRole('img', { name: 'calendar' });

        fireEvent.click(calendarBtn[0]);
        const dateTime1=screen.getByText('28');
        fireEvent.click(dateTime1);

        fireEvent.click(calendarBtn[1]);
        const dateTime2=screen.getAllByText('29');
        fireEvent.click(dateTime2[1]);

        const applyBtn=screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);

    });

    it("apply button with form finished failed should work",async ()=>{
        customRender(<FormWrapper isVisible={true}/>);
        const applyBtn=screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });

});
