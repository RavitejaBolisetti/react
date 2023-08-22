/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const initialDealerBranches = [
    // { branchName: 'Delhi', accessible: true, defaulIndicator: false },
    // { branchName: 'Noida', accessible: true, defaulIndicator: false },
    // { branchName: 'Greater Noida', accessible: true, defaulIndicator: true },
    // { branchName: 'Mumbai', accessible: false, defaulIndicator: false },
    {
        id: '3c9a5796-9ddc-4f8d-af05-00',
        locationName: 'Mumbai',
        userId: 'deepakpalariya',
        locationCode: 'loc00',
        parentGroupId: null,
        status: true,
        defaultBranchIndicator: false,
    },
    {
        id: '3c9a5796-9ddc-4f8d-af05-01',
        locationName: 'Delhi',
        userId: 'deepakpalariya',
        locationCode: 'loc01',
        parentGroupId: null,
        status: true,
        defaultBranchIndicator: false,
    },
    {
        id: '3c9a5796-9ddc-4f8d-af05-02',
        locationName: 'Noida',
        userId: 'deepakpalariya',
        locationCode: 'loc01',
        parentGroupId: null,
        status: true,
        defaultBranchIndicator: false,
    },
    {
        id: '3c9a5796-9ddc-4f8d-af05-03',
        locationName: 'Chennai',
        userId: 'deepakpalariya',
        locationCode: 'loc01',
        parentGroupId: null,
        status: null,
        defaultBranchIndicator: true,
    },
];

export const manufacturerList = [
    {
        tokenNumber: 'MA001',
        userName: 'Vivek Verma',
        designation: 'Chief Sales Officer',
        useRoles: '3',
        hierarchyMapping: true,
        productsMapping: true,
    },
];

export const dealerList = [
    {
        employeeCode: 'VI1186740T',
        dealerName: 'Dealer 1',
        userName: 'Vivek Verma',
        useRoles: '5',
        brancheMapping: false,
        productsMapping: true,
    },
];

export const dealersData = ['Dealer 1', 'Dealer 2', 'Dealer 3', 'Dealer 4', 'Dealer 5', 'Dealer 6 '];

export let dealerTokenData = {
    employeeCode: 'EM-4455',
    dealerName: 'selectedDealer',
    userName: 'employeeName',
    designation: 'employeeDesignation',
    employeeMobileNumber: '9988776655',
    employeeEmail: 'employeeEmail',
};

export const dealerResData = {
    id: 'string',
    employeeCode: 'string',
    employeeName: 'string',
    employeeDesignation: 'string',
    createUser: 'string',
    userRoleMapBaseRequestList: [
        {
            id: 'string',
            roleId: 'string',
            status: true,
            webRoleManagementRequest: [
                {
                    id: 'string',
                    applicationId: 'string',
                    value: 'string',
                    label: 'string',
                    type: 'string',
                    parentId: 'string',
                    checked: true,
                    status: true,
                    children: ['string'],
                },
            ],
            mobileRoleManagementRequest: [
                {
                    id: 'string',
                    applicationId: 'string',
                    value: 'string',
                    label: 'string',
                    type: 'string',
                    parentId: 'string',
                    checked: true,
                    status: true,
                    children: ['string'],
                },
            ],
        },
    ],
    branches: [
        {
            id: 'string',
            branchCode: 'string',
            defaultBranch: true,
            status: true,
        },
    ],
    products: [
        {
            id: 'string',
            productCode: 'string',
            status: true,
        },
    ],
    userDevices: [
        {
            id: 'string',
            deviceType: 'string',
            deviceId: 'string',
            status: true,
        },
    ],
};

export const manufacturerResData = {
    status: 'OK',
    statusCode: 200,
    responseMessage: 'User Details Retrieved Successfully.',
    data: {
        tokenNumber: 'mnmdmsad_23106507',
        userName: 'Nikhil Dabeer',
        contactMobileNumber: '+919999000918',
        contactEmail: 'DABEER.NIKHIL@mahindra.com',
        Designation: 'DES001',
        mobileRoleManagementRequest: [
            {
                id: '',
                masterId: 'MN',
                title: 'Manager',
                type: 'Role',
                parentId: 'Mobile',
                checked: false,
                status: null,
                submenu: [],
            },
        ],
        webRoleManagementRequest: [
            {
                id: '',
                masterId: 'MN',
                title: 'Manager',
                type: 'Role',
                parentId: 'Web',
                checked: false,
                status: null,
                submenu: [
                    {
                        id: '',
                        masterId: 'Finac',
                        title: 'Financial Accounting',
                        type: 'Application',
                        parentId: 'Web',
                        checked: false,
                        status: null,
                        submenu: [
                            {
                                id: '',
                                masterId: 'FINA-06',
                                title: 'SAR/SBE ',
                                type: 'Application',
                                parentId: 'Finac',
                                checked: false,
                                status: null,
                                submenu: [
                                    {
                                        id: '',
                                        masterId: 'TST01',
                                        title: 'TST cl',
                                        type: 'Application',
                                        parentId: 'Finac',
                                        checked: false,
                                        status: null,
                                        submenu: [
                                            {
                                                id: '',
                                                masterId: 'C01',
                                                title: 'Create',
                                                type: 'Action',
                                                parentId: 'NA',
                                                checked: false,
                                                status: null,
                                                submenu: null,
                                            },
                                            {
                                                id: '',
                                                masterId: 'V01',
                                                title: 'Update',
                                                type: 'Action',
                                                parentId: 'NA',
                                                checked: false,
                                                status: null,
                                                submenu: null,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
        manufactureAdminHeirarchy: [
            {
                id: '16cc66b0-6426-4dab-83dc-370b85afe5b0',
                mfgAdmnCode: 'NDA',
                mfgAdmnLongName: 'Noida AO',
                mfgAdmnShrtName: 'Noida AO',
                actvInd: 'Y',
                adAmHirchyAttrbtMstSk: '804b2073-a61d-4da2-bd32-ac86b8133fb0',
            },
        ],
    },
};

export const productDataTree = [
    {
        id: '1',
        productCode: 'MH01',
        productName: 'Thar',
        status: true,
        children: [
            {
                id: '13',
                productCode: 'MH101',
                productName: 'Bolero',
                status: true,
            },
            {
                id: '131',
                productCode: 'MH1011',
                productName: 'Bolero000',
                status: true,
            },
        ],
    },
    {
        id: '2',
        productCode: 'MH700',
        productName: 'XUV700',
        status: true,
        children: [
            {
                id: '103',
                productCode: 'MH1201',
                productName: 'TUV300',
                status: true,
            },
        ],
    },
    {
        id: '3',
        productCode: 'MH500',
        productName: 'XUV500',
        status: true,
    },
];

export const adminDataTree = [
    {
        id: '1',
        adminCode: 'MH01',
        adminName: 'Admn1',
        status: true,
        children: [
            {
                id: '13',
                adminCode: 'MH101',
                adminName: 'Admn-21',
                status: true,
            },
        ],
    },
    {
        id: '2',
        adminCode: 'MH700',
        adminName: 'Admn-3',
        status: true,
        children: [
            {
                id: '103',
                adminCode: 'Admn-4',
                adminName: 'Admn-4',
                status: true,
            },
        ],
    },
    {
        id: '3',
        adminCode: 'MH500',
        adminName: 'Admin-8',
        status: true,
        children: [],
    },
];
