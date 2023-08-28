import '@testing-library/jest-dom/extend-expect';
import MacIdMain from '@components/common/UserManagement/MacIdComponent/MacIdMain';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('MacIdMain components', () => {
    it('should render MacIdMain components', () => {
        customRender(<MacIdMain/>)
    });
});