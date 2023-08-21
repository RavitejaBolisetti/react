import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { FamilyDetailMaster } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/FamilyDetailMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn()
    }
    return <FamilyDetailMaster form={myFormMock} {...props} />;
};


describe('Family Detail Master component', () => {
    it('should render the family detail master component', () => {
        customRender(<FamilyDetailMaster />);
    });


    it("should render the family detail master no data component", async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    FamilyDetails: {
                        isLoaded: false, isLoading: false, data: []
                    }
                }
            }
        });

        const props = {
            isVisible: true,
            setButtonData: jest.fn(),
            isViewModeVisible: false,
            showForm: true,
            editedMode: false,
            selectedCustomerId: 'testid'
        }

        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    onCancel={jest.fn()}
                    onSave={jest.fn()}
                    onSearch={jest.fn()}
                    onFinishFailed={jest.fn()}
                    onFinish={jest.fn()}
                    handleFormValueChange={jest.fn()}
                    onCollapseChange={jest.fn()}
                    addFunction={jest.fn()}
                    handleButtonClick={jest.fn()}
                />
            </Provider>
        );

        const plusAdd = getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(plusAdd);
        })

        const search = getByRole('button', { name: 'search' });
        await act(async () => {
            fireEvent.click(search);
        })

        const save = getByRole('button', { name: 'Save' });
        await act(async () => {
            fireEvent.click(save);
        })

        const cancel = getByRole('button', { name: 'Cancel' });
        await act(async () => {
            fireEvent.click(cancel);
        })

        const plusImg = getByRole('img', { name: 'plus' });
        expect(plusImg).toBeInTheDocument();

    })


    it("should render the family detail master add edit form component", async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    FamilyDetails: {
                        isLoaded: true, data: [{ id: 1, value: 'test' }, { id: 2, value: 'test3' }, { id: 3, value: 'test2' }]
                    },
                    FamilyDetailSearch: { isLoading: true, data: [{ id: 2, value: 'test3' }] },
                }
            }
        });

        const props = {
            isVisible: true,
            setButtonData: jest.fn(),
            isViewModeVisible: false,
            showForm: true,
            editedMode: true,
            setFamilyDetailsList: jest.fn(),
            selectedCustomerId: 'testid'
        }

        const { getByRole } = customRender(
            <Provider store={mockStore}>
                <FormWrapper
                    {...props}
                    onCancel={jest.fn()}
                    onSave={jest.fn()}
                    onSearch={jest.fn()}
                    onFinishFailed={jest.fn()}
                    onFinish={jest.fn()}
                    handleFormValueChange={jest.fn()}
                    onCollapseChange={jest.fn()}
                    addFunction={jest.fn()}
                    handleButtonClick={jest.fn()}
                    onEdit={jest.fn()}
                    setactiveKey={jest.fn()}
                />
            </Provider>
        );

        const plusAdd = getByRole('button', { name: 'plus Add' });
        await act(async () => {
            fireEvent.click(plusAdd);
        })

        // const save = getByRole('button', { name: 'Save' });
        // await act(async () => {
        //     fireEvent.click(save);
        // })

        // const cancel = getByRole('button', { name: 'Cancel' });
        // await act(async () => {
        //     fireEvent.click(cancel);
        // })

        screen.debug()
        screen.getByRole("master-test")

        // const customerId = screen.getByRole("textbox", { name: 'Customer Id', exact: false });
        // await act(async () => {
        //     fireEvent.change(customerId, { target: { value: 'TESTDMSPAN' } });
        // })

        // const customerName = screen.getByRole("textbox", { name: 'Customer Name', exact: false });
        // await act(async () => {
        //     fireEvent.change(customerName, { target: { value: 'TESTDMSPAN' } });
        // })


        // const dob = screen.getByRole("textbox", { name: 'Date of Birth', exact: false });
        // await act(async () => {
        //     fireEvent.change(dob, { target: { value: 'TESTDMSPAN' } });
        // })

        // const age = screen.getByRole("textbox", { name: 'Age', exact: false });
        // await act(async () => {
        //     fireEvent.change(age, { target: { value: 'TESTDMSPAN' } });
        // })

        // const remark = screen.getByRole("textbox", { name: 'Remark', exact: false });
        // await act(async () => {
        //     fireEvent.change(remark, { target: { value: 'TESTDMSPAN' } });
        // })

    })
})