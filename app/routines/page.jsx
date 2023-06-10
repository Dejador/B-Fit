'use client';

import RoutineCard from '../components/routine-card';
import LinkButton from '../components/link-button';
import { buttonStyles } from '../styles/button-styles';
import useFetchRoutines from '../hooks/fetchRoutines';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Routines() {
  const { routines, loading, error } = useFetchRoutines();
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [routines, loading]);

  return (
    <>
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
              />
            </div>
          ))}
      </div>
    </>
  );
}
