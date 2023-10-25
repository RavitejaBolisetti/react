import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import AccessoriesInformationCard from 'components/Sales/OTF/AddOnDetails/ViewDetails/AccessoriesInformationCard';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('View Detail Component', () => {
    
    it('should render view detail components', () => {
        customRender(<AccessoriesInformationCard />);
    });
});
