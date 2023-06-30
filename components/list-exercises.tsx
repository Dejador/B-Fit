'use client';

import { useState, useRef, useEffect } from 'react';

export default function ListExercises({
  allExercises,
  bodyPart,
}: {
  allExercises: [];
  bodyPart: string;
}) {
  const [selectedId, setSelectedId] = useState(0);
  const [isActiveAll, setActiveAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleAll = () => {
    setActiveAll(!isActiveAll);
    setSelectedId(0);
    setIsOpen(false);
  };

  function clearSearch() {
    setSearchTerm('');
    setIsOpen(false);
    setSelectedId(0);
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  }

  function executeToggleAndClear() {
    handleToggleAll();
    clearSearch();
  }

  useEffect(() => {
    clearSearch();
  }, [bodyPart]);

  return (
    <>
      <div className='text-secondary-light text-right w-[90%] md:w-[675px] mx-auto mt-2 text-sm md:text-base hover:text-secondary-light-b select-none'>
        <button onClick={() => executeToggleAndClear()}>
          {isActiveAll ? '- Collapse All' : '+ Expand All'}
        </button>
      </div>

      <div>
        <input
          ref={inputRef}
          className='border-2 w-[60%] md:w-[350px] mx-auto flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none focus:border-secondary-light-b'
          type='search'
          placeholder='Search'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='max-h-[450px] w-[90%] md:w-[675px] mx-auto mt-6 bg-secondary-a select-none pr-1 overflow-auto'>
        {allExercises &&
          allExercises
            .filter((exercise: { name: string }) =>
              exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .filter(
              (exercise: { bodyPart: string }) => exercise.bodyPart === bodyPart
            )
            .map(
              ({
                equipment,
                name,
                target,
                gifUrl,
                id,
              }: {
                equipment: string;
                name: string;
                target: string;
                gifUrl: string;
                id: number;
              }) => (
                <div
                  key={id}
                  className={
                    isOpen && selectedId !== id ? 'hidden' : 'flex-initial'
                  }
                >
                  <div
                    className={
                      selectedId === id
                        ? 'flex justify-center border-y bg-main-light-b hover:cursor-pointer py-2'
                        : 'flex justify-center border-y bg-main-dark-b hover:bg-main-light-b hover:cursor-pointer py-2'
                    }
                    onClick={() => {
                      if (id !== selectedId) {
                        setSelectedId(id);
                        setSearchTerm('');
                        if (inputRef.current != null) {
                          inputRef.current.value = '';
                        }
                        setIsOpen(true);
                      } else {
                        setSelectedId(0);
                        setIsOpen(false);
                      }
                    }}
                  >
                    <p className='text-white text-center capitalize text-sm md:text-base px-2'>
                      {name}
                    </p>
                  </div>
                  <div
                    className={
                      selectedId === id || isActiveAll
                        ? 'flex-initial'
                        : 'hidden'
                    }
                  >
                    <div className='flex-row md:flex text-sm md:text-base justify-evenly px-6 py-6'>
                      <div className='flex mb-2 md:mb-0'>
                        <p className='text-white text-left capitalize'>
                          Target Muscle:<span>&nbsp;</span>
                        </p>
                        <p className='text-white text-left capitalize'>
                          {target}
                        </p>
                      </div>
                      <div className='flex'>
                        <p className='text-white text-left capitalize'>
                          Equipment:<span>&nbsp;</span>
                        </p>
                        <p className='text-white text-left capitalize'>
                          {equipment}
                        </p>
                      </div>
                    </div>
                    <div className='flex justify-center'>
                      <img
                        className='mb-6 w-[250px] md:w-[500px] bg-white border-secondary-light border-4 rounded-lg'
                        src={gifUrl}
                        alt={name.toUpperCase() + ' GIF'}
                      />
                    </div>
                  </div>
                </div>
              )
            )}
      </div>
    </>
  );
}
