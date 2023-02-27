import { AiFillCar } from 'react-icons/ai';
import { FaHeart, FaUserTie, FaAddressBook, FaCreativeCommonsShare, FaWrench } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { MdWeb } from 'react-icons/md';
import { BsFillGearFill } from 'react-icons/bs';
import { GrGroup } from 'react-icons/gr';

import { getMenyKey } from 'utils/menuKey';

import * as routing from './routing';

export const MenuConstant = {
    [getMenyKey('FEV')]: {
        key: 'FEV',
        link: undefined,
        icon: <FaHeart fontSize={20} />,
        parentMenuId: 'FEV',
    },

    [getMenyKey('DASH')]: {
        key: 'DASH',
        link: routing.ROUTING_DASHBOARD,
        icon: undefined,
        parentMenuId: 'FEV',
    },

    [getMenyKey('COMN-07.01')]: {
        key: 'COMN-07.01',
        link: routing.ROUTING_COMMON_GEO,
        icon: undefined,
        parentMenuId: 'FEV',
    },

    [getMenyKey('COMN-06.01')]: {
        key: 'COMN-06.01',
        link: routing.ROUTING_COMMON_PRODUCT_HIERARCHY,
        icon: undefined,
        parentMenuId: 'FEV',
    },

    [getMenyKey('COMN-03.08')]: {
        key: 'HAM',
        link: routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER,
        icon: undefined,
        parentMenuId: 'FEV',
    },
    [getMenyKey('COMN-05')]:  {
        key: 'MOH',
        link: routing.ROUTING_COMMON_MANUFACTURER_ORGANIZATION_HIERARCHY,
        icon: undefined,
        parentMenuId: 'ADMN',
    },

    [getMenyKey('PMA')]: {
        key: 'PMA',
        link: routing.ROUTING_COMMON_PRODUCT_MASTER,
        icon: undefined,
        parentMenuId: 'FEV',
    },

    [getMenyKey('COMN')]: {
        link: undefined,
        icon: <FaCreativeCommonsShare fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('DBP')]: {
        link: undefined,
        icon: <FaAddressBook fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('Finac')]: {
        link: undefined,
        icon: <BiRupee fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('HR')]: {
        link: undefined,
        icon: <GrGroup fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('Sales')]: {
        link: undefined,
        icon: <AiFillCar fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('SERV')]: {
        link: undefined,
        icon: <FaWrench fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('ADMN')]: {
        link: undefined,
        icon: <FaUserTie fontSize={18} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('SPR')]: {
        link: undefined,
        icon: <BsFillGearFill fontSize={18} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('CRM')]: {
        link: undefined,
        icon: <MdWeb fontSize={18} />,
        parentMenuId: 'WEB',
    },
};
