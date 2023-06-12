import { useState, useRef, useEffect } from 'react';

export default function ListExercises({ allExercises, bodyPart }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isActiveAll, setActiveAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const handleToggleAll = () => {
    setActiveAll(!isActiveAll);
    setSelectedId(null);
    setIsOpen(false);
  };

  function clearSearch() {
    setSearchTerm('');
    setIsOpen(false);
    setSelectedId(null);
    inputRef.current.value = '';
  }

  useEffect(() => {
    clearSearch();
  }, [bodyPart]);

  return (
    <>
      <div className='text-secondary-light text-right w-[350px] md:w-[675px] mx-auto mt-2 text-sm md:text-base hover:text-secondary-light-b select-none'>
        <button onClick={() => handleToggleAll() + clearSearch()}>
          {isActiveAll ? '- Collapse All' : '+ Expand All'}
        </button>
      </div>

      {/* <div className='max-h-[512px] w-[350px] md:w-[675px] mx-auto mt-6 overflow-auto bg-secondary-a scrollbar-track-white border-x scrollbar-thin scrollbar-thumb-main-light-b'>
        {bodyPartExercise.map(({ equipment, name, target, gifUrl, id }) => (
          <div key={id} >
            <div className={selectedId === id ? 'flex justify-center border-y bg-main-light-b hover:cursor-pointer py-3' : 'flex justify-center border-y bg-main-dark-b hover:bg-main-light-b hover:cursor-pointer py-3'} onClick={() => {
              if (id !== selectedId) {
                setSelectedId(id);
              } else {
                setSelectedId(null);
              }
            }}>
              <p className='text-white text-center capitalize text-sm md:text-base px-2 font-bold'> 
                {name}
              </p>
            </div>
            <div className={selectedId === id || isActiveAll ? 'flex-initial' : 'hidden'}>
              <div className='flex-row md:flex text-sm md:text-base justify-evenly px-6 py-6'>
                <div className='flex mb-2 md:mb-0'>
                  <p className='text-white text-left capitalize font-bold'>
                    Target Muscle:<span>&nbsp;</span>
                  </p>
                  <p className='text-white text-left capitalize'>{target}</p>
                </div>
                <div className='flex'>
                  <p className='text-white text-left capitalize font-bold'>
                    Equipment:<span>&nbsp;</span>
                  </p>
                  <p className='text-white text-left capitalize'>{equipment}</p>
                </div>
              </div>
              <div className='flex justify-center'>
                <img
                  className='mb-6 w-[250px] md:w-[500px] bg-white border-secondary-light border-4 rounded-lg'
                  src={gifUrl}
                  alt='Gif Example'
                />
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div>
        <input
          ref={inputRef}
          className='border-2 w-[60%] md:w-[350px] mx-auto flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none focus:border-secondary-light-b'
          type='search'
          placeholder='Search'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='max-h-[450px] w-[90%] md:w-[675px] mx-auto mt-6 bg-secondary-a  select-none scrollbar-track-white pr-1 scrollbar-thin scrollbar-thumb-main-light-b overflow-auto'>
        {allExercises
          .filter((exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((exercise) => exercise.bodyPart === bodyPart)
          .map(({ equipment, name, target, gifUrl, id, bodyPart }) => (
            <div
              key={id}
              className={
                isOpen && selectedId !== id ? 'hidden' : 'flex-initial'
              }
            >
              <div
                className={
                  selectedId === id
                    ? 'flex justify-center border-y bg-main-light-b hover:cursor-pointer py-3'
                    : 'flex justify-center border-y bg-main-dark-b hover:bg-main-light-b hover:cursor-pointer py-3'
                }
                onClick={() => {
                  if (id !== selectedId) {
                    setSelectedId(id);
                    setSearchTerm('');
                    inputRef.current.value = '';
                    setIsOpen(true);
                  } else {
                    setSelectedId(null);
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
                  selectedId === id || isActiveAll ? 'flex-initial' : 'hidden'
                }
              >
                <div className='flex-row md:flex text-sm md:text-base justify-evenly px-6 py-6'>
                  <div className='flex mb-2 md:mb-0'>
                    <p className='text-white text-left capitalize'>
                      Target Muscle:<span>&nbsp;</span>
                    </p>
                    <p className='text-white text-left capitalize'>{target}</p>
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
                {/* UPDATE TO API - GIF URLS CHENGED AND NEED TO BE FETCHED DIRECTLY FROM API */}
                {/* <div className='flex justify-center'>
                  <img
                    className='mb-6 w-[250px] md:w-[500px] bg-white border-secondary-light border-4 rounded-lg'
                    src={gifUrl}
                    alt='Gif Example'
                  />
                </div> */}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
