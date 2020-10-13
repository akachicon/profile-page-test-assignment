import Head from 'next/head';
import Profile from '@/components/profile';

export default function Index() {
  return (
    <>
      <Head>
        <title>Sunlight test assignment</title>
      </Head>
      <Profile />
    </>
  );
}
