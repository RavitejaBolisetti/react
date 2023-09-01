/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen } from "@testing-library/react";
import customRender from '@utils/test-utils';
import {ViewContactDetail} from 'components/Sales/VehicleDetail/Contacts/ViewContactDetail';

describe('ViewContactDetail Component Should Render', ()=>{
    it('should render Table', ()=>{
        customRender(<ViewContactDetail styles={{}} />);

        const contactType =  screen.getByRole('columnheader', {name:'Contact Type'});
        expect(contactType).toBeTruthy();

        const contactDays =  screen.getByRole('columnheader', {name:'Preferred Days For Contact'});
        expect(contactDays).toBeTruthy();

        const mobNo =  screen.getByRole('columnheader', {name:'Mobile Number'});
        expect(mobNo).toBeTruthy();

        const name =  screen.getByRole('columnheader', {name:'Name'});
        expect(name).toBeTruthy();

        const email =  screen.getByRole('columnheader', {name:'E-mail'});
        expect(email).toBeTruthy();

        const contactTime =  screen.getByRole('columnheader', {name:'Preferred Contact Time'});
        expect(contactTime).toBeTruthy();
    })
})