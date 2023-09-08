import React from 'react';
import RSMApprovalMaster  from 'components/Sales/RSMApproval/RSMApprovalMaster';
import customRender from '@utils/test-utils';
afterEach(() => {
  jest.restoreAllMocks();
});
describe('RSMApprovalMaster Component', () => {

    it('should render RSMApproval master component UI', () => {
        customRender(<RSMApprovalMaster />)
    });
 
});