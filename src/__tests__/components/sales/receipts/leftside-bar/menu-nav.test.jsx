import '@testing-library/jest-dom/extend-expect';
import MenuNav from '@components/Sales/Receipts/LeftSidebar/MenuNav';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const props = { formActionType: { addMode: true } };

describe('Receipts left side bar menu components', () => {
    it('should render components', () => {
        customRender(<MenuNav {...props} />);
    });

    it('should render components when id is greater than current section', () => {
        customRender(<MenuNav {...props} id={1} currentSection={1} />);
    });

    it('should render components when id is less than current section', () => {
        customRender(<MenuNav {...props} id={1} currentSection={2} />);
    });

    it('should render components when editMode is true', () => {
        const prop = { formActionType: { editMode: true } };
        customRender(<MenuNav {...prop} id={1} currentSection={1} />);
    });
    it('should render components when viewMode is true', () => {
        const prop = { formActionType: { viewMode: true } };
        customRender(<MenuNav {...prop} id={1} currentSection={1} />);
    });
});
