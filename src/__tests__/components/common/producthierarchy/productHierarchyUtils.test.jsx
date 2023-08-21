import '@testing-library/jest-dom/extend-expect';
import { DisableParent, FindprodctCode } from '@components/common/ProductHierarchy/ProductHierarchyUtils';

afterEach(() => {
    jest.restoreAllMocks();
});

const node = {
    prodctCode: 'Kai',
    subProdct: [{prodctCode: 'Kai', subProdct: [{prodctCode: 'Kai'}]}],
    subManufactureOrg: [{name: 'Kai'}]
};

const key='Kai';

describe('Find product code component', () => {

    it('should render the Find product code components 1', () => {
        const prodctCode='Kai';
        FindprodctCode(node, prodctCode, key);
    });

    it('should render the Find product code components 2', () => {
        const prodctCode='Kai-Kai';
        FindprodctCode(node, prodctCode, key);
    });

});

describe('disableParent component', () => {

    it('should render the disableParent components', () => {
        DisableParent(node);
    });

});
