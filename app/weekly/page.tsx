'use client';

import { motion } from 'framer-motion';

export default function WeeklyPlan() {
  return (
    <>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className='flex min-h-[80vh] items-center justify-center flex-col'
      >
        <h1 className='text-white text-xl'>Weekly Plan</h1>
        <p className='text-white'>Coming Soon!</p>
      </motion.div>
    </>
  );
}
