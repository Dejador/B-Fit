'use client';

import LinkButton from '../components/link-button';
import { motion } from 'framer-motion';
import { mainPages } from '../common/data';

export default function Home() {
  return (
    <>
      <motion.div
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 1 }}
        className='bg-[url("/assets/images/background-main.jpg")] bg-cover flex justify-evenly fixed top-0 w-full flex-col md:flex-row pt-24 md:pt-0 h-screen items-center'
      >
        {mainPages.map((page, index) => (
          <motion.div
            animate={{ opacity: [0, 1], scale: [0, 1] }}
            transition={{ duration: 1, delay: 0.5 }}
            key={index}
          >
            <LinkButton
              className='btn-desktp-menu'
              descriptionStyle={
                'text-xs md:text-sm px-4 mt-2 md:mt-4 text-white'
              }
              route={page.route}
              buttonTitle={page.title}
              buttonDescription={page.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
