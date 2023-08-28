import '@testing-library/jest-dom/extend-expect';

import { DealerCompany } from '@components/Mile/DealerCompany/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Change history components', () => {
    it('should render change history components', () => {
        customRender(<DealerCompany />);
    });
});
