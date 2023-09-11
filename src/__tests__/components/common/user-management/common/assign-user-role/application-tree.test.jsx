import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen } from "@testing-library/react";
import { ApplicationTree } from 'components/common/UserManagement/common/AssignUserRole/ApplicationTree';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

var mobileApplications = [
    {
        label: 'Parent 1',
        value: 'value1',
        children: [
            { label: 'Child 1', value: 'value1.1', checked: true },
            { label: 'Child 2', value: 'value1.2', checked: false },
            { label: 'Child 3', value: 'value1.3', checked: true }
        ]
    },
];

describe('Application Tree components', () => {

    it('should render Application Tree components', () => {
        const formActionType = { addMode: false }
        customRender(<ApplicationTree formActionType={formActionType} />);
    });

    it('tree with checkbox should work for mobile', () => {
        const formActionType = { addMode: false }
        const { container } = customRender(<ApplicationTree deviceType={'M'} formActionType={formActionType} setDeviceType={jest.fn()} mobileApplications={mobileApplications} setDisableMdlSaveBtn={jest.fn()} setCheckedKeys={jest.fn()} setMobileApplications={jest.fn()}/>);
        
        const web=screen.getByRole('tab', { name: 'Web' })
        fireEvent.click(web);

        const mobile=screen.getByRole('tab', { name: 'Mobile' })
        fireEvent.click(mobile);

        const parentCollapse=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(parentCollapse);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const childCheckBoxElement = container.getElementsByClassName('ant-tree-checkbox');
        for(let i=0; i<childCheckBoxElement.length; i++) {
            fireEvent.click(childCheckBoxElement[i]);
        }
    });

    it('tree with checkbox should work for web', () => {
        const formActionType = { addMode: false }
        const { container } = customRender(<ApplicationTree deviceType={'W'} formActionType={formActionType} setDeviceType={jest.fn()} webApplications={mobileApplications} setDisableMdlSaveBtn={jest.fn()} setCheckedKeys={jest.fn()} setWebApplications={jest.fn()}/>);
        
        const web=screen.getByRole('tab', { name: 'Web' })
        fireEvent.click(web);

        const parentCollapse=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(parentCollapse);

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const childCheckBoxElement = container.getElementsByClassName('ant-tree-checkbox');
        for(let i=0; i<childCheckBoxElement.length; i++) {
            fireEvent.click(childCheckBoxElement[i]);
        }
    });

    it('search should work in role access', () => {
        const formActionType = { addMode: false }
        customRender(<ApplicationTree deviceType={'W'} formActionType={formActionType} setDeviceType={jest.fn()} webApplications={mobileApplications} setDisableMdlSaveBtn={jest.fn()} setCheckedKeys={jest.fn()} setWebApplications={jest.fn()}/>);
        
        const web=screen.getByRole('tab', { name: 'Web' })
        fireEvent.click(web);

        const parentCollapse=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(parentCollapse);

        const searchBox=screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Child 1' } });
    });

});