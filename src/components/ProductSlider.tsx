import { useRef, useEffect, useState } from 'react'
import { View, useTheme, Icon, Click } from 'vcc-ui'
import { CarCard, Car } from './CarCard'
import { DotPositionIndicator } from './DotPositionIndicator'

interface Props {
  carsList: Car[]
}

export const ProductSlider: React.FC<Props> = ({ carsList }) => {
  // State declaration
  const [isOverflown, setIsOverflown] = useState(false)
  const [index, setIndex] = useState(1)

  // Using VCC theme
  const theme = useTheme()

  // Referancing the slider element.
  const slider = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const onScroll = () => {
      updateIndex()
    }
    if (slider.current) {
      // Check if the width of the car cars exceeds the width of the slider.
      setIsOverflown(slider.current?.scrollWidth > slider.current?.clientWidth)
      slider.current.addEventListener('scroll', onScroll)
    }

    return () => {
      if (slider.current) {
        slider.current.removeEventListener('scroll', onScroll)
      }
    }
  }, [slider.current])

  /**
   * Scrolls to the next cars in the list.
   */
  const scrollNext = () => {
    if (!slider.current) return
    // If the carousel has reached its end, scroll back to the start.
    const maxScroll = slider.current.scrollWidth - slider.current.clientWidth
    if (slider.current.scrollLeft === maxScroll) {
      slider.current.scroll({
        left: 0,
        behavior: 'smooth',
      })
      return
    }
    // Scroll to next group of cars that are not shown.
    const scrollPostion = slider.current.scrollLeft + slider.current.clientWidth
    slider.current.scroll({
      left: scrollPostion,
      behavior: 'smooth',
    })
  }

  /**
   * Scrolls to the previous cars in the list.
   */
  const scrollPrevious = () => {
    if (!slider.current) return
    // If the carousel has reached its start, scroll to the end.
    if (slider.current.scrollLeft === 0) {
      const maxScroll = slider.current.scrollWidth - slider.current.clientWidth
      slider.current.scroll({
        left: maxScroll,
        behavior: 'smooth',
      })
      return
    }
    // Scroll to previous group of cars that are not shown.
    const scrollPostion = slider.current.scrollLeft - slider.current.clientWidth
    slider.current.scrollTo({
      left: scrollPostion,
      behavior: 'smooth',
    })
  }

  /**
   * Update postion index.
   */
  const updateIndex = () => {
    if (!slider.current) return
    const carCardWidth = slider.current.scrollWidth / carsList.length
    const carCardIndex =
      Math.round(slider.current.scrollLeft / carCardWidth) + 1
    setIndex(carCardIndex)
  }

  return (
    <View>
      <View
        ref={slider}
        as="ul"
        direction="row"
        padding={0}
        marginBottom={1}
        width="100%"
        extend={{
          overflowX: 'scroll',
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {carsList?.map((car) => (
          <CarCard
            bodyType={car.bodyType}
            modelName={car.modelName}
            modelType={car.modelType}
            imageUrl={car.imageUrl}
            key={car.id}
          />
        ))}
      </View>
      <View
        direction="row"
        justifyContent="center"
        spacing={1}
        display={{ default: 'flex', fromM: 'none' }}
      >
        <DotPositionIndicator
          numberOfDots={carsList?.length}
          activeDot={index}
        />
      </View>
      <View
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        display={{ default: 'none', fromM: 'flex' }}
      >
        <Click
          onClick={scrollPrevious}
          disabled={!isOverflown}
          aria-label="previuos"
        >
          <Icon
            type="mediacircled-previous-40"
            color={isOverflown ? 'primary' : 'secondary'}
          />
        </Click>
        <Click onClick={scrollNext} disabled={!isOverflown} aria-label="next">
          <Icon
            type="mediacircled-next-40"
            color={isOverflown ? 'primary' : 'secondary'}
          />
        </Click>
      </View>
    </View>
  )
}
