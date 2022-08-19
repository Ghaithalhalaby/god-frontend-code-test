import { useState, useEffect } from 'react'
import { TabNav, TabNavItem, Spinner, Text, View } from 'vcc-ui'
import { Car } from '../utils/types'
import useFetch from '../custom-hooks/useFetch'
import ProductSlider from './ProductSlider'

const ProductFilterableSlider: React.FC = () => {
  // State declaration.
  const [carsList, setCarsList] = useState<Car[]>([])
  const [filtieredCarsList, setFiltieredCarsList] = useState<Car[]>([])
  const [setectedBodyType, setSetectedBodyType] = useState('all')
  const [bodyTypes, setBodyTypes] = useState<string[]>([])

  // Use custom fetch hook to get cars list.
  const { isLoading, fetchError, fetchErrorMsg, data } = useFetch('/api/cars')

  useEffect(() => {
    if (fetchError) return
    setCarsList(data)
  }, [data])

  useEffect(() => {
    setBodyTypes(getBodyTypes(carsList))
    filterCars()
  }, [carsList])

  useEffect(() => {
    filterCars()
  }, [setectedBodyType])

  /**
   * Extract available car body types from a given car list.
   * @param carsList A list of cars.
   * @returns Array of available car body types.
   */
  const getBodyTypes = (carsList: Car[]) => {
    const bodyTypes: string[] = []
    carsList?.forEach((car: Car) => {
      const isContained = bodyTypes.some(
        (bodyType) => bodyType.toLowerCase() === car.bodyType.toLowerCase()
      )
      if (!isContained) {
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

  // When fetching data, show a loading indicator.
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

  // Inform the user if there is an error.
  if (fetchError) {
    return (
      <View width="100%" justifyContent="center" alignItems="center">
        <Text>{fetchErrorMsg}</Text>
      </View>
    )
  }

  return (
    <section>
      <TabNav aria-label="Filter list">
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

export default ProductFilterableSlider
