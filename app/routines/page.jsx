'use client';

import { useEffect, useState } from 'react';
import RoutineCard from '../components/routine-card';
import LinkButton from '../components/link-button';
import { buttonStyles } from '../styles/button-styles';
import useFetchRoutines from '../hooks/fetchRoutines';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useRouter } from 'next/navigation';
import WarningModal from '../components/warning-modal';

export default function Routines() {
  const { routines, loading, error } = useFetchRoutines();
  const { currentUser } = useAuth();
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [deleteRoutineId, setDeleteRoutineId] = useState(null);
  const router = useRouter();

  function handleDelete(routineId) {
    setOpenWarningModal(true);
    setDeleteRoutineId(routineId);
  }

  async function handleDeleteConfirmation() {
    const userRef = doc(db, 'users', currentUser.uid);
    const key = deleteRoutineId;
    try {
      await setDoc(
        userRef,
        {
          routines: {
            [key]: deleteField(),
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
    setOpenWarningModal(false);
    router.push('/routines/');
  }

  return (
    <>
      <WarningModal
        open={openWarningModal}
        onCancel={() => setOpenWarningModal(false)}
        cancelText={'Cancel'}
        confirmText={'Yes, Delete'}
        onConfirm={() => handleDeleteConfirmation()}
        warningMessage={'The selected routine will be deleted, continue?'}
      />
      <div className='mt-8 md:mt-32 justify-center text-center align-middle flex'>
        <LinkButton
          className={buttonStyles.create}
          route={'/routines/new'}
          buttonTitle={'+ Create New Routine'}
        />
      </div>
      <div className='flex justify-center gap-8 flex-wrap max-h-[550px] overflow-auto mt-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b'>
        {routines &&
          !loading &&
          currentUser &&
          Object.keys(routines).map((routine) => (
            <div key={routines[routine].routineId}>
              <RoutineCard
                routineTitle={routines[routine].routineName}
                routineExercises={routines[routine].routineExercises}
                routineId={routines[routine].routineId}
                routineCreationDate={routines[routine].routineCreationDate}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </div>
    </>
  );
}
