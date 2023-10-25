import '@testing-library/jest-dom/extend-expect';
import { PartyDetailMaster } from '@components/Sales/Receipts/PartyDetails/PartyDetailMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const receiptDetailData = {
    partyDetails: 'Test',
};

jest.mock('store/actions/data/receipt/partyDetails', () => ({
    partyDetailDataActions: {},
}));

const FormWrapper = (props) => {
    const [partyDetailForm] = Form.useForm();
    const myFormMock = {
        ...partyDetailForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <PartyDetailMaster partyDetailForm={myFormMock} {...props} />;
};

const props = { formActionType: { viewMode: true } };

const partySegmentType = [
    {
        key: 106,

        value: 'Kai',
    },
];

describe('Receipts party details Master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper receiptDetailData={receiptDetailData} isvisible={true} setRequestPayload={jest.fn()} setReceipt={jest.fn()} />);
    });

    it('should render components when viewmode is true', () => {
        customRender(<FormWrapper {...props} receiptDetailData={receiptDetailData} isvisible={true} setRequestPayload={jest.fn()} setReceipt={jest.fn()} />);
    });

    it('should change value for partyId', async () => {
        const props = { formActionType: { addMode: true } };
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Receipt: {
                    PartyDetails: { data: [{ address: 'test', city: 'MUMBAI', id: '106', mitraType: null, mobileNumber: '7844466667', partyId: 'C23D000010', partyName: 'HSTest New', partySegment: 'CUS', partySegmentDesc: 'CUSTOMER', state: 'Maharashtra' }], isLoaded: true },
                },
            },
        });

        const fetchCustomerDetail = jest.fn();
        const fetchPartyDetail = jest.fn();
        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} fetchCustomerDetail={fetchCustomerDetail} fetchPartyDetail={fetchPartyDetail} saveData={saveData} receiptDetailData={receiptDetailData} isvisible={true} resetData={jest.fn()} setRequestPayload={jest.fn()} setReceipt={jest.fn()} setPartyId={jest.fn()} setButtonData={jest.fn()} partySegmentType={partySegmentType} />
            </Provider>
        );

        const partyId = screen.getByRole('textbox', { name: 'Party ID' });
        fireEvent.change(partyId, { target: { value: 'C23D000010' } });
        const searchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchBtn);
    });
});
