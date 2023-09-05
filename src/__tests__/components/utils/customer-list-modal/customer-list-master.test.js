import React from 'react';
import { CustomerListMaster } from 'components/utils/CustomerListModal';
import customRender from '@utils/test-utils';

describe('Customer List Master Component', () => {

    it('should render customer list master component', () => {
        customRender(<CustomerListMaster />);
    });

});