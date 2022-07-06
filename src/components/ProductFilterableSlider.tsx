import { useState, useEffect } from 'react'
import { TabNav, TabNavItem } from 'vcc-ui'
import { ProductSlider } from './ProductSlider'
import { Car } from './CarCard'
import cars from '../../public/api/cars.json'

export const ProductFilterableSlider: React.FC = () => {
  const [carsList, setCarsList] = useState<Car[]>([])
  const [setectedBodyType, setSetectedBodyType] = useState('all')
  const [bodyTypes, setBodyTypes] = useState<string[]>([])

  useEffect(() => {
    getCars()
  }, [])

  useEffect(() => {
    setBodyTypes(getBodyTypes(carsList))
  }, [carsList])

  /**
   * Extract available car body types from a given car list.
   * @param carsList A list of cars.
   * @returns Array of available car body types.
   */
  const getBodyTypes = (carsList: Car[]) => {
    const bodyTypes: string[] = []
    carsList?.forEach((car: Car) => {
      if (!bodyTypes.includes(car.bodyType)) {
        bodyTypes.push(car.bodyType)
      }
    })
    return bodyTypes
  }

  /**
   * Fetch and update the car list.
   */
  const getCars = async () => {
    setCarsList(cars)
  }

  return (
    <section>
      <TabNav enableLineTransition aria-label="Filter car list">
        <TabNavItem
          isActive={setectedBodyType === 'all'}
          onClick={() => {
            setSetectedBodyType('all')
          }}
          key="all"
        >
          all
        </TabNavItem>
        {bodyTypes?.map((bodyType) => (
          <TabNavItem
            isActive={setectedBodyType === bodyType}
            onClick={() => {
              setSetectedBodyType(bodyType)
            }}
            key={bodyType}
          >
            {bodyType}
          </TabNavItem>
        ))}
      </TabNav>
      <ProductSlider carsList={carsList} />
    </section>
  )
}
