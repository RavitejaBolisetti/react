/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import  CardAccountAndDocumentMapping  from '@components/FinancialAccounting/AccountCategory/AccountAndDocumentMapping/CardAccountAndDocumentMapping';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render CardAccountAndDocumentMapping component', () => {
    it('should render components', () => {
        const accountDocumentMaps = [{applicationId:'123', applicationMenu:'12test', documentTypeCode:'A001', accountDocumentMapId:'test123'}];
        customRender(<CardAccountAndDocumentMapping accountDocumentMaps={accountDocumentMaps} viewMode={false} formEdit={true} setButtonData={jest.fn()} />);
    });
});
