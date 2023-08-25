import '@testing-library/jest-dom/extend-expect';
import { ListLessorCompanyMaster } from '@components/common/LessorCompanyMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ListLessor CompanyMaster components', () => {
    it('should render  ListLessor CompanyMaster components', () => {
        customRender(<ListLessorCompanyMaster/>)
    });
});