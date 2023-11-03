/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import ViewDetailMain from 'components/FinancialAccounting/GSTIRNAuthentication/IrnTransactionList/ViewDetail';

describe("ViewDetailMain component", ()=>{

    it("applicationDetailsData", ()=>{
        const applicationDetailsData = [{applicationId: "HR", applicationName: "HR & MILE"}];

        customRender(<ViewDetailMain isVisible={true} styles={{}} applicationDetailsData={applicationDetailsData} />);
    });

});