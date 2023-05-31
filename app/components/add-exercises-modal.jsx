import { useEffect, useState } from 'react';
import ActionButton from './action-button';
import allExercises from '../../public/assets/files/allExercises.json';
import bodyPartList from '../../public/assets/files/bodyPartList.json';

const createButtonStyle =
  'text-white bg-secondary-light hover:bg-secondary-light-b hover:cursor-pointer transition-colors px-2 py-1 w-[55px] text-sm';
const addButtonStyle =
  'text-white bg-secondary-light hover:bg-secondary-light-b hover:cursor-pointer transition-colors px-2 py-1 w-[30px] text-sm';
const removeButtonStyle =
  'text-white bg-alert hover:bg-alert-b hover:cursor-pointer transition-colors px-2 py-1 w-[30px] text-sm';

export default function AddExercisesModal({
  open,
  onClose,
  selectedExerciseIds,
  onAddExercise,
  onRemoveExercise,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  if (!open) return null;
  return (
    <div
      className='fixed w-full h-full bg-opacity-80 bg-main-dark-b z-10'
      onClick={() => onClose()}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='max-w-[65%] w-full h-[75%] fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-main-dark'
      >
        <div className='max-w-[75%] m-auto mt-[3%] max-h-[82%] scrollbar-track-white pr-1 scrollbar-thin scrollbar-thumb-main-light-b overflow-auto'>
          {bodyPartList.map((bodyPart, index) => (
            <div key={index}>
              <div
                className={
                  selectedId === index
                    ? 'flex justify-center border-y bg-main-light-b hover:cursor-pointer py-3'
                    : 'flex justify-center border-y bg-main-dark-b hover:bg-main-light-b hover:cursor-pointer py-3'
                }
                onClick={() => {
                  if (index !== selectedId) {
                    setSelectedId(index);
                  } else {
                    setSelectedId(null);
                  }
                }}
              >
                <p className='text-white text-center capitalize text-sm md:text-base px-2 font-bold'>
                  {bodyPart}
                </p>
              </div>
              <div>
                <input
                  className={
                    selectedId === index
                      ? 'w-[25%] mx-auto flex my-2 px-2 py-1 text-sm text-main-light text-center'
                      : 'hidden'
                  }
                  type='text'
                  placeholder='Search'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='max-h-[450px] scrollbar-track-white pr-1 scrollbar-thin scrollbar-thumb-main-light-b overflow-auto'>
                {allExercises
                  .filter((exercise) =>
                    exercise.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .filter((exercise) => exercise.bodyPart === bodyPart)
                  .map(({ equipment, name, target, gifUrl, id, bodyPart }) => (
                    <div key={id}>
                      <div
                        className={
                          selectedId === index ? 'flex-initial' : 'hidden'
                        }
                      >
                        <div className='relative flex items-center border-y bg-main-light py-3 h-14 hover:bg-opacity-50'>
                          <p className='absolute w-full text-white text-center capitalize text-sm md:text-base px-14'>
                            {name}
                          </p>
                          <div
                            className={
                              selectedExerciseIds.includes(id)
                                ? 'hidden'
                                : 'text-end mr-2 absolute right-0'
                            }
                          >
                            <ActionButton
                              className={addButtonStyle}
                              action={() => onAddExercise(id)}
                              buttonTitle={'+'}
                            />
                          </div>
                          <div
                            className={
                              !selectedExerciseIds.includes(id)
                                ? 'hidden'
                                : 'text-end mr-2 absolute right-0'
                            }
                          >
                            <ActionButton
                              className={removeButtonStyle}
                              action={() => onRemoveExercise(id)}
                              buttonTitle={'-'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className='flex fixed left-1/2 -translate-x-1/2 bottom-4'>
          <ActionButton
            className={createButtonStyle}
            action={() => onClose()}
            buttonTitle={'Done'}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
