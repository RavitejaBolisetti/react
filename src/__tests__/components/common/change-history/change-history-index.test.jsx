import '@testing-library/jest-dom/extend-expect';
import { ChangeHistory } from '@components/common/ChangeHistory';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Change history components', () => {
    it('should render change history components', () => {
        customRender(<ChangeHistory/>)
    });
});