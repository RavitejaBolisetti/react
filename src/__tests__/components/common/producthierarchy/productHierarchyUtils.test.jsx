// import '@testing-library/jest-dom/extend-expect';
// import customRender from '@utils/test-utils';
// import { screen } from '@testing-library/react';
// import { ProductHierarchyUtils } from '@components/common/ProductHierarchy/ProductHierarchyUtils';



// describe('productHierarchyUtils component', () => {
//     it('should render the productHierarchyUtils components', () => {
//         const leftSideBar = customRender(<ProductHierarchyUtils isVisible={true}/>);
//         expect(leftSideBar).toMatchSnapshot();
//     });
//     screen.debug();


// });




import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import { DisableParent, FindprodctCode } from '@components/common/ProductHierarchy/ProductHierarchyUtils';

const node = {
    active: true,
    attributeKey: "testingKey",
    "disabled": true,
    id: "testId",
    manufactureOrgCode: "CODE1",
    manufactureOrgLongName: "CODE1",
    manufactureOrgParntId: "null",
    manufactureOrgShrtName: "CODE1",
    subManufactureOrg: [
        {
            active: true,
            attributeKey: "testingKey",
            id: "testId",
            manufactureOrgCode: "CODE1",
            manufactureOrgLongName: "CODE1",
            manufactureOrgParntId: "null",
            manufactureOrgShrtName: "CODE1",
        },
        {
            active: true,
            attributeKey: "testingKey",
            id: "testId",
            manufactureOrgCode: "CODE1",
            manufactureOrgLongName: "CODE1",
            manufactureOrgParntId: "null",
            manufactureOrgShrtName: "CODE1",
        },
        {
            active: true,
            attributeKey: "testingKey",
            id: "testId",
            manufactureOrgCode: "CODE1",
            manufactureOrgLongName: "CODE1",
            manufactureOrgParntId: "null",
            manufactureOrgShrtName: "CODE1",
        }
    ]
}
const nodeData = {
    prodctCode: 'testcode',
    subProdct: [{
        active: true,
        attributeKey: "testingKey",
        id: "testId",
        manufactureOrgCode: "CODE1",
        manufactureOrgLongName: "CODE1",
        manufactureOrgParntId: "null",
        manufactureOrgShrtName: "CODE1",
    }, {
        active: true,
        attributeKey: "testingKey",
        id: "testId",
        manufactureOrgCode: "CODE1",
        manufactureOrgLongName: "CODE1",
        manufactureOrgParntId: "null",
        manufactureOrgShrtName: "CODE1",
    }]
}

const prodctCode = "testcode";


describe('FindprodctCode component', () => {
    it('should render the FindprodctCode components', () => {
        const componetList = customRender(<FindprodctCode {...nodeData} prodctCode={prodctCode} key={jest.fn()} />);
        expect(componetList).toMatchSnapshot();
    });
});

describe('disableParent component', () => {
    it('should render the disableParent components', () => {
        customRender(<DisableParent {...node} />);
    });
});
