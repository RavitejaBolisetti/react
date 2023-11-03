/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import { ViewSupportingDocDetail } from "components/FinancialAccounting/GSTIRNAuthentication/ViewSupportingDocDetail";

describe("ViewSupportingDocDetail component", ()=>{
    it("eyeIcon",()=>{
        const onDownload=jest.fn();
        const docData = {documentId:'123', pemFile:'secretkey-1696914838011.pem'};
        customRender(<ViewSupportingDocDetail docData={docData} isVisible={true} onDownload={onDownload} />);

        const eyeIcon = screen.getByTestId("eye_icon");
        fireEvent.click(eyeIcon);
    });

    it("deleteIcon",()=>{
        const onRemove=jest.fn();
        const docData = {documentId:'123', pemFile:'secretkey-1696914838011.pem'};
        customRender(<ViewSupportingDocDetail docData={docData} isVisible={true} onRemove={onRemove} />);

        const deleteIcon = screen.getByTestId("delete_icon");
        fireEvent.click(deleteIcon);
    });
})