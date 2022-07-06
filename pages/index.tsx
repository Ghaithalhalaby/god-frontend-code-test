import type { NextPage } from 'next'
import { ProductFilterableSlider } from '../src/components/ProductFilterableSlider'

const Home: NextPage = () => {
  return (
    <main style={{ maxWidth: '1366px', margin: '0 auto' }}>
      <ProductFilterableSlider />
    </main>
  )
}

export default Home
