import './globals.css';
import { initializeApp } from 'firebase/app';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'B-Fit',
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYmTweQCbAxhcBKMVHmNV8LKPckNOSnDc",
  authDomain: "b-fit-1c509.firebaseapp.com",
  projectId: "b-fit-1c509",
  storageBucket: "b-fit-1c509.appspot.com",
  messagingSenderId: "1028000754339",
  appId: "1:1028000754339:web:42385f6c7d152171c3ad16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
