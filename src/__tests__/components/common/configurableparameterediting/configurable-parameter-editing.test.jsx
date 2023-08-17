import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, logRoles } from '@testing-library/react';
import {ConfigurableParameterEditing} from 'components/common/ConfigurableParameterEditing/ConfigurableParameterEditing';
import { Form } from 'antd';

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

            },
            {
                controlGroup: "CMN",
                controlId:"PWDUPD",
                controlDescription: "Days after which password needs to be updated",
                configurableParameterType: "N",

            },
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
        const props = {
            ...record,
            tblPrepareColumns:jest.fn(),
            renderConfigurableParemetarValue:jest.fn(),
            tableColumn:[],
            renderTableColumnName:jest.fn(),
            typeData:[]
        }
        customRender(<ConfigurableParameterEditing isVisible={true} {...props} />)

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

})




