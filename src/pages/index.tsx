import About from '@/components/main/About'
import MainLayout from '@/layouts/Main'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <MainLayout>
        <About/>
      </MainLayout>
    </>
    
  )
}
