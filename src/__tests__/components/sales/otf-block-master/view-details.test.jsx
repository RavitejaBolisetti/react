import '@testing-library/jest-dom/extend-expect';
import { ViewDetails } from '@components/Sales/OtfBlockMaster/ViewDetails';
import customRender from '@utils/test-utils';

describe('Manufacturer Adminstrative Hierarchy hierarchy view components', () => {    
    it('Should render Hierarchy View components', () => {
        const styles={
            viewContainerHeader:''
        }
        const selectedTreeData = { status: true, parentName: 'test', manufactureAdminCode: "13", manufactureAdminShortName: "test", manufactureAdminLongName: "testName" }
        customRender(<ViewDetails isVisible={true} styles={styles} selectedTreeData={selectedTreeData} />);
    })
})