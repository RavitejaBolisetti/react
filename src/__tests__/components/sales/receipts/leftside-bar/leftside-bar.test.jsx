import '@testing-library/jest-dom/extend-expect';
import LeftSidebar from '@components/Sales/Receipts/LeftSidebar/LeftSidebar';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const typeData = { INDNT_STATS: [{ name: 'kai' }] };

describe('Receipts left side bar components', () => {
    it('should render components', () => {
        customRender(<LeftSidebar typeData={typeData} />);
    });
});
