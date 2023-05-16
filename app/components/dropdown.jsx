import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({dropdownTitle, dropdownItems}) {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex w-72 border justify-center bg-main-light px-3 py-2 text-2xl text-white hover:bg-main-dark-b mt-5 transition-colors'>
          {dropdownTitle} <p className='text-white w-full absolute -mr-56'>&#x25BD;</p>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 z-10 mt-3 w-72 origin-top-right bg-white'>
          <div>
            <Menu.Item>
              {({ active }) => (
                <a
                  href='#'
                  className={classNames(
                    active ? 'bg-main-light text-white transition-colors' : 'text-bg-main-dark-b',
                    'block px-4 py-2 text-md'
                  )}
                >
                  {dropdownItems[2].name}
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
