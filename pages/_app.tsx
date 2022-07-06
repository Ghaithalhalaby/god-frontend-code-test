import React from 'react'
import { StyleProvider, ThemePicker } from 'vcc-ui'
import { ProductFilterableSlider } from '../src/components/ProductFilterableSlider'
import '../public/css/styles.css'

function HomePage() {
  return (
    <StyleProvider>
      <ThemePicker variant="light">
        <ProductFilterableSlider />
      </ThemePicker>
    </StyleProvider>
  )
}

export default HomePage
