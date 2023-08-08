/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { PartyMasterPage } from "@pages/common/PartyMaster/PartyMasterPage";


describe("PartyMasterPage Components", () => {
    it("should render PartyMasterPage components", ()=> {
    const partymasterpage =  customRender(<PartyMasterPage />);
    expect(PartyMasterPage).toMatchSnapshot();
    });
});
