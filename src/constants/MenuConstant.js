/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { AiFillCar } from 'react-icons/ai';
import { FaAddressBook, FaCreativeCommonsShare } from 'react-icons/fa';
import { MdStars } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';
import { HomeIcon, AdminIcon, HrIcon, RupeeIcon, CrmIcon, ServiceIcon, SparesIcon } from 'Icons';

import { getMenyKey } from 'utils/menuKey';
import * as routing from './routing';

export const MenuConstant = {
    [getMenyKey('FAV')]: {
        key: 'FAV',
        link: undefined,
        icon: <MdStars fontSize={22} />,
        parentMenuId: 'FAV',
    },

    [getMenyKey('HOM')]: {
        key: 'HOM',
        link: routing.ROUTING_DASHBOARD,
        icon: <HomeIcon fontSize={22} />,
        parentMenuId: '',
    },

    [getMenyKey('DASH')]: {
        key: 'DASH',
        link: routing.ROUTING_DASHBOARD,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('COMN-06.01')]: {
        key: 'COMN-06.01',
        link: routing.ROUTING_COMMON_PRODUCT_HIERARCHY,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('SACT-06.01')]: {
        key: 'SACT-06.01',
        link: routing.ROUTING_OTF,
        icon: undefined,
        parentMenuId: 'OTD',
    },

    [getMenyKey('SACT-06.05')]: {
        key: 'SACT-06.05',
        link: routing.ROUTING_VEHICLE_ALLOTMENT,
        icon: undefined,
        parentMenuId: 'OTD',
    },

    [getMenyKey('SACT-04.10')]: {
        key: 'SACT-04.10',
        link: routing.STOCK_TRANSFER_INDENT,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },

    [getMenyKey('COMN-10.01')]: {
        key: 'COMN-10.01',
        link: routing.ROUTING_COMMON_CUSTOMER_MASTER,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },

    [getMenyKey('COMN-05.01')]: {
        key: 'COMN-05.01',
        link: routing.ROUTING_COMMON_MANUFACTURER_ORGANIZATION_HIERARCHY,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('COMN-03.08')]: {
        key: 'HAM',
        link: routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('COMN-03.01')]: {
        key: 'COMN-03.01',
        link: routing.ROUTING_COMMON_CRITICALITY_GROUP,
        icon: undefined,
        parentMenuId: 'COMN-03',
    },

    [getMenyKey('COMN-03.04')]: {
        key: 'COMN-03.04',
        link: routing.ROUTING_COMMON_TERM_CONDITION_MANUFACTURER,
        icon: undefined,
        parentMenuId: 'COMN-03',
    },

    [getMenyKey('COMN-03.05')]: {
        key: 'COMN-03.05',
        link: routing.ROUTING_COMMON_TERM_CONDITION_DEALER,
        icon: undefined,
        parentMenuId: 'COMN-03',
    },

    [getMenyKey('COMN')]: {
        link: undefined,
        icon: <FaCreativeCommonsShare fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('COMN-05.04')]: {
        key: 'COMN-05.04',
        link: routing.ROUTING_COMMON_MANUFACTURER_ADMINISTRATIVE_HIERARCHY,
        icon: undefined,
        parentMenuId: 'ADMN',
    },

    [getMenyKey('COMN-08.05')]: {
        key: 'COMN-08.05',
        link: routing.ROUTING_MILE_DEALER_HIERARCHY_DEALER_PARENT,
        icon: undefined,
        parentMenuId: 'COMN-08',
    },

    [getMenyKey('COMN-08.06')]: {
        key: 'COMN-08.06',
        link: routing.ROUTING_MILE_DEALER_HIERARCHY_DEALER_COMPANY,
        icon: undefined,
        parentMenuId: 'COMN-08',
    },
    // [getMenyKey('COMN-07.01')]: {
    //     key: 'COMN-07.01',
    //     link: routing.ROUTING_COMMON_GEO,
    //     icon: undefined,
    //     parentMenuId: 'FAV',
    // },

    // [getMenyKey('COMN-07.02')]: {
    //     key: 'COMN-07.02',
    //     link: routing.ROUTING_COMMON_GEO_COUNTRY,
    //     icon: undefined,
    //     parentMenuId: 'COMN-07',
    // },

    [getMenyKey('COMN-07.03')]: {
        key: 'COMN-07.03',
        link: routing.ROUTING_COMMON_GEO_STATE,
        icon: undefined,
        parentMenuId: 'COMN-07',
    },

    [getMenyKey('COMN-07.04')]: {
        key: 'COMN-07.04',
        link: routing.ROUTING_COMMON_GEO_DISTRICT,
        icon: undefined,
        parentMenuId: 'COMN-07',
    },

    [getMenyKey('COMN-07.05')]: {
        key: 'COMN-07.05',
        link: routing.ROUTING_COMMON_GEO_CITY,
        icon: undefined,
        parentMenuId: 'COMN-07',
    },

    [getMenyKey('COMN-07.06')]: {
        key: 'COMN-07.06',
        link: routing.ROUTING_COMMON_GEO_TEHSIL,
        icon: undefined,
        parentMenuId: 'COMN-07',
    },

    [getMenyKey('COMN-07.07')]: {
        key: 'COMN-07.07',
        link: routing.ROUTING_COMMON_GEO_PINCODE,
        icon: undefined,
        parentMenuId: 'COMN-07',
    },

    [getMenyKey('COMN-07.07')]: {
        key: 'COMN-07.07',
        link: routing.ROUTING_COMMON_GEO_PINCODE,
        icon: undefined,
        parentMenuId: 'COMN-07',
    },

    [getMenyKey('COMN-10.02')]: {
        key: 'COMN-10.02',
        link: routing.ROUTING_COMMON_PARTY_MASTER,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },

    [getMenyKey('COMN-10.04')]: {
        key: 'COMN-10.04',
        link: routing.ROUTING_COMMON_LESSOR_CUSTOMER_CREATION,
        icon: undefined,
        parentMenuId: 'COMN-10.a',
    },

    [getMenyKey('COMN-10.03')]: {
        key: 'COMN-10.03',
        link: routing.ROUTING_COMMON_LESSOR_COMPANY_MASTER,
        icon: undefined,
        parentMenuId: 'COMN-10.a',
    },

    [getMenyKey('COMN-11.01')]: {
        key: 'COMN-11.01',
        link: routing.ROUTING_VEHICLE_DETAILS,
        icon: undefined,
        parentMenuId: 'COMN-11',
    },
    [getMenyKey('SACT-03.04')]: {
        key: 'SACT-03.04',
        link: routing.ROUTING_VEHICLE_PRICE_MASTER,
        icon: undefined,
        parentMenuId: 'SACT-03',
    },

    [getMenyKey('SACT-03.01')]: {
        key: 'SACT-03.01',
        link: routing.ROUTING_HO_PRICE_MAPPING,
        icon: undefined,
        parentMenuId: 'SACT-03',
    },

    [getMenyKey('SACT-04.01')]: {
        key: 'SACT-04.01',
        link: routing.ROUTING_VECHILE_PURCHASE_ORDER,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },

    [getMenyKey('SACT-04.05')]: {
        key: 'SACT-04.05',
        link: routing.ROUTING_RSM_APPROVAL,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },

    [getMenyKey('MILE-01.04')]: {
        key: 'MILE-01.04',
        link: routing.ROUTING_MILE_DEALER_MANPOWER_LOCATION_TYPE_MASTER,
        icon: undefined,
        parentMenuId: 'COMN-08',
    },

    [getMenyKey('MILE-02.02')]: {
        key: 'MILE-02.02',
        link: routing.ROUTING_MILE_DEALER_MANPOWER_DIVISION_MASTER,
        icon: undefined,
        parentMenuId: 'MILE-02',
    },

    [getMenyKey('MILE-02.03')]: {
        key: 'MILE-02.03',
        link: routing.ROUTING_MILE_DEALER_MANPOWER_EMPLOYEE_DEPARTMENT_MASTER,
        icon: undefined,
        parentMenuId: 'MILE-02',
    },

    [getMenyKey('MILE-02.05')]: {
        key: 'MILE-02.05',
        link: routing.ROUTING_MILE_DEALER_MANPOWER_ROLE_MASTER,
        icon: undefined,
        parentMenuId: 'MILE-02',
    },

    [getMenyKey('MILE-02.08')]: {
        key: 'MILE-02.08',
        link: routing.ROUTING_MILE_DEALER_MANPOWER_DESIGNATION_MASTER,
        icon: undefined,
        parentMenuId: 'MILE-02',
    },

    [getMenyKey('MILE-04.04')]: {
        key: 'MILE-04.04',
        link: routing.ROUTING_MILE_DEALER_MANPOWER_BAY_TYPE_MASTER,
        icon: undefined,
        parentMenuId: 'MILE-02',
    },

    [getMenyKey('MILE-01.04')]: {
        key: 'MILE-01.04',
        link: routing.ROUTING_MILE_DEALER_MANPOWER_LOCATION_TYPE_MASTER,
        icon: undefined,
        parentMenuId: 'COMN-08',
    },

    [getMenyKey('COMN-02.01')]: {
        key: 'COMN-02.01',
        link: routing.ROUTING_COMMON_ROLE_MANAGEMENT,
        icon: undefined,
        parentMenuId: 'COMN-02',
    },

    [getMenyKey('COMN-02.02')]: {
        key: 'COMN-02.02',
        link: routing.ROUTING_COMMON_USER_MANAGEMENT,
        icon: undefined,
        parentMenuId: 'COMN-02',
    },

    [getMenyKey('COMN-03.02')]: {
        key: 'COMN-03.02',
        link: routing.ROUTING_COMMON_APPLICATION_MASTER,
        icon: undefined,
        parentMenuId: 'COMN-03',
    },

    [getMenyKey('COMN-03.07')]: {
        key: 'COMN-03.07',
        link: routing.ROUTING_COMMON_CONFIG_PARAM_EDIT,
        icon: undefined,
        parentMenuId: 'COMN-03',
    },

    [getMenyKey('COMN-05.03')]: {
        key: 'COMN-05.03',
        link: routing.ROUTING_COMMON_BRANCH_DEALER_MAPPING,
        icon: undefined,
        parentMenuId: 'COMN-05',
    },
    [getMenyKey('COMN-10.01')]: {
        key: 'COMN-10.01',
        link: routing.ROUTING_COMMON_CUSTOMER_MASTER,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },

    [getMenyKey('DBP')]: {
        link: undefined,
        icon: <FaAddressBook fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('Finac')]: {
        link: undefined,
        icon: <RupeeIcon fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('FINA-01.01')]: {
        key: 'FINA-01.01',
        link: routing.ROUTING_FINANCIAL_ACCOUNTING_CHART_OF_ACCOUNT,
        icon: undefined,
        parentMenuId: 'FINA-01',
    },

    [getMenyKey('FINA-01.02')]: {
        key: 'FINA-01.02',
        link: routing.ROUTING_FINANCIAL_ACCOUNTING_ACCOUNT_CATEGORY,
        icon: undefined,
        parentMenuId: 'FINA-01',
    },

    [getMenyKey('FINA-01.03')]: {
        key: 'FINA-01.03',
        link: routing.ROUTING_DOCUMENT_TYPE,
        icon: undefined,
        parentMenuId: 'FINA-01',
    },

    [getMenyKey('FINA-01.04')]: {
        key: 'FINA-01.04',
        link: routing.ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES,
        icon: undefined,
        parentMenuId: 'FINA-01',
    },

    [getMenyKey('FINA-01.05')]: {
        key: 'FINA-01.05',
        link: routing.ROUTING_FINANCIAL_ACCOUNTING_TAX_CHARGES_CATEGORY,
        icon: undefined,
        parentMenuId: 'FINA-01',
    },
    [getMenyKey('FINA-02.05')]: {
        key: 'FINA-02.05',
        link: routing.ROUTING_CREDIT_DEBIT_NOTE,
        icon: undefined,
        parentMenuId: 'FINA-02',
    },

    [getMenyKey('HR')]: {
        link: undefined,
        icon: <HrIcon fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('Sales')]: {
        link: undefined,
        icon: <AiFillCar fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('SERV')]: {
        link: undefined,
        icon: <ServiceIcon fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('ADMN')]: {
        link: undefined,
        icon: <AdminIcon fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('MILE-02.19')]: {
        key: 'MILE-02.19',
        link: routing.ROUTING_MILE_DEALER_MANPOWER,
        icon: undefined,
        parentMenuId: 'MILE-02',
    },

    [getMenyKey('MILE-02.04')]: {
        key: 'MILE-02.04',
        link: routing.ROUTING_COMMON_QUALIFICATION_MASTER,
        icon: undefined,
        parentMenuId: 'MILE-02',
    },

    [getMenyKey('SPR')]: {
        link: undefined,
        icon: <SparesIcon fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('CRM')]: {
        link: undefined,
        icon: <CrmIcon fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('RPT')]: {
        link: undefined,
        icon: <TbReport fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('RPT-OTF')]: {
        key: 'RPT-OTF',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'RPT',
        slug: 'booking-report',
    },

    [getMenyKey('SACR-05.10')]: {
        key: 'SACR-05.10',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'OTDR',
        slug: 'area-wise-sales-report',
    },

    [getMenyKey('SACR-05.21')]: {
        key: 'SACR-05.21',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'OTDR',
        slug: 'vdc-pending-report',
    },

    [getMenyKey('DELSO')]: {
        key: 'DELSO',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.04',
        slug: 'so-mapping-report',
    },

    [getMenyKey('SACR-04.17')]: {
        key: 'SACR-04.17',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.04',
        slug: 'stock-status-report',
    },
    [getMenyKey('SACR-04.23')]: {
        key: 'SACR-04.23',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.04',
        slug: 'evr-detail-analysis-report',
    },
    [getMenyKey('SACR-04.15')]: {
        key: 'SACR-04.15',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.04',
        slug: 'vehicle-stock-availability-report',
    },
    [getMenyKey('SACR-04.09')]: {
        key: 'SACR-04.09',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.04',
        slug: 'stock-transfer-report',
    },
    [getMenyKey('SACR-04.01')]: {
        key: 'SACR-04.01',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.05',
        slug: 'POSO',
    },
    [getMenyKey('FINA-02.10')]: {
        key: 'FINA-02.10',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.03',
        slug: 'voucher-report',
    },

    [getMenyKey('VDNRPT')]: {
        key: 'VDNRPT',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'SACR-02.05',
        slug: 'vehicle-delivery-note-report',
    },

    [getMenyKey('RPT-DLRNOTE')]: {
        key: 'RPT-DLRNOTE',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'RPT',
        slug: 'delivery-note',
    },

    [getMenyKey('RPT-PG')]: {
        key: 'RPT-PG',
        link: routing.ROUTING_REPORT_PAGINATED_REPORT,
        icon: undefined,
        parentMenuId: 'RPT',
    },

    [getMenyKey('RPT-ER')]: {
        key: 'RPT-ER',
        link: routing.ROUTING_REPORT_EMBEDDED_REPORT,
        icon: undefined,
        parentMenuId: 'RPT',
    },

    [getMenyKey('RPT-FR')]: {
        key: 'RPT-FR',
        link: routing.ROUTING_REPORT_URL_FILTER_REPORT,
        icon: undefined,
        parentMenuId: 'RPT',
    },

    [getMenyKey('COMN-03.02')]: {
        key: 'COMN-03.02',
        link: routing.ROUTING_COMMON_APPLICATION_MASTER,
        icon: undefined,
        parentMenuId: 'ADMN',
    },

    [getMenyKey('SACT-04.03')]: {
        key: 'SACT-04.03',
        link: routing.ROUTING_VEHICLE_TRACKING,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },

    [getMenyKey('SACT-04.08')]: {
        key: 'SACT-04.08',
        link: routing.ROUTING_VEHICLE_RECEIPT,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },

    [getMenyKey('SACT-04.07')]: {
        key: 'SACT-04.07',
        link: routing.ROUTING_VEHICLE_RECIEPT_CHECKLIST,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },

    [getMenyKey('SACT-06.08')]: {
        key: 'SACT-06.08',
        link: routing.ROUTING_DELIVERY_NOTE_INVOICE_CANELLATION,
        icon: undefined,
        parentMenuId: 'SACT-06.07',
    },

    [getMenyKey('SACT-06.06')]: {
        key: 'SACT-06.06',
        link: routing.ROUTING_VEHICLE_INVOICE_GENERATION,
        icon: undefined,
        parentMenuId: 'OTD',
    },

    [getMenyKey('SACT-06.07')]: {
        key: 'SACT-06.07',
        link: routing.ROUTING_VEHICLE_DELIVERY_NOTE,
        icon: undefined,
        parentMenuId: 'OTD',
    },

    [getMenyKey('FINA-01.06')]: {
        key: 'FINA-01.06',
        link: routing.ROUTING_VEHICLE_MODEL_TAX_CHARGES_CATEGORY,
        icon: undefined,
        parentMenuId: 'FINA-01',
    },

    [getMenyKey('FINA-02.01')]: {
        key: 'FINA-02.01',
        link: routing.ROUTING_RECEIPTS,
        icon: undefined,
        parentMenuId: 'FINA-02',
    },

    [getMenyKey('SACT-03.02')]: {
        key: 'SACT-03.02',
        link: routing.ROUTING_ONROAD_PRICE_MASTER,
        icon: undefined,
        parentMenuId: 'SACT-03',
    },
    

    [getMenyKey('SACT-04.02')]: {
        key: 'SACT-04.02',
        link: routing.ROUTING_SO_MAPPING_UNMAPPING,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },

    [getMenyKey('SACT-04.13')]: {
        key: 'SACT-04.13',
        link: routing.ROUTING_EVR_DETAILS_CAPTURING,
        icon: undefined,
        parentMenuId: 'SACT-04',
    },
};
