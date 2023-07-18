import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import { tableColumn } from '@components/common/CriticalityGroup/tableColumn';

beforeEach(()=>{
    jest.clearAllMocks();
});

describe('tableColumn component', () => {
    it('should render the tableColumn components', () => {
        customRender(<tableColumn />);
    });
});
