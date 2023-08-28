import '@testing-library/jest-dom/extend-expect';

import { DealerParent } from '@components/Mile/DealerParent/index';

import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Change history components', () => {
    it('should render change history components', () => {
        customRender(<DealerParent />);
    });
});
