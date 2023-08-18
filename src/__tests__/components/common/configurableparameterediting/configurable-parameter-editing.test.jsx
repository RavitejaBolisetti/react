import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, logRoles } from '@testing-library/react';
import {ConfigurableParameterEditing} from 'components/common/ConfigurableParameterEditing/ConfigurableParameterEditing';
import { Form } from 'antd';
import { PARAM_MASTER } from 'constants/paramMaster';
// import {AddEditForm} from 'components/common/ConfigurableParameterEditing/AddEditForm';


const FormWrapper = (props) => {
    const [ConfigForm] = Form.useForm();

    const myFormMock={
        ...ConfigForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn()
    }
    return <ConfigurableParameterEditing ConfigForm={myFormMock} {...props} />
}

describe("Render ConfigurableParameterEditing Component",()=>{

    it("search image click should work",()=>{
        const props = {
            onSearchHandle:jest.fn(),
            setFilterString:jest.fn(),
            setSearchdata:jest.fn(),
        }

        customRender(<ConfigurableParameterEditing {...props} />)

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);
    })

    it('plus Add button click should work',()=>{
        const configData = [
            {
                controlGroup: "CMN",
                controlId:"PWDUPD",
                controlDescription: "Days after which password needs to be updated",
                configurableParameterType: "N",

            }
        ]
        const props = {
            ...configData,
            handleAdd:jest.fn(),
            setFormActionType:jest.fn(),
            setShowSaveAndAddNewBtn:jest.fn(),
            setIsViewModeVisible:jest.fn(),
            setFooterEdit:jest.fn(),
            setIsFormVisible:jest.fn(),
            setIsReadOnly:jest.fn(),
            setFormData:jest.fn(),
            setParameterType:jest.fn(),
        }

        customRender(<FormWrapper {...props} />)

        const plusAddBtn = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAddBtn)
    })

    it('should render table', ()=>{
        
        customRender(<ConfigurableParameterEditing isVisible={true} />)

        const srl = screen.getByRole('columnheader',{name:'Srl.'})
        expect(srl).toBeTruthy();

        const controlID = screen.getByRole('columnheader',{name:'Control ID'})
        expect(controlID).toBeTruthy();

        const controlDescription = screen.getByRole('columnheader',{name:'Control Description'})
        expect(controlDescription).toBeTruthy();

        const configPara = screen.getByRole('columnheader',{name:'Configurable Parameter Type'})
        expect(configPara).toBeTruthy();

        const configValues = screen.getByRole('columnheader',{name:'Configurable Parameter Values'})
        expect(configValues).toBeTruthy();

        const controlGroup = screen.getByRole('columnheader',{name:'Control Group'})
        expect(controlGroup).toBeTruthy();

        const action = screen.getByRole('columnheader',{name:'Action'})
        expect(action).toBeTruthy();
    })

    it('tblPrepareColumns', ()=>{
        const record = {
            booleanValue: null,
            configurableParameterType: "N",
            controlDescription: "Days after which password needs to be updateds",
            controlGroup: "CMN",
            controlGroupName: "Common",
            controlId: "PWDUPD",
            controlName: "Update Password",
            fromDate: null,
            fromNumber: 90,
            id: "470b3361-7b92-4cb3-8582-d4bf0800ef2e",
            isActive: true,
            textValue: null,
            toDate: null,
            toNumber: 90,
        } 

        const renderTableColumnName=jest.fn();

        const tableProps = {
            tableColumn: [
                {
                dataIndex: "configurableParameterType",
                title: "Configurable Parameter Type",
                render:(text, record, value) => renderTableColumnName(record, 'configurableParameterType', PARAM_MASTER.CFG_PARAM_TYPE.id),
                }
            ],
            tableData: [
                {
                    booleanValue: null,
                    configurableParameterType: "N",
                    controlDescription: "Number of Invalid login Attempts after which account will be locked",
                    controlGroup: "SM",
                    controlGroupName: "Invalid login Attempts",
                    controlId: "ACLOK",
                    controlName: "Lock Account",
                    fromDate: null,
                    fromNumber: 5,
                    id: "6b476b7a-c82b-4a66-89eb-caeb960d5122",
                    isActive: true,
                    textValue: null,
                    toDate: null,
                    toNumber: 6,
                }
            ],
        };

        const props = {
            ...record,
            tblPrepareColumns:jest.fn(),
            renderConfigurableParemetarValue:jest.fn(),
            isLoading:false,
        }

        customRender(<ConfigurableParameterEditing  {...props} tableProps={tableProps} />)
    })

    // it('drawerTitle',()=>{
    //     const formData = {
    //         ooleanValue: null,
    //         configurableParameterType: "N",
    //         controlDescription: "Days after which password needs to be updated",
    //         controlGroup: "CMN",
    //         controlGroupName: "Common",
    //         controlId: "PWDUPD",
    //         controlName: "Update Password",
    //         fromDate: null,
    //         fromNumber: 90,
    //         id: "470b3361-7b92-4cb3-8582-d4bf0800ef2e",
    //         isActive: true,
    //         textValue: null,
    //         toDate: null,
    //         toNumber: 90,
    //     }
    //     const isViewModeVisible = true;
    //     const drawerTitle = jest.fn();
    //     customRender(<ConfigurableParameterEditing isViewModeVisible={isViewModeVisible} drawerTitle={drawerTitle} formData={formData} />)

    //     const result = drawerTitle([]);
    //     console.log(result, "test case");
    //     expect(result).toBe('View')

    //     expect(drawerTitle([])).toBe('Edit');

    //     screen.debug(result)

    // })

    // it('onCloseAction', ()=>{
    //     const FormWrapper = (props) => {
    //         const [form] = Form.useForm();
        
    //         const myFormMock={
    //             ...form,
    //             setFieldValue: jest.fn(),
    //             setFieldsValue: jest.fn(),
    //         }
    //         return <AddEditForm form={myFormMock} {...props} />
    //     }

    //     const props = {
    //         isViewModeVisible:false,
    //         isVisible:true,
    //         isReadOnly:false,
    //         isLoadingOnSave:false,
    //         isFormBtnActive:false,
    //         saveAndAddNewBtnClicked:false,
    //         showSaveBtn:true,
    //         titleOverride:'Edit Configurable Parameter Editing',
    //         onCloseAction:jest.fn(),

    //         setIsFormVisible:jest.fn(),
    //         setFormBtnActive:jest.fn(),
    //         setFormData:jest.fn(),

    //         typeData:[],
    //         setParameterType:jest.fn(),
    //         isFormVisible:false,
    //         isFormBtnActive:false,
    //         formData:[]

    //     }
    //     customRender(<FormWrapper {...props} />)
    //     const cancelBtn = screen.getByRole('button', {name:'Cancel'})
    //     fireEvent.click(cancelBtn)

    //     const closeImg = screen.getByRole('img', {name:'close'})
    //     fireEvent.click(closeImg)

    // })

})






