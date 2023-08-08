import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ApplicationMasterPage } from '@pages/common/ApplicationMasterPage/ApplicationMasterPage';

describe('ApplicationMasterPageBase Components', () => {
    it('should render ApplicationMasterPageBase components', () => {
        const ApplicationMasterPageBase = customRender(<ApplicationMasterPage />);
        expect(ApplicationMasterPageBase).toMatchSnapshot();
    });
});
