'use client';

import ActionButton from './action-button';
import { buttonStyles } from '../styles/button-styles';
import allExercises from '../../public/assets/files/allExercises.json';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

function handleEdit() {
  alert("Sorry, can't do that yet!");
}

export default function RoutineCard({
  routineTitle,
  routineExercises,
  routineId,
  routineCreationDate,
  handleDelete
}) {
  const { currentUser } = useAuth();
  const router = useRouter();

  // async function handleDelete(routineId) {
  //   const userRef = doc(db, 'users', currentUser.uid);
  //   const key = routineId;
  //   try {
  //     await setDoc(
  //       userRef,
  //       {
  //         routines: {
  //           [key]: deleteField(),
  //         },
  //       },
  //       { merge: true }
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   console.log('here')
  //   router.refresh()
  // }

  return (
    <>
      <div className='mt-8 justify-center text-center align-middle flex'>
        <div className='text-white text-center  select-none'>
          <div className='flex w-full'>
            <div className='w-[400px] bg-main-light-b border-t border-r border-l py-1 uppercase'>
              {routineTitle}
            </div>
          </div>
          <div className='w-[400px] flex justify-end pr-4 bg-secondary-a border py-1'>
            {/* <ActionButton
              className={buttonStyles.edit}
              action={() => handleEdit(routineId)}
              buttonTitle={'✎ Edit'}
            />
            <span className='border-r'></span> */}
            <ActionButton
              className={buttonStyles.delete}
              action={() => handleDelete(routineId)}
              buttonTitle={'X Delete'}
            />
          </div>
          <div className='h-[154px] overflow-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b pr-[2px]'>
            {routineExercises.map((index) =>
              allExercises
                .filter((exercise) => exercise.id === index)
                .map(({ name, id }) => (
                  <div className='flex bg-main-dark-b' key={id}>
                    <div className='w-[400px] border-white border-b border-r border-l  py-1 px-2 capitalize'>
                      {name}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
