import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewDetail } from 'components/Sales/OTF/AddOnDetails/ViewDetails/ViewDetails';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('View Detail Component', () => {
    
    it('should render view detail components', () => {
        customRender(<ViewDetail />);
    });
});
