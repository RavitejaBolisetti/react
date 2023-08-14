/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import  { ChangeHistory }  from "@components/Sales/OTF/ChangeHistory/otfChangeHistory";
import { screen,fireEvent } from '@testing-library/react'

describe('OTF otfChangeHistory component render', () => {
    const props = {
        fetchOTFChangeHistory:jest.fn(),
        onCloseAction:jest.fn(),
        listShowChangeHistoryLoading:jest.fn(),
        isChangeHistoryLoading:false,
        isChangeHistoryLoaded:true,
        selectedOrderId: "OTF1690452895135",
        isVisible:true,
        isChangeHistoryContainer:false,
        handleTableChange:jest.fn(),
    }

    it('should render OTF otfChangeHistory component', async() => {
        customRender(<ChangeHistory {...props} />)
        const closeBtn = screen.getAllByRole("button", {name: 'Close', exact: false});
        fireEvent.click(closeBtn[0]);

        const closeImg = screen.getByRole("img", {name: 'close', exact: false});
        fireEvent.click(closeImg);
    });

});