import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ViewDetail } from 'components/common/LessorCompanyMaster/ViewDetail';

describe('View Detail Component', () => {
    it('should render the view detail component correctly', () => {
        const styles={
            viewContainer:''
        }
        customRender(<ViewDetail styles={styles} />)
    });
});
