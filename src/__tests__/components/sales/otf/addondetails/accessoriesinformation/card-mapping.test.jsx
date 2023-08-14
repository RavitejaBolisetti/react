import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import CardMapping from 'components/Sales/OTF/AddOnDetails/AccessoriesInformation/CardMapping';

describe('Card Mapping Component', () => {
    it('should render card mapping component', () => {
        customRender(<CardMapping />);
    });
});
