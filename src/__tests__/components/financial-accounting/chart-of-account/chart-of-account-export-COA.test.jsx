/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ExportCOA } from '@components/FinancialAccounting/ChartOfAccount/ExportCOA';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe("ExportCOA component render", ()=>{
    const props = {
        modalOpen:true,
        onCoaFinish:jest.fn(),
        onFinishFailed:jest.fn(),
        setModalOpen:jest.fn(),
    };
    
    it("cancelBtn", ()=>{
        customRender(<ExportCOA  {...props}/>);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn)
    });

    it("downloadBtn", ()=>{
        customRender(<ExportCOA  {...props}/>);
        
        const downloadBtn = screen.getByRole('button', {name:'Download'});
        fireEvent.click(downloadBtn)
    });
});
