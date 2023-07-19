import About from '@/components/main/About'
import Layout from '@/layouts/Main'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Layout>
        <About/>
      </Layout>
    </>
    
  )
}
