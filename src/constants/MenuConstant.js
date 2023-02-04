import { AiFillCar } from 'react-icons/ai';
import { BsFillStarFill } from 'react-icons/bs';
import { BiRupee } from 'react-icons/bi';
import { FaAddressBook, FaCreativeCommonsShare, FaWrench } from 'react-icons/fa';
import { GrGroup } from 'react-icons/gr';

import { getMenyKey } from 'utils/menuKey';

export const MenuConstant = {
    [getMenyKey('FAVS')]: {
        link: undefined,
        icon: <BsFillStarFill fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('COMN')]: {
        link: undefined,
        icon: <FaCreativeCommonsShare fontSize={20} />,
        parentMenuId: 'WEB',
    },
    [getMenyKey('COMN-10')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN',
    },
    [getMenyKey('COMN-10.01a')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },
    [getMenyKey('COMN-10.b')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },
    [getMenyKey('COMN-10.01')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },
    [getMenyKey('COMN-10.02')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },
    [getMenyKey('COMN-10.a')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-10',
    },
    [getMenyKey('COMN-10.03')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-10.a',
    },
    [getMenyKey('COMN-10.04')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-10.a',
    },
    [getMenyKey('COMN-11')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN',
    },
    [getMenyKey('COMN-11.04')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-11',
    },
    [getMenyKey('COMN-11.05')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-11',
    },
    [getMenyKey('COMN-11.02')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-11',
    },
    [getMenyKey('COMN-11.01')]: {
        link: undefined,
        icon: undefined,
        parentMenuId: 'COMN-11',
    },

    [getMenyKey('DBP')]: {
        link: undefined,
        icon: <FaAddressBook fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('FINA')]: {
        link: undefined,
        icon: <BiRupee fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('HRS')]: {
        link: undefined,
        icon: <GrGroup fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('SALS')]: {
        link: undefined,
        icon: <AiFillCar fontSize={20} />,
        parentMenuId: 'WEB',
    },

    [getMenyKey('SERS')]: {
        link: undefined,
        icon: <FaWrench fontSize={20} />,
        parentMenuId: 'WEB',
    },
};
