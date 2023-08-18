import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewProductDetail } from '@components/common/ProductHierarchy/ViewProductDetail';
import { act } from "@testing-library/react";
describe('ViewProductDetail component', () => {

    it('should render the ViewProductDetail components', () => {
        const selectedTreeData={
            skuAttributes: ['Kai', 'Kai'],
        }
        const styles={
            contentHeaderRightBackground:''
        }
        const setSKUAttributes=jest.fn();
        customRender(<ViewProductDetail styles={styles} setSKUAttributes={setSKUAttributes} isActive={true} selectedTreeData={selectedTreeData} skuAttributes={selectedTreeData.skuAttributes} />);

        act(() => {
            setSKUAttributes.mock.calls[0][0](prevA => [...prevA]);
            setSKUAttributes.mock.calls[1][0](prevA => [...selectedTreeData.skuAttributes]);
        })
    });

});


