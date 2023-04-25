import { render, screen, fireEvent } from '@testing-library/react';
import { ApplicationMaster } from '../ApplicationMaster/ApplicationMaster';

jest.mock('react-redux', () => ({
    connect: () => (ApplicationMaster) => ApplicationMaster,
}));

window.matchMedia =
    window.matchMedia ||
    function () {
        return {
            matches: false,
            addListener: function () {},
            removeListener: function () {},
        };
    };

const fetchApplication = () => {
    return;
};

const fetchApplicationCriticality = () => {
    return;
};

const applicationDetailListShowLoading = () => {
    return;
};

const fetchApplicationAction = () => {
    return;
};

const fetchCriticalitiData = () => {
    return;
};

const applicationMasterDataShowLoading = () => {
    return;
};

const onSaveShowLoading = () => {
    return;
};

const saveApplicationDetails = () => {
    return;
};

const fetchList = () => {
    return;
};

const applicationListShowLoading = () => {
    return;
};

const treeData = [
    {
        menuId: 'SERV',
        menuTitle: 'Service',
        subMenu: [
            {
                menuId: 'SALES',
                menuTitle: 'Sales',
            },
            {
                menuId: 'COMM',
                menuTitle: 'Common',
            },
        ],
    },
];


const applicationDetailsDataSample = [
    {
        id: '14ff67a4-ba46-4c34-990b-e01f9df95065',
        applicationId: 'SERV',
        parentApplicationId: 'Web',
        applicationName: 'Service',
        applicationType: 'Module',
        applicationTitle: 'Service',
        documentNumRequired: true,
        status: true,
        nodeType: '',
        criticalityGroupMapId: 'cb84942b-83be-4578-9a42-6e34c5583abe',
        deviceType: 'W',
        accessableIndicator: 2,
        documentType: [
            {
                id: '',
                documentTypeCode: 'DC1',
                documentTypeDescription: 'DC NAME',
                digitalSignatureRequired: true,
                termAndConRequired: true,
            },
        ],
        applicationAction: [],
    },
];

describe('Application Master', () => {
    test('Is web tab present', async () => {
        render(<ApplicationMaster fetchApplication={fetchApplication} fetchApplicationCriticality={fetchApplicationCriticality} applicationDetailListShowLoading={applicationDetailListShowLoading} fetchApplicationAction={fetchApplicationAction} fetchCriticalitiData={fetchCriticalitiData} applicationMasterDataShowLoading={applicationMasterDataShowLoading} onSaveShowLoading={onSaveShowLoading} saveApplicationDetails={saveApplicationDetails} fetchList={fetchList} applicationListShowLoading={applicationListShowLoading} />);
        const webButton = screen.getByText('Web');
        expect(webButton).toBeInTheDocument();
    });

    test('Is mobile tab present', async () => {
        render(<ApplicationMaster fetchApplication={fetchApplication} fetchApplicationCriticality={fetchApplicationCriticality} applicationDetailListShowLoading={applicationDetailListShowLoading} fetchApplicationAction={fetchApplicationAction} fetchCriticalitiData={fetchCriticalitiData} applicationMasterDataShowLoading={applicationMasterDataShowLoading} onSaveShowLoading={onSaveShowLoading} saveApplicationDetails={saveApplicationDetails} fetchList={fetchList} applicationListShowLoading={applicationListShowLoading} />);
        const mobileButton = screen.getByText('Mobile');
        expect(mobileButton).toBeInTheDocument();
    });

    test('Is empty view card present', async () => {
        render(<ApplicationMaster fetchApplication={fetchApplication} fetchApplicationCriticality={fetchApplicationCriticality} applicationDetailListShowLoading={applicationDetailListShowLoading} fetchApplicationAction={fetchApplicationAction} fetchCriticalitiData={fetchCriticalitiData} applicationMasterDataShowLoading={applicationMasterDataShowLoading} onSaveShowLoading={onSaveShowLoading} saveApplicationDetails={saveApplicationDetails} fetchList={fetchList} applicationListShowLoading={applicationListShowLoading} />);
        const emptyText = screen.findByRole('emptyContainer');
        expect(emptyText).toBeTruthy();
    });

    test('Is edit, add child and add sibling button present', async () => {
        render(<ApplicationMaster applicationDetailsData={applicationDetailsDataSample} menuData={treeData} fetchApplication={fetchApplication} fetchApplicationCriticality={fetchApplicationCriticality} applicationDetailListShowLoading={applicationDetailListShowLoading} fetchApplicationAction={fetchApplicationAction} fetchCriticalitiData={fetchCriticalitiData} applicationMasterDataShowLoading={applicationMasterDataShowLoading} onSaveShowLoading={onSaveShowLoading} saveApplicationDetails={saveApplicationDetails} fetchList={fetchList} applicationListShowLoading={applicationListShowLoading} />);
        const treeNode = screen.getByText('Service');
        expect(treeNode).toBeInTheDocument();
        fireEvent.click(treeNode);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        const addChildBtn = screen.getByRole('button', { name: 'Add Child' });
        const addSiblingBtn = screen.getByRole('button', { name: 'Add Sibling' });

        expect(editBtn).toBeInTheDocument();
        expect(addChildBtn).toBeInTheDocument();
        expect(addSiblingBtn).toBeInTheDocument();
    });

    test('Is edit drawer opening', async () => {
        render(<ApplicationMaster applicationDetailsData={applicationDetailsDataSample} menuData={treeData} fetchApplication={fetchApplication} fetchApplicationCriticality={fetchApplicationCriticality} applicationDetailListShowLoading={applicationDetailListShowLoading} fetchApplicationAction={fetchApplicationAction} fetchCriticalitiData={fetchCriticalitiData} applicationMasterDataShowLoading={applicationMasterDataShowLoading} onSaveShowLoading={onSaveShowLoading} saveApplicationDetails={saveApplicationDetails} fetchList={fetchList} applicationListShowLoading={applicationListShowLoading} />);
        const treeNode = screen.getByText('Service');
        expect(treeNode).toBeInTheDocument();
        fireEvent.click(treeNode);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const applicationIdInputField = screen.getByPlaceholderText('Please enter Application Title');

        expect(applicationIdInputField).toHaveDisplayValue('Service');
    });

    test('Is edit drawer closing on clicking close', async () => {
        render(<ApplicationMaster applicationDetailsData={applicationDetailsDataSample} menuData={treeData} fetchApplication={fetchApplication} fetchApplicationCriticality={fetchApplicationCriticality} applicationDetailListShowLoading={applicationDetailListShowLoading} fetchApplicationAction={fetchApplicationAction} fetchCriticalitiData={fetchCriticalitiData} applicationMasterDataShowLoading={applicationMasterDataShowLoading} onSaveShowLoading={onSaveShowLoading} saveApplicationDetails={saveApplicationDetails} fetchList={fetchList} applicationListShowLoading={applicationListShowLoading} />);
        const treeNode = screen.getByText('Service');
        expect(treeNode).toBeInTheDocument();
        fireEvent.click(treeNode);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const webButton =  screen.getByRole('button',{ name: 'Web' });
        expect(webButton).toBeInTheDocument();
    });
});
