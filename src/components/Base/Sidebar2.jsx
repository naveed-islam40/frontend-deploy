import React, { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../authContext';
import { useCompany } from '../../services/CompanyContext';
import { useUser } from '../../services/UserContext';

import AddSurvey from '../NewSurveys/AddSurvey';
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  PresentationChartBarIcon,
  DocumentCheckIcon,
  Square3Stack3DIcon,
  ComputerDesktopIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'Synthèse', href: '/synthesis', icon: PresentationChartBarIcon, current: false },
  { name: 'Mes enquêtes', href: '/surveys', icon: DocumentCheckIcon, current: false },
  { name: 'Toutes les enquêtes', href: '/new-survey', icon: Square3Stack3DIcon, current: false },
];
const teams = [
  { id: 1, name: 'Employés', href: '/employees', icon: UsersIcon, current: false },
  { id: 2, name: 'Réglages', href: '/settings', icon: Cog6ToothIcon, current: false },
];
const userNavigation = [
  { name: 'Mon compte', href: '/my-account' },
  { name: 'Déconnexion', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Sidebar2({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const { companyName, companyLogo } = useCompany();
  const { user } = useUser();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex w-full flex-col h-16 items-center">
                      <div>
                        <img
                          className="h-14 w-14 w-auto"
                          src={companyLogo || '/images/default-company.png'}
                          alt={companyName}
                        />
                      </div>
                      <div className="ml-3 text-lg font-medium text-gray-900">{companyName}</div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <NavLink
                                  to={item.href}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive ? 'bg-gray-50 text-indigo-600' : 'text-black hover:text-indigo-600 hover:bg-gray-50',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )
                                  }
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current ? 'text-bsrate' : 'text-bsrate group-hover:text-bsrate',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <NavLink
                                  to={team.href}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                    )
                                  }
                                >
                                  <span
                                    className={classNames(
                                      team.current ? 'text-indigo-600 border-indigo-600' : 'text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <NavLink
                            to="/settings"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600" aria-hidden="true" />
                            Settings
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden w-1/6 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col">
          <div className="flex  flex-col  border-bsrate border-r h-full  bg-bsrate2 pb-4 ">
            <div className="flex flex-col px-4 mb-4 items-center">
              <img
                className="h-24 w-24 object-cover  rounded-full mt-4 mb-3 border border-1 border-bsrate"
                src={companyLogo || '/images/default-company.png'}
                alt={companyName}
              />
              <div className=" text-md text-center font-bold text-bsrate uppercase">{companyName}</div>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-col gap-y-4">
                <li>
                  <ul role="list" className="-mx-2 space-y-2 px-4 items-center font-semibold mt-6 mx-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive ? 'bg-bsrate text-white' : 'text-black hover:bg-bsrate hover:text-white ',
                              'group flex gap-x-3 rounded-md p-1 pl-2 text-sm leading-6 font-semibold'
                            )
                          }
                        >
                          <div className='flex w-5 h-5 items-center mt-0.5  '>
                            <item.icon
                              className={({ isActive }) =>
                                classNames(
                                  isActive ? 'text-bsrate' : 'text-bsrate ',
                                  'h-5 w-5 shrink-0 mt-1 text-bsrate'
                                )
                              }
                              aria-hidden="true"
                            />
                          </div>
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-bsrate px-4 mx-2">Votre entreprise</div>
                  <ul role="list" className="-mx-2 mt-1 space-y-1 px-4 mx-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <NavLink
                          to={team.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive ? 'bg-bsrate text-white' : 'text-black hover:bg-bsrate hover:text-white',
                              'group flex gap-x-3 rounded-md p-1 pl-2 text-sm leading-6 font-medium'
                            )
                          }
                        >
                          <div className='flex w-5 h-5 items-center mt-0.5 '>
                            <team.icon
                              className={({ isActive }) =>
                                classNames(
                                  isActive ? 'text-slate-900' : 'text-gray-400 group-hover:text-slate-900',
                                  'h-5 w-5 shrink-0 mt-1'
                                )
                              }
                            />
                          </div>
                          <span className="truncate">{team.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                  <div className='relative -mt-11 '>
                    <AddSurvey />
                  </div>
                </li>
              </ul>
              <ul className='px-7 mt-5 '>
                <li className="">
                  <a
                    href="/help"
                    className="group -mx-2 mb-1  flex gap-x-3 rounded-md p-1 text-sm font-semibold leading-6 text-gray-700 hover:bg-bsrate hover:text-white pl-2"
                  >
                    <ComputerDesktopIcon className="h-5 w-5 mt-0.5 shrink-0 text-black group-hover:text-white " aria-hidden="true" />
                    Retour au site
                  </a>
                </li>
                <li className="mt-auto">
                  <a
                    href="/help"
                    className="group -mx-2 mb-1  flex gap-x-3 rounded-md p-1 text-sm font-semibold leading-6 text-gray-700 hover:bg-bsrate hover:text-white pl-2"
                  >
                    <InformationCircleIcon className="h-5 w-5 mt-0.5 shrink-0 text-black group-hover:text-white" aria-hidden="true" />
                    Besoin d'aide ?
                  </a>
                </li>
              </ul>
            </nav>
            <div className='flex w-full justify-center'>
              <img src='images/bsr-logo.png' alt='BSRate Logo' className='w-44 mt-4 mb-0  -ml-2' />
              </div>
          </div>
        </div>

        <div className="w-full lg:w-5/6 float-end justify-between">
          <div className=" justify-between top-0 z-40 flex bg-bsrate2 shrink-0 items-center gap-x-4 -mb-10 px-4 sm:gap-x-6 sm:px-6 lg:px-4">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className='ml-2  font-medium text-sm text-slate-600'></div>
            <div className="w-px bg-gray-200 lg:hidden" aria-hidden="true" />
            <div className="flex gap-x-4 justify-between self-stretch lg:gap-x-6">
              <div className="flex mx-0 items-center right-0 gap-x-4 lg:gap-x-6">
                <Menu as="div" className="relative">
                  <Menu.Button className=" flex right-3 items-center p-1.5 pt-4">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-6 w-6 rounded-full bg-gray-50 object-cover"
                      src={user.image || '/images/default-pp.png'}
                      alt="profile"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <h1 className='ml-3 font-medium text-sm text-slate-900 hover:text-indigo-600 transition hover:transition'>{`${user.firstName} ${user.lastName}`}</h1>
                      <ChevronDownIcon className="ml-1 h-5 w-5 text-slate-300" aria-hidden="true" />
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
                    <Menu.Items className="absolute right-0 z-10  w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            item.name === 'Déconnexion' ? (
                              <button
                                onClick={handleSignOut}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                              >
                                {item.name}
                              </button>
                            ) : (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-50' : '',
                                  'block px-3 py-1 text-sm leading-6 text-gray-900'
                                )}
                              >
                                {item.name}
                              </a>
                            )
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-1 px-3 bg-bsrate2 min-h-screen">
            <div className="px-0 sm:px-6 lg:px-4">
              <div className='flex-1 '>{children}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Sidebar2;
