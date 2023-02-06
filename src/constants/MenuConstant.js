import { AiFillCar } from 'react-icons/ai';
import { FaHeart, FaUserTie } from 'react-icons/fa';
import { BiRupee } from 'react-icons/bi';
import { FaAddressBook, FaCreativeCommonsShare, FaWrench } from 'react-icons/fa';
import { GrGroup } from 'react-icons/gr';

import { getMenyKey } from 'utils/menuKey';

import * as routing from './routing';

export const MenuConstant = {
    [getMenyKey('FAVS')]: {
        key: 'FAVS',
        link: undefined,
        icon: <FaHeart fontSize={20} />,
        parentMenuId: 'FAVS',
    },

    [getMenyKey('DASH')]: {
        key: 'DASH',
        link: routing.ROUTING_DASHBOARD,
        icon: undefined,
        parentMenuId: 'FAVS',
    },
    [getMenyKey('GEO')]: {
        key: 'GEO',
        link: routing.ROUTING_COMMON_GEO,
        icon: undefined,
        parentMenuId: 'FAVS',
    },

    [getMenyKey('PHI')]: {
        key: 'PHI',
        link: routing.ROUTING_COMMON_PRODUCT_HIERARCHY,
        icon: undefined,
        parentMenuId: 'FAVS',
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
        icon: <FaUserTie fontSize={18} />,
        parentMenuId: 'WEB',
    },
    [getMenyKey('CRM')]: {
        link: undefined,
        icon: <FaUserTie fontSize={18} />,
        parentMenuId: 'WEB',
    },
};
