import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import MenuNav from '@components/common/UserManagement/LeftSidebar/MenuNav';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render MenuNav component', () => {
    const props = {
        userType: 'DEALER',
        setCurretSection: jest.fn(),
        onHandle: jest.fn(),
        setCurrentSection: jest.fn(),
    };
    it('test for edit button', () => {
        const formActionType = {
            addMode: false,
            editMode: true,
            viewMode: false,
        };

        const prop1 = { currentSection: 1 };

        customRender(<MenuNav {...props} prop1={prop1} setButtonData={jest.fn()} formActionType={formActionType} />);
    });

    it('test for view button', () => {
        const formActionType = {
            addMode: false,
            editMode: false,
            viewMode: true,
        };

        const prop1 = { currentSection: 1 };

        customRender(<MenuNav {...props} prop1={prop1} setButtonData={jest.fn()} formActionType={formActionType} />);
    });

    it('test for add button', () => {
        const formActionType = {
            addMode: true,
            editMode: false,
            viewMode: false,
        };

        const prop1 = { currentSection: 1 };

        customRender(<MenuNav {...props} prop1={prop1} setButtonData={jest.fn()} formActionType={formActionType} />);
    });
});
