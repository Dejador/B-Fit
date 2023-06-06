'use client';

import LinkButton from './components/link-button';
import { mainPages } from './common/data';
export default function Home() {

  const buttonStyle =
    'border text-lg md:text-2xl bg-main-light hover:bg-main-dark-b text-white py-9 md:py-12 opacity-90 transition-colors rounded-lg block text-center w-52 md:w-60';

  return (
    <>
      <div className='bg-[url("/assets/images/background-main.jpg")] bg-cover flex justify-evenly fixed top-0 w-full flex-col md:flex-row pt-8 md:pt-0 h-screen items-center'>
        {mainPages.map((page, index) => (
          <div key={index}>
            <LinkButton
              className={buttonStyle}
              route={page.route}
              buttonTitle={page.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}
