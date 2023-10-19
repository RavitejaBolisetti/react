import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import RequestDetailsMaster from '@components/Sales/AMCRegistration/RequestDetails/RequestDetailsMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Button } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

describe('Customer Details Master Components', () => {
    it('Should render Customer Details Master basic render', () => {
        customRender(<RequestDetailsMaster FormActionButton={FormActionButton} />);
    });

    it('Should render Customer Details Master view render', () => {
        const formActionType = { viewMode: true };
        customRender(<RequestDetailsMaster FormActionButton={FormActionButton} formActionType={formActionType} />);
    });

    it('Should render Customer Details Master add edit render', () => {
        const formActionType = { viewMode: false };
        customRender(<RequestDetailsMaster FormActionButton={FormActionButton} setButtonData={jest.fn()} formActionType={formActionType} />);
        
        const saveBtn = screen.getByRole('button', { name: "Save" })
        fireEvent.click(saveBtn)
    });
});
