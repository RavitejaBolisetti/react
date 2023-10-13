import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { EvrDetailsCapturingMasterPage } from '@pages/Sales/EvrDetailsCapturing/EvrDetailsCapturingMasterPage';

describe('EvrDetailsCapturingMasterPage Components', () => {
    it('should render EvrDetailsCapturingMasterPage Page components', () => {
        customRender(<EvrDetailsCapturingMasterPage />);
    });
});
