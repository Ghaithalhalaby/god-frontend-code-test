import { useState, useEffect } from 'react'
import { TabNav, TabNavItem } from 'vcc-ui'
import { ProductSlider } from './ProductSlider'
import { Car } from './CarCard'
import cars from '../../public/api/cars.json'

export const ProductFilterableSlider: React.FC = () => {
  const [carsList, setCarsList] = useState<Car[]>([])
  const [filtieredCarsList, setFiltieredCarsList] = useState<Car[]>([])
  const [setectedBodyType, setSetectedBodyType] = useState('all')
  const [bodyTypes, setBodyTypes] = useState<string[]>([])

  useEffect(() => {
    getCars()
  }, [])

  useEffect(() => {
    setBodyTypes(getBodyTypes(carsList))
    filterCars()
  }, [carsList])

  useEffect(() => {
    filterCars()
  }, [setectedBodyType])

  /**
   * Fetch and update the car list.
   */
  const getCars = async () => {
    setCarsList(cars)
  }

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
   * Filters and update the cars list by chosen category (body type).
   */
  const filterCars = () => {
    if (setectedBodyType === 'all') {
      setFiltieredCarsList(carsList)
      return
    }
    const filtieredList = carsList.filter(
      (car) => car.bodyType === setectedBodyType
    )
    setFiltieredCarsList(filtieredList)
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
      <ProductSlider carsList={filtieredCarsList} />
    </section>
  )
}
