
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import FormProductAttribute from '@components/common/ProductHierarchy/ProductAttribute/FormProductAttribute';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('FormProductAttribute component', () => {

    it('should render the FormProductAttribute components', () => {
        customRender(<FormProductAttribute />);
    });
    
});