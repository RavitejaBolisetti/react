import '@testing-library/jest-dom/extend-expect';
import { UserMainContainer } from 'components/common/UserManagement/UserMainContainer';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('components/common/UserManagement/LeftSidebar', () => {
    return {
        __esModule: true,
        LeftSidebar: () => null,
    }
});

describe('User Main Container Component', () => {

    it('should render user main container component', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} />);
    });

    it('should render dealer component', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'DLR'} />);
    });

    it('should render assign user role component', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'DLR'} currentSection={1} setButtonData={jest.fn()} resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()} />);
    });

    it('should render branch mapping component', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'DLR'} currentSection={2} setButtonData={jest.fn()} resetUsrDlrBranchLocationsList={jest.fn()} resetDlrBranchLocationsList={jest.fn()} />);
    });

    it('should render product mapping component', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'DLR'} currentSection={3} setButtonData={jest.fn()} />);
    });

    it('should render mac id component', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'DLR'} currentSection={4} />);
    });

    it('should render manufacture component', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'MNM'} />);
    });

    it('should render assign user role component for manufacturer', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'MNM'} currentSection={1} setButtonData={jest.fn()} resetMnmUserRoleAppDataList={jest.fn()} resetUsrDlrRoleAppDataList={jest.fn()} />);
    });

    it('should render default', () => {
        const formActionType={
            addMode: true
        }
        customRender(<UserMainContainer isVisible={true} formActionType={formActionType} userType={'Kai'} />);
    });

});