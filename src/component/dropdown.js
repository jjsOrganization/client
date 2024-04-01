import React from 'react';
import {useEffect} from 'react';
import styled from 'styled-components';
import { Fragment, useState} from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

let copyType;

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Dropdown(props) {

const [isExpanded, setIsExpanded] = useState(false);
    
const articleBtnExpandHandler = () => {
    setIsExpanded(!isExpanded);
};

const articleTypeHandler = (type) => {
    copyType = type;
    props.setArticleType(copyType);
};
return(
<Menu as="div" className="relative inline-block text-left">
    <div style = {{width : '130px'}}>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {props.text} : {props.articleType}
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
    </div>

    <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
    >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
        <Menu.Item>
            {({ active }) => (
                <a href="#" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700','block px-4 py-2 text-sm')}>
                {props.articleTypeList.map((type, idx) => (
                <div key={type} onClick={() => { articleTypeHandler(type); if(props.category){props.cate(type)}}}>
                    {type}
                    {idx !== props.articleTypeList.length - 1 && <hr />}
                </div>
            ))}
                </a>
            )}
            </Menu.Item>
            
        </div>
        </Menu.Items>
    </Transition>
    </Menu>
)
}




export default Dropdown;