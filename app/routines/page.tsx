import RoutineCard from '../components/routine-card';
import LinkButton from '../components/link-button';
import { buttonStyles } from '../styles/button-styles';

export default function Routines() {
  return (
    <>
      <div className='mt-32 justify-center text-center align-middle flex'>
        <LinkButton
          className={buttonStyles.create}
          route={'/routines/new'}
          buttonTitle={'+ Create New Routine'}
        />
      </div>
      <div className='flex justify-center gap-8 flex-wrap max-h-[550px] overflow-auto mt-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b'>
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      <RoutineCard />
      </div>
    </>
  );
}
