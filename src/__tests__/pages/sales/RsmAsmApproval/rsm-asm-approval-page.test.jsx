import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { RsmAsmApprovalPage } from '@pages/Sales/RsmAsmApproval/RsmAsmApprovalPage';

describe('RsmAsmApprovalPage Components', () => {
    it('should render RsmAsmApprovalPage Page components', () => {
        customRender(<RsmAsmApprovalPage />);
    });
});
