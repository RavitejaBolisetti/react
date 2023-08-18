import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, logRoles } from '@testing-library/react';
import CommonFooterButton from 'components/common/CustomerMaster/CommonFooterButton';

const styles={
    floatRight:'',
}

describe('Common Footer Button component', () => {

    it('should render the common footer button component', () => {
        customRender(<CommonFooterButton styles={styles}/>);
    });

    it('save and proceed button should work', () => {
        const styles={
            floatRight:'',
        }
        customRender(<CommonFooterButton styles={styles} isHtmltype={true}/>);

        const saveBtn=screen.getByRole('button', { name: 'Save & Proceed' })
        fireEvent.click(saveBtn);
    });

});