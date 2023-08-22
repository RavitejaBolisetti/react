import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { QualificationMasterPage } from '@pages/common/QualificationMaster/QualificationMasterPage';

describe('QualificationMasterPageBase Components', () => {
    it('should render QualificationMasterPageBase components', () => {
        customRender(<QualificationMasterPage />);
    });
});
