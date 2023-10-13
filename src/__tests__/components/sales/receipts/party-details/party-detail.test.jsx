import '@testing-library/jest-dom/extend-expect';
import { PartyDetailMaster } from '@components/Sales/Receipts/PartyDetails/PartyDetailMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const receiptDetailData = {
    partyDetails: 'Test',
};

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

describe('Receipts party details Master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper receiptDetailData={receiptDetailData} isvisible={true} setRequestPayload={jest.fn()} setReceipt={jest.fn()} />);
    });

    it('should render components when viewmode is true', () => {
        customRender(<FormWrapper {...props} receiptDetailData={receiptDetailData} isvisible={true} setRequestPayload={jest.fn()} setReceipt={jest.fn()} />);
    });

    it('should change value for partyId', () => {
        const props = { formActionType: { addMode: true } };
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Receipt: {
                    PartyDetails: { data: [{ address: 'test', city: 'MUMBAI', id: '106', mitraType: null, mobileNumber: '7844466667', partyId: 'C23D000010', partyName: 'HSTest New', partySegment: 'CUS', partySegmentDesc: 'CUSTOMER', state: 'Maharashtra' }], isLoaded: true },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} receiptDetailData={receiptDetailData} isvisible={true} setRequestPayload={jest.fn()} setReceipt={jest.fn()} setPartyId={jest.fn()} setButtonData={jest.fn()} />
            </Provider>
        );

        const partySegment = screen.getByRole('combobox', { name: 'Party Segment' });
        fireEvent.change(partySegment, { target: { value: 'MITRA' } });
        fireEvent.click(partySegment);

        const partyId = screen.getByRole('textbox', { name: 'Party ID' });
        fireEvent.change(partyId, { target: { value: 'CUS1687404042728' } });
        const searchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchBtn);
    });
});
