import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import LeftSidebar from '@components/Sales/AMCRegistration/LeftSidebar/LeftSidebar';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Left Sidebar Components', () => {
    it('Should render Left Sidebar basic render', () => {
        customRender(<LeftSidebar />);
    });

});
