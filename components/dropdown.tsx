'use client';

import { Fragment, SetStateAction, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ListExercises from './list-exercises';
import useFetchExercises from '../hooks/fetchExercises';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ dropdownTitle }: { dropdownTitle: string }) {
  const { bodyPartList, allBodyExercises, loading, getAllBodyExercises } =
    useFetchExercises();
  const [selectedName, setSelelectedName] = useState('back');
  const [bodyPartIndex, setBodyPartIndex] = useState(0);
  function onDropdownItemClick(
    bodyPart: SetStateAction<string>,
    index: SetStateAction<number>
  ) {
    setSelelectedName(bodyPart);
    setBodyPartIndex(index);
    return selectedName;
  }

  getAllBodyExercises();

  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-52 md:w-72 border justify-center bg-main-light px-1 py-1 text-sm md:text-base text-white hover:bg-main-dark-b mt-0 transition-colors rounded-md'>
            {dropdownTitle}{' '}
            <p className='text-white right-3 md:right-5 absolute'>&#x25BD;</p>
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
          <Menu.Items className='absolute capitalize border-secondary-light rounded-sm border-2 text-center z-10 mt-3 w-40 md:w-52 ml-6 md:ml-10 text-sm md:text-base origin-top-right bg-white'>
            <div>
              {bodyPartList &&
                bodyPartList.map((bodyPart: string, id: number) => (
                  <Menu.Item key={id}>
                    {({ active }) => (
                      <a
                        onClick={() => {
                          onDropdownItemClick(bodyPart, id);
                        }}
                        href='#'
                        className={classNames(
                          active
                            ? 'bg-main-light text-white transition-colors'
                            : 'text-bg-main-dark-b',
                          'block px-4 py-1 text-md'
                        )}
                      >
                        {bodyPart}
                      </a>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <div className='uppercase text-white text-sm md:text-base mt-5 select-none'>
        {selectedName}
      </div>
      {
        <div
          className={
            loading
              ? 'flex min-h-[50vh] items-center justify-center flex-col'
              : 'hidden'
          }
        >
          <div className={loading ? 'loading' : 'hidden'}></div>
        </div>
      }

      {allBodyExercises && !loading && (
        <ListExercises
          allExercises={allBodyExercises}
          bodyPart={selectedName}
        />
      )}
    </>
  );
}
