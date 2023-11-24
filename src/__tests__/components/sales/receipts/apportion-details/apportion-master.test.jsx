import '@testing-library/jest-dom/extend-expect';
import { ApportionDetailMaster } from '@components/Sales/Receipts/ApportionDetails/ApportionDetailMaster';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/financialAccounting/documentDescription', () => ({
    documentDescriptionDataActions: {},
}));

jest.mock('store/actions/data/financialAccounting/invoiceDetails', () => ({
    invoiceDetailsDataAction: {},
}));

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <ApportionDetailMaster form={myFormMock} {...props} />;
};

describe('Receipts party details Master components', () => {
    it('should render components', () => {
        const formActionType = {
            editMode: true,
        };
        const apportionList = [{ key: '1', value: 'kai' }];
        customRender(<FormWrapper formActionType={formActionType} fetchDocumentTypeList={jest.fn()} isVisible={true} handleButtonClick={jest.fn()} apportionList={apportionList} />);
    });

    it('should render components when viewMode is true', () => {
        const formActionType = {
            viewMode: true,
        };
        const apportionList = [{ key: '1', value: 'kai' }];
        customRender(<FormWrapper formActionType={formActionType} fetchDocumentTypeList={jest.fn()} isVisible={true} handleButtonClick={jest.fn()} apportionList={apportionList} />);
    });

    jest.setTimeout(10000);
    it('test1', async () => {
        const props = { formActionType: { addMode: true } };
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                FinancialAccounting: {
                    DocumentDescription: { isLoaded: true, data: [{ id: '1', value: 'kai' }] },
                },
            },
        });
        const apportionList = [{ key: '1', value: 'kai' }];

        const fetchDocumentTypeList = jest.fn();
        const fetchInvoiceList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} showApportionForm={true} resetInvoiceData={jest.fn()} fetchDocumentTypeList={fetchDocumentTypeList} fetchInvoiceList={fetchInvoiceList} apportionList={apportionList} isvisible={true} handleButtonClick={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: 'fa-edit' });
        fireEvent.click(editBtn);

        const docType = screen.getByRole('combobox', { name: /Document Type/i });
        fireEvent.change(docType, { target: { value: 'Payment' } });

        const docno = screen.getByRole('textbox', { name: /Document Number/i });
        fireEvent.change(docno, { target: { value: '12121' } });

        const search = screen.getByRole('img', { name: /search/i });
        fireEvent.click(search);

        fetchInvoiceList.mock.calls[0][0].onErrorAction();

        fetchInvoiceList.mock.calls[0][0].onSuccessAction();
    });
});
