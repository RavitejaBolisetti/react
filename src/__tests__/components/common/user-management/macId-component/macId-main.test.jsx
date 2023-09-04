import '@testing-library/jest-dom/extend-expect';
import {MacIdMaster} from '@components/common/UserManagement/Dealer/MacIdComponent/MacIdMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('MacIdMain components', () => {
    it('should render MacIdMain components', () => {
        customRender(<MacIdMaster/>)
    });
});