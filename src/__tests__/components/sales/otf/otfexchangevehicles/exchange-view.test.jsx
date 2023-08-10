import { screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";

import { ViewDetail } from "@components/Sales/OTF/ExchangeVehicles/ViewDetail"

describe("All Fields Render for OTF-View File", ()=>{

    it("should veiw detail main component rendr", ()=>{
        customRender(<ViewDetail/>)

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

        const km = screen.getByText('KM')
        expect(km).toBeTruthy();

        const customerExpected = screen.getByText('Customer Expected Price')
        expect(customerExpected).toBeTruthy();

        const procurementPrice = screen.getByText('Procurement Price')
        expect(procurementPrice).toBeTruthy();

        const hypothecatedTo = screen.getByText('Hypothecated To')
        expect(hypothecatedTo).toBeTruthy();
    })
})