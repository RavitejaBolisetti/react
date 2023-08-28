/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { ViewDetail } from "@components/Sales/OTF/ExchangeVehicles/ViewDetail"

afterEach(() => {
    jest.restoreAllMocks();
});

describe("ViewDetails Component Should Render", ()=>{
    
    it("should veiw detail main component rendr", ()=>{
        customRender(<ViewDetail styles={{}} />)

        const customerId= screen.getByText('Customer ID');
        expect(customerId).toBeTruthy();

        const customerName= screen.getByText('Customer Name');
        expect(customerName).toBeTruthy();

        const make= screen.getByText('Make');
        expect(make).toBeTruthy();

        const modelGrp = screen.getByText('Model Group');
        expect(modelGrp).toBeTruthy();

        const variant = screen.getByText('Variant')
        expect(variant).toBeTruthy();

        const oldRegNumber = screen.getByText('Old Reg. Number')
        expect(oldRegNumber).toBeTruthy();

        const oldChasisNumber = screen.getByText('Old Chassis Number')
        expect(oldChasisNumber).toBeTruthy();

        const relationship = screen.getByText('Relationship')
        expect(relationship).toBeTruthy();

        const monthOfRegistration = screen.getByText('Month of Registration')
        expect(monthOfRegistration).toBeTruthy();

        const yearOfRegistration = screen.getByText('Year of Registration')
        expect(yearOfRegistration).toBeTruthy();

        const usage = screen.getByText('Usage')
        expect(usage).toBeTruthy();

        const schemeName = screen.getByText('Scheme Name')
        expect(schemeName).toBeTruthy();

        const schemeAmount = screen.getByText('Scheme Amount')
        expect(schemeAmount).toBeTruthy();

        const customerExpected = screen.getByText('Customer Expected Price')
        expect(customerExpected).toBeTruthy();

        const procurementPrice = screen.getByText('Procurement Price')
        expect(procurementPrice).toBeTruthy();

        const hypothecatedTo = screen.getByText('Hypothecated To')
        expect(hypothecatedTo).toBeTruthy();
    })
})