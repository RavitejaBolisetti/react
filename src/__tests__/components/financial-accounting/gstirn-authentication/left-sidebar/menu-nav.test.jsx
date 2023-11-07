/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from "@testing-library/react";
import MenuNav from 'components/FinancialAccounting/GSTIRNAuthentication/LeftSidebar/MenuNav';

describe("MenuNav", ()=>{
    it("render", ()=>{
        const GSTSectionList = {
            BRANCH_ACCESSIBLE: {
                id: 1,
                title: 'Branch Accessible',
                displayOnList: true,
            },
            IRN_TRANSACTION: {
                id: 2,
                title: 'IRN Transaction List',
                displayOnList: true,
            },
        };

        customRender(<MenuNav isVisible={true} GSTSectionList={GSTSectionList} setCurrentSection={jest.fn()} />);

        const titleText = screen.getByText('Branch Accessible');
        fireEvent.click(titleText);
    })
})