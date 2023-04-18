import { AiFillCar } from 'react-icons/ai';
import { FaAddressBook, FaCreativeCommonsShare } from 'react-icons/fa';
import { HiCurrencyRupee } from 'react-icons/hi';
import { MdStars } from 'react-icons/md';
import { TbReport } from 'react-icons/tb';
import { HomeIcon } from 'Icons';

import { getMenyKey } from 'utils/menuKey';

import * as routing from './routing';
import { AdminIcon, CrmIcon, HrIcon, ServiceIcon, SparesIcon } from 'Icons';

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
        icon: HomeIcon,
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

    [getMenyKey('PMA')]: {
        key: 'PMA',
        link: routing.ROUTING_COMMON_PRODUCT_MASTER,
        icon: undefined,
        parentMenuId: 'FAV',
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

    [getMenyKey('COMN-07.01')]: {
        key: 'COMN-07.01',
        link: routing.ROUTING_COMMON_GEO,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('COMN-03.01')]: {
        key: 'COMN-03.01',
        link: routing.ROUTING_COMMON_CRITICALITY_GROUP,
        icon: undefined,
        parentMenuId: 'COMN-03',
    },

    [getMenyKey('COMN-02.01')]: {
        key: 'COMN-02.01',
        link: routing.ROUTING_COMMON_ROLE_MANAGEMENT,
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

    [getMenyKey('DBP')]: {
        link: undefined,
        icon: <FaAddressBook fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('Finac')]: {
        link: undefined,
        icon: <HiCurrencyRupee fontSize={22} />,
        parentMenuId: 'WEB',
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
        link: routing.ROUTING_COMMON_DEALER_MANPOWER,
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
    [getMenyKey('RPT-BI')]: {
        key: 'RPT-BI',
        link: routing.ROUTING_REPORT_BI_REPORT,
        icon: undefined,
        parentMenuId: 'RPT',
    },

    [getMenyKey('RPT-PG')]: {
        key: 'RPT-PG',
        link: routing.ROUTING_REPORT_PAGINATED_REPORT,
        icon: undefined,        
        parentMenuId: 'RPT',
    },
};
