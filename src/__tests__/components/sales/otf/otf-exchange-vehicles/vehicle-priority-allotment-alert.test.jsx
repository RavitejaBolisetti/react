/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import VehiclePriorityAllotmentAlert from "@components/Sales/OTF/ExchangeVehicles/VehiclePriorityAllotmentAlert"

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VehiclePriorityAllotmentAlert component', ()=>{
    it('open=true',()=>{
        customRender(<VehiclePriorityAllotmentAlert title={'Vehicle Priority Alert'} isVisible={true} modalOpen={true} setModalOpen={jest.fn()} cancelText={'Close'}/>);
    })

    it('open=false',()=>{
        customRender(<VehiclePriorityAllotmentAlert  isVisible={true} modalOpen={false} setModalOpen={jest.fn()} />);
    })
})