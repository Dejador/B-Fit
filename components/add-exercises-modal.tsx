import { useRef, useState } from 'react';
import ActionButton from './action-button';
import useFetchExercises from '../hooks/fetchExercises';

export default function AddExercisesModal({
  open,
  onClose,
  selectedExerciseIds,
  onAddExercise,
  onRemoveExercise,
}: {
  open: boolean;
  onClose: () => void;
  selectedExerciseIds: {id: number, name: string}[];
  onAddExercise: (id: number, name: string) => void;
  onRemoveExercise: (id: number, name: string) => void;
}) {
  const [selectedId, setSelectedId] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { bodyPartList, allBodyExercises, getAllBodyExercises } =
    useFetchExercises();
  const inputRef = useRef<HTMLInputElement>(null);

  getAllBodyExercises();

  function clearSearch() {
    setSearchTerm('');
    setIsOpen(false);
    setSelectedId(-1);
  }

  function closeModal() {
    onClose();
    clearSearch();
  }

  if (!open) return null;
  return (
    <div
      className='fixed w-full h-full bg-opacity-80 bg-main-dark-b z-10'
      onClick={() => closeModal()}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='max-w-[98%] md:max-w-[65%] w-full h-[77%] fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white bg-main-dark'
      >
        <div
          className={
            isOpen
              ? 'flex w-full h-[80%] max-w-[95%] md:max-w-[75%] m-auto mt-[3%] max-h-[82%] select-none scrollbar-track-white pr-1 scrollbar-thin scrollbar-thumb-main-light-b overflow-hidden'
              : 'max-w-[95%] md:max-w-[75%] m-auto mt-[3%] max-h-[82%] select-none scrollbar-track-white pr-1 scrollbar-thin scrollbar-thumb-main-light-b overflow-auto'
          }
        >
          {bodyPartList.map((bodyPart, index) => (
            <div
              key={index}
              className={
                isOpen && selectedId !== index
                  ? 'hidden'
                  : 'flex-initial w-full'
              }
            >
              <div
                className={
                  selectedId === index
                    ? 'flex justify-center border-y bg-main-light-b hover:cursor-pointer py-3'
                    : 'flex justify-center border-y bg-main-dark-b hover:bg-main-light-b hover:cursor-pointer py-3'
                }
                onClick={() => {
                  if (index !== selectedId) {
                    setSelectedId(index);
                    setSearchTerm('');
                    if (inputRef.current !== null) {
                      inputRef.current.value = '';
                    }
                    setIsOpen(true);
                  } else {
                    clearSearch();
                  }
                }}
              >
                <p className='text-white text-center capitalize text-sm md:text-base px-2'>
                  {bodyPart}
                </p>
              </div>
              <div>
                <input
                  ref={inputRef}
                  className={
                    selectedId === index
                      ? 'border-2 w-[80%] md:w-[25%] mx-auto flex my-2 px-2 py-1 text-sm text-main-light placeholder:text-center outline-none focus:border-secondary-light-b'
                      : 'hidden'
                  }
                  type='search'
                  placeholder='Search'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='max-h-[80%] scrollbar-track-white pr-1 scrollbar-thin scrollbar-thumb-main-light-b overflow-auto'>
                {allBodyExercises
                  .filter((exercise: { name: string }) =>
                    exercise.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .filter(
                    (exercise: { bodyPart: string }) =>
                      exercise.bodyPart === bodyPart
                  )
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
                              selectedExerciseIds
                                .map(({ id }) => {
                                  return id;
                                })
                                .includes(id)
                                ? 'hidden'
                                : 'text-end mr-2 absolute right-0'
                            }
                          >
                            <ActionButton
                              className={'btn-create w-[30px]'}
                              action={() => onAddExercise(id, name)}
                              buttonTitle={'+'}
                            />
                          </div>
                          <div
                            className={
                              !selectedExerciseIds
                                .map(({ id }) => {
                                  return id;
                                })
                                .includes(id)
                                ? 'hidden'
                                : 'text-end mr-2 absolute right-0'
                            }
                          >
                            <ActionButton
                              className={'btn-remove w-[30px]'}
                              action={() => onRemoveExercise(id, name)}
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
            className='btn-create'
            action={() => {
              !isOpen ? closeModal() : clearSearch();
            }}
            buttonTitle={isOpen ? 'Back' : 'Done'}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
