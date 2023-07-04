'use client';

import Dropdown from '../../components/dropdown';
import { motion } from 'framer-motion';

export default function ExerciseCategory() {
  return (
    <>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 2 }}
        className='text-center mt-8 md:mt-32 fixed mx-auto w-full'
      >
        <Dropdown dropdownTitle={'Muscle Group'} />
      </motion.div>
    </>
  );
}
