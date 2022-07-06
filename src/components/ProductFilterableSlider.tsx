import { useState, useEffect } from 'react'
import { useFetch } from '../custom-hooks/useFetch'
import { TabNav, TabNavItem, Spinner, Text, View } from 'vcc-ui'
import { ProductSlider } from './ProductSlider'
import { Car } from './CarCard'
import cars from '../../public/api/cars.json'

export const ProductFilterableSlider: React.FC = () => {
  const [carsList, setCarsList] = useState<Car[]>([])
  const [filtieredCarsList, setFiltieredCarsList] = useState<Car[]>([])
  const [setectedBodyType, setSetectedBodyType] = useState('all')
  const [bodyTypes, setBodyTypes] = useState<string[]>([])

  // Use custom fetch hook to get cars list.
  const { isLoading, fetchError, fetchErrorMsg, data } = useFetch('/api/cars')

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

  // When the data is fetching, show a loading indicator.
  if (isLoading) {
    return (
      <View
        width="100%"
        minHeight={400}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size={40} />
      </View>
    )
  }

  // Inform the user if the is an error.
  if (fetchError) {
    return (
      <View width="100%" justifyContent="center" alignItems="center">
        <Text>{fetchErrorMsg}</Text>
      </View>
    )
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
