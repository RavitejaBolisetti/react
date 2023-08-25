import '@testing-library/jest-dom/extend-expect';
import { TermConditionManufacturerMaster } from '@components/common/ManufacturerTermCondition';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Term Condition Manufacturer Master components', () => {
    it('should render change history components', () => {
        customRender(<TermConditionManufacturerMaster/>)
    });
});