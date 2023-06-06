import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import ListExercises from './list-exercises';
import bodyPartList from '../../public/assets/files/bodyPartList.json'
import allExercises from '../../public/assets/files/allExercises.json'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({ dropdownTitle, dropdownItems }) {
  const [selectedName, setSelelectedName] = useState('back');
  const [bodyPartIndex, setBodyPartIndex] = useState(0);
  function onDropdownItemClick(bodyPart, index) {
    setSelelectedName(bodyPart);
    setBodyPartIndex(index)
    return selectedName;
  }

  const headersInfo = {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
  };

  // LOAD FROM API
  // useEffect(() => {
  //   let completeUrlAPI =
  //     'https://exercisedb.p.rapidapi.com/exercises/bodyPart/' +
  //     selectedName.replace(/\s/g, '%20');
  //   async function getBodyPartsExercises() {
  //     try {
  //       const res = await fetch(completeUrlAPI, {
  //         method: 'GET',
  //         headers: headersInfo,
  //       });
  //       const data = await res.json();
  //       setBodyPartExercise(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getBodyPartsExercises();
  // }, [selectedName]);

// LOAD LOCALLY (NOT WORKING)
  // useEffect(() => {
  //   let data = selectedName.toLowerCase().replace(/\s/g, '_')+'.json';
    
  //   function getBodyPartsExercises() {
  //     fetch(data
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       newData = JSON.parse(response)
  //       setBodyPartExercise(newData)
  //       console.log(bodyPartExercise)
  //     })
  //   }
  //   getBodyPartsExercises();
  // }, [selectedName]);

  return (
    <>
      <Menu as='div' className='relative inline-block text-left'>
        <div>
          <Menu.Button className='inline-flex w-52 md:w-72 border justify-center bg-main-light px-3 py-2 text-lg md:text-xl text-white hover:bg-main-dark-b mt-0 transition-colors rounded-md'>
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
              {/* {dropdownItems.map((bodyPart, index) => ( */}
              {bodyPartList.map((bodyPart, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      onClick={() => {
                        onDropdownItemClick(bodyPart, index);
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
      <div className='uppercase text-white font-bold  text-sm md:text-lg mt-8'>
        {selectedName}
      </div>
      <ListExercises allExercises={allExercises} bodyPart={selectedName} bodyPartIndex={bodyPartIndex} />
    </>
  );
}
