import { useState } from 'react';

export default function ListExercises({ bodyPartExercise }) {
  const [isActiveAll, setActiveAll] = useState(false);

  // const handleToggleAll = () => {
  //   setActiveAll(!isActiveAll);
  // };

  return (
    <>
      <div className='text-secondary-light font-bold text-right w-[800px] mx-auto mt-2 hover:text-secondary-light-b'>
        {/* <button onClick={handleToggleAll}>
          {isActiveAll ? '- Collapse All' : '+ Expand All'}
        </button> */}
      </div>
      <div className='max-h-[512px] w-[800px] mx-auto mt-6 overflow-auto bg-secondary-a'>
        {bodyPartExercise.map(({ equipment, name, target, gifUrl, index }) => (
          <div key={index}>
            <div className='flex justify-center border bg-main-dark-b hover:bg-main-light hover:cursor-pointer py-3'>
              <p className='text-white text-left capitalize font-bold'>
                {name}
              </p>
            </div>
            <div className={isActiveAll ? 'flex-initial' : 'hidden'}>
              <div className='flex justify-evenly px-6 py-6'>
                <div className='flex'>
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
                  className='mb-6 border-secondary-light border-4 rounded-lg'
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
