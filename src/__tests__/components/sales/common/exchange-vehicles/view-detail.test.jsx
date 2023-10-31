/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewDetail } from 'components/Sales/Common/ExchangeVehicles/ViewDetail';

describe('View Detail Component', () => {

    it('should render view detail component', () => {
        customRender(<ViewDetail />);
    });

    it('should load alternative data', async () => {
        const formData={ make: 'Kai' };
        const modelData=[{ name: 'Kai' }];
        const variantData=[{ name: 'Kai' }];
        customRender(<ViewDetail formData={formData} modelData={modelData} variantData={variantData} isVisible={true} getCodeValue={jest.fn()} />);
    }); 

    it('should load data', async () => {
        const formData={ make: 'Kai' };
        const modelData=[{ name: 'Kai' }];
        const variantData=[{ name: 'Kai' }];
        customRender(<ViewDetail formData={formData} modelData={modelData} variantData={variantData} isVisible={true} isMahindraMake={true} />);
    }); 

});