import Routine from '../components/routine';
import LinkButton from '../components/link-button';

const createNewButtonStyle =
  'border border-white text-sm bg-secondary-light hover:bg-secondary-light-b text-main-dark font-bold px-6 py-2 transition-colors';

export default function Routines() {
  return (
    <>
      <div className='mt-32 justify-center text-center align-middle flex'>
        <LinkButton
          className={createNewButtonStyle}
          route={'/routines/new'}
          buttonTitle={'+ Create New Routine'}
        />
      </div>
      <div className='flex justify-center gap-8 flex-wrap max-h-[550px] overflow-auto mt-4 scrollbar-thin scrollbar-track-white scrollbar-thumb-main-light-b'>
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      <Routine />
      </div>
    </>
  );
}
