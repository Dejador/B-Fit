import { useState } from 'react';

export default function ListExercises({ bodyPartExercise }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isActiveAll, setActiveAll] = useState(false);
  
  const handleToggleAll = () => {
      setActiveAll(!isActiveAll);
      setSelectedId(null);
    };

  return (
    <>
      <div className='text-secondary-light font-bold text-right w-[350px] md:w-[675px] mx-auto mt-2 text-sm md:text-base hover:text-secondary-light-b'>
        <button onClick={handleToggleAll}>
          {isActiveAll ? '- Collapse All' : '+ Expand All'}
        </button>
      </div>
      <div className='max-h-[512px] w-[350px] md:w-[675px] mx-auto mt-6 overflow-auto bg-secondary-a scrollbar-track-white border-x scrollbar-thin scrollbar-thumb-main-light-b'>
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
      </div>
    </>
  );
}
