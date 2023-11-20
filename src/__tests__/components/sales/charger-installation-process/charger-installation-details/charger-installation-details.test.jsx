import { fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ChargerInstallationDetailsMaster } from 'components/Sales/ChargerInstallationProcess/ChargerInstallationDetails/ChargerInstallationDetails';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <ChargerInstallationDetailsMaster form={myFormMock} chargerInstallationForm={myFormMock} {...props} />;
};

const StatusBar = () => <div>No Status Bar</div>;
const FormActionButton = () => <div><button htmlType="submit" type="primary">Submit</button></div>;

describe('Charger Installation Details Component', () => {

    it('should render charger installation details component', () => {
        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });

    it('collapse and search should work', () => {
        const formActionType={ addMode: true };
        const typeData={ ORDR_STATS: 'Kai' };

        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} chargerDetails={true} setDisabled={jest.fn()} formActionType={formActionType} typeData={typeData} handleBookingNumberSearch={jest.fn()} />);
        
        const plusCollapse=screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusCollapse[0]);
        fireEvent.click(plusCollapse[1]);

        const minusCollapse=screen.getByRole('img', { name: 'minus' });
        fireEvent.click(minusCollapse);

        const searchBox=screen.getByRole('textbox', { name: 'Booking Number' });
        fireEvent.change(searchBox, { target: { value: '123456' } });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

    });

    it('submit button should work', () => {
        const formActionType={ editMode: true };

        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} handleButtonClick={jest.fn()} formActionType={formActionType} />);
        const submitBtn=screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);
    });

    it('view button should work', async () => {
        const formActionType={ viewMode: true };
        const chargerInstallationMasterData={ chargerInstDetails: { requestDetails: [{ date: '01/01/2001', Status: 'Success', stageRequestDate: 'Success', stage: 'Success', visitTimeSlotOne: '17/10/2001', visitTimeSlotTwo: '01/01/2001', visitTimeSlotThree: '01/01/2001' }] } }

        customRender(<FormWrapper isVisible={true} setOptions={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} handleButtonClick={jest.fn()} formActionType={formActionType} chargerInstallationMasterData={chargerInstallationMasterData} />);
    });

});