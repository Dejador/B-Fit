import { useState, useEffect } from 'react';
import ActionButton from './action-button';
import allExercises from '../../public/assets/files/allExercises.json'
import bodyPartList from '../../public/assets/files/bodyPartList.json'


const createButtonStyle = 'font-bold text-main-dark bg-secondary-light hover:bg-secondary-light-b hover:cursor-pointer transition-colors border border-white px-3 py-2'

export default function AddExercisesModal({open, onClose}) {
  const [allExercisesData, setAllExercisesData] = useState(allExercises)
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    console.log(allExercises)
  }, []);


  if(!open) return null
  return (
    <div className='fixed w-full h-full bg-opacity-80 bg-main-dark-b' onClick={() => onClose()}>
    <div onClick={(e) => {e.stopPropagation()}} className='max-w-[65%] w-full h-[85%] fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-main-dark'>
      <div className='max-w-[75%] m-auto mt-[3%] max-h-[82%] overflow-auto'>
      {bodyPartList.map((bodyPart, index) => (
          <div key={index} >
            <div className='flex justify-center border-y bg-alert hover:cursor-pointer py-3'>
              <p className='text-white text-center capitalize text-sm md:text-base px-2 font-bold'> 
                {bodyPart}
              </p>
            </div>
            {allExercises.filter(exercise => exercise.bodyPart = bodyPart).map(({ equipment, name, target, gifUrl, id, bodyPart }) => (
                <div key={id} >
                  <div className='flex justify-center border-y bg-main-light py-3'>
                    <p className='text-white text-center capitalize text-sm md:text-base px-2'> 
                      {name}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        ))}
        </div>
      {/* {allExercisesData.map(({ equipment, name, target, gifUrl, id, bodyPart }) => (
          <div key={id} >
            <div className='flex justify-center border-y bg-main-light hover:cursor-pointer py-3'>
              <p className='text-white text-center capitalize text-sm md:text-base px-2 font-bold'> 
                {bodyPart}
              </p>
            </div>
          </div>
        ))} */}

      <div className='flex fixed left-1/2 -translate-x-1/2 bottom-4'>
    <ActionButton
          className={createButtonStyle}
          action={() => onClose()}
          buttonTitle={'Done'}
        />
        </div>
    </div>
    <div>
    </div>
    </div>
  );
}
