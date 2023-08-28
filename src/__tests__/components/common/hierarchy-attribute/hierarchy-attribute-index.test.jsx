import '@testing-library/jest-dom/extend-expect';
import { HierarchyAttribute } from '@components/common/HierarchyAttribute';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('HierarchyAttribute components', () => {
    it('should render hierarchyAttribute components', () => {
        customRender(<HierarchyAttribute/>)
    });
});