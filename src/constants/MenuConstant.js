import { AiFillCar } from 'react-icons/ai';
import { FaAddressBook, FaCreativeCommonsShare, FaWrench } from 'react-icons/fa';
import { HiCurrencyRupee } from 'react-icons/hi';
import { MdWeb, MdStars } from 'react-icons/md';
import { IoPeopleCircle } from 'react-icons/io5';

import ICON_SERVICE from '../assets/img/icon-job-service.png';
import ICON_SPARE from '../assets/img/icon-spare.png';
import ICON_ADMIN from '../assets/img/icon-user-shield.png';

import { getMenyKey } from 'utils/menuKey';

import * as routing from './routing';

export const MenuConstant = {
    [getMenyKey('FAV')]: {
        key: 'FAV',
        link: undefined,
        icon: <MdStars fontSize={20} />,
        parentMenuId: 'FAV',
    },

    [getMenyKey('DASH')]: {
        key: 'DASH',
        link: routing.ROUTING_DASHBOARD,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('COMN-07.01')]: {
        key: 'COMN-07.01',
        link: routing.ROUTING_COMMON_GEO,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('COMN-06.01')]: {
        key: 'COMN-06.01',
        link: routing.ROUTING_COMMON_PRODUCT_HIERARCHY,
        icon: undefined,
        parentMenuId: 'FAV',
    },

    [getMenyKey('COMN-03.08')]: {
        key: 'HAM',
        link: routing.ROUTING_COMMON_HIERARCHY_ATTRIBUTE_MASTER,
        icon: undefined,
        parentMenuId: 'FAV',
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
        parentMenuId: 'FAV',
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
        icon: <HiCurrencyRupee fontSize={22} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('HR')]: {
        link: undefined,
        icon: <IoPeopleCircle fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('Sales')]: {
        link: undefined,
        icon: <AiFillCar fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('SERV')]: {
        link: undefined,
        icon: <img src={ICON_SERVICE} width='22px' />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('ADMN')]: {
        link: undefined,
        icon: <img src={ICON_ADMIN} width='22px' />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('SPR')]: {
        link: undefined,
        icon: <img src={ICON_SPARE} width='22px' />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('CRM')]: {
        link: undefined,
        icon: <MdWeb fontSize={18} />,
        parentMenuId: 'WEB',
    },
};
