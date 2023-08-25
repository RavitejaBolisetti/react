import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewCriticalityGroup } from '@components/common/CriticalityGroup/ViewCriticalityGroup';

beforeEach(() => {
    jest.clearAllMocks();
});

describe('ViewCriticalityGroup component', () => {
    it('should render the ViewCriticalityGroup components', () => {
        customRender(<ViewCriticalityGroup />);
    });
});
