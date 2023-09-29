import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { VehicleDetailsMaster } from '@components/Sales/VehicleDetail/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';


afterEach(() => {
    jest.restoreAllMocks();
});


const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn()
    }
    return <VehicleDetailsMaster form={myFormMock}  {...props} />;
};


describe('Vehicle details master render', () => {

    it('should render vehicle detals master components', async () => {
        customRender(<VehicleDetailsMaster selectedRecordId="testID" />)
    })

    it('should render vehicle detals master click minus and plus button', () => {
        const formActionType = { viewMode: true }
        customRender(<VehicleDetailsMaster
            formActionType={formActionType}
            onChange={jest.fn()}
            selectedRecordId={"test"}
        />)

        const minusBtn = screen.getAllByRole('img');
        fireEvent.click(minusBtn[0]);
        const vehicleDetails = screen.getByText('Vehicle Details');
        fireEvent.click(vehicleDetails);
    })

    it('should render vehicle detals master view details button', () => {
        const formActionType = { viewMode: true }
        customRender(<VehicleDetailsMaster
            formActionType={formActionType}
            fetchList={jest.fn()}
        />)

    })

    it('should render vehicle detals master addEdit form button', () => {
        const formActionType = { viewMode: false }
        const props = {
            onFinish: jest.fn(),
            onFinishFailed: jest.fn(),
            fetchList: jest.fn(),
            typeData: [{ key: 1, value: 'test' }],
            userId: 63456,
            isDataLoaded: false,
            formData: { key: 1, value: 'test' },
            isLoading: false,
            setMnmCtcVehicleFlag: jest.fn(),
            onChange: jest.fn(),
            setactiveKey: jest.fn(),
            selectedRecordId: 'test'
        }
        customRender(<VehicleDetailsMaster
            {...props}
            formActionType={formActionType}
            userId={'123'} selectedRecordId={'123'}
        />)

        const minusBtn = screen.getAllByRole('img');
        fireEvent.click(minusBtn[0]);
        const vehicleDetails = screen.getByText('Vehicle Details');
        fireEvent.click(vehicleDetails);
    })


    it('should render vehicle detals master addEdit form user type button', () => {
        const formActionType = { viewMode: false }
        const mockStore = {
            data: {
                ConfigurableParameterEditing: { filteredListData: [{ key: 1, value: 'test' }] },
                Vehicle: {
                    ViewVehicleDetail: { isLoaded: true, isLoading: true, data: { key: 1, value: 'test', id: 2 } },
                },
            },
            selectedRecordId: '7565'
        }

        const formData = {
            key:12,
            value: "test"
        }

        const vehicleDetails = {
            vehicleDetails:{
                id: 3,
                registrationNumber: "65656",
                vin: '73467'
            }            
        }

        const defaultBtnVisiblity = {
            editBtn: true,
            saveBtn: true,
            cancelBtn: true,
            saveAndNewBtn: true,
            saveAndNewBtnClicked: true,
            closeBtn: true,
            formBtnActive: true,
            cancelOTFBtn: true,
            transferOTFBtn: true,
            allotBtn: true,
            unAllotBtn: true,
            invoiceBtn: true,
            deliveryNote: true,
            changeHistory: true,
        };

        customRender(<FormWrapper
            formActionType={formActionType}
            selectedRecordId="MAKGF1F57A9193179"
            fetchList={jest.fn()}
            saveButtonName={'Save & Next'}
            onSuccessAction={jest.fn()} 
            showGlobalNotification={jest.fn()} 
            onError={jest.fn()} 
            buttonData={defaultBtnVisiblity} 
            onCloseAction={jest.fn()} 
            resetData={jest.fn()} 
            onSuccess={jest.fn()} 
            handleFormValueChange={jest.fn()} 
            handleFieldsChange={jest.fn()} 
            onFinish={jest.fn()} 
            onFinishFailed={jest.fn()}
            formData={formData}
            userType={"MNM"}
            checked={true}
            setButtonData={jest.fn()}
        />, {
            initialState: mockStore,
        })

        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    })
})