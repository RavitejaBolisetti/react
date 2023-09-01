/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import {EntitlementsAndSchemesMaster} from 'components/Sales/VehicleDetail/EntitlementsAndSchemes/EntitlementsAndSchemesMaster';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe("EntitlementsAndSchemesMaster Should Render", ()=>{

    const mockStore = createMockStore({
        auth:{ userId:123 },
        data:{
            Vehicle:{
                isLoaded:false, entitelmentData:{
                    entitlementsAndSchemeResponses:[{ validityEndDate: "2022-12-09", validityStartDate:"2022-12-03"}] 
                }
            }
        }
    })

    it('sould render table',()=>{
        const section = {title:'Entitlements & Schemes'};

        customRender(
            <Provider store={mockStore}>
                <EntitlementsAndSchemesMaster section={section} selectedRecordId={'test123'} fetchList={jest.fn()} showGlobalNotification={jest.fn()} errorAction={jest.fn()} onSuccessAction={jest.fn()} />
            </Provider>
        )
        const heading = screen.getByRole('heading', {name:'Entitlements & Schemes'});
        expect(heading).toBeTruthy();

        const srl = screen.getByRole('columnheader', {name:'Srl.'});
        expect(srl).toBeTruthy();

        const type = screen.getByRole('columnheader', {name:'Entitlement/Scheme Type'});
        expect(type).toBeTruthy();

        const description = screen.getByRole('columnheader', {name:'Entitlement/Scheme Description'});
        expect(description).toBeTruthy();

        const docNo = screen.getByRole('columnheader', {name:'Entitlement/Scheme Doc No'});
        expect(docNo).toBeTruthy();

        const docDate = screen.getByRole('columnheader', {name:'Entitlement/Scheme Doc Date'});
        expect(docDate).toBeTruthy();

        const boockletNo = screen.getByRole('columnheader', {name:'Entitlement/Scheme Booklet No'});
        expect(boockletNo).toBeTruthy();

        const startDate = screen.getByRole('columnheader', {name:'Validity Start Date'});
        expect(startDate).toBeTruthy();

        const endDate = screen.getByRole('columnheader', {name:'Validity End Date'});
        expect(endDate).toBeTruthy();

        const startKm = screen.getByRole('columnheader', {name:'Validity Start KM'});
        expect(startKm).toBeTruthy();

        const endKm = screen.getByRole('columnheader', {name:'Validity End KM'});
        expect(endKm).toBeTruthy();

        const status = screen.getByRole('columnheader', {name:'Status'});
        expect(status).toBeTruthy();
    })
})