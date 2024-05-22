import React, { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { XMarkIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import {
  HomeIcon, DocumentPlusIcon, DocumentDuplicateIcon, LifebuoyIcon, UsersIcon, Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Profile from './Profile';

const navigation = [
    { name: 'Tableau de bord', href: '/dashboard', icon: HomeIcon },
    { name: 'Synthèse', href: '/synthesis', icon: DocumentDuplicateIcon },
    { name: 'Surveys sent', href: '/surveys', icon: DocumentDuplicateIcon },
    { name: 'Nouvelle enquête', href: '/new-survey', icon: DocumentPlusIcon },
    { name: 'Employés', href: '/employees', icon: UsersIcon },
    { name: 'Réglages', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Aide', href: '/help', icon: LifebuoyIcon },
];

const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Sign Out', href: '#' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-700 lg:hidden">
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={() => setSidebarOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900 opacity-75" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration 300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                                        <button
                                            type="button"
                                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={() => setSidebarOpen(false)}
                                        >
                                            <span className="sr-only">Close sidebar</span>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                    <div className="flex-shrink-0 flex items-center px-4">
                                        <img className="h-8 w-auto" src="images/bsr-logo.png" alt="Your Company Logo" />
                                    </div>
                                    <nav className="mt-5 px-2 space-y-1">
                                        {navigation.map((item) => (
                                            <NavLink
    to={item.href}
    className={({ isActive }) => classNames(
        isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
    )}
>
    <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
    {item.name}
</NavLink>

                                        ))}
                                    </nav>
                                </div>
                                <div className="flex-shrink-0 flex bg-gray-50 p-4">
                                    <Profile />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <div className={`fixed inset-0 bg-white z-30 w-64 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
                <div className="px-4 py-6">
                    <div className="flex items-center justify-between">
                        <img src='images/bsr-logo.png' alt='BackstageRate Logo' className='h-8 w-auto' />
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                        {navigation.map((item) => (
                            <NavLink
    to={item.href}
    className={({ isActive }) => classNames(
        isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
    )}
>
    <item.icon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
    {item.name}
</NavLink>

                        ))}
                    </nav>
                </div>
                <div className="px-4 py-4">
                    <Menu as="div" className="relative">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <span className="hidden lg:flex lg:items-center">
                                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                    Tom Cook
                                </span>
                                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                    <Menu.Item key={item.name}>
                                        {({ active }) => (
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
