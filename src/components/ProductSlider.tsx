import { useRef, useEffect, useState } from 'react'
import { View, useTheme, Icon, Click } from 'vcc-ui'
import { Car } from '../utils/types'
import CarCard from './CarCard'
import DotPositionIndicator from './DotPositionIndicator'

interface Props {
  carsList: Car[]
}

const ProductSlider: React.FC<Props> = ({ carsList }) => {
  // State declaration.
  const [isOverflown, setIsOverflown] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [index, setIndex] = useState(0)

  // Using theme provider.
  const theme = useTheme()

  // Referancing the slider element.
  const slider = useRef<HTMLUListElement>(null)
  // Referancing stop scrolling time.
  const scrollingTimerRef = useRef(0)

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 480px)').matches
    if (!isScrolling && !isTouching && isMobile) {
      snapScroll()
    }
  }, [isScrolling, isTouching])

  useEffect(() => {
    // Reset the slider to the first postion.
    restScrollPostion()
    // Adding event listeners
    if (slider.current) {
      setIsOverflown(slider.current?.scrollWidth > slider.current?.clientWidth)
      slider.current.addEventListener('scroll', onScroll)
      slider.current.addEventListener('touchstart', touchStart, {
        passive: true,
      })
      slider.current.addEventListener('touchend', touchEnd, { passive: true })
    }
    // Cleaning event listeners
    return () => {
      if (slider.current) {
        slider.current.removeEventListener('scroll', onScroll)
        slider.current.removeEventListener('touchstart', touchStart)
        slider.current.removeEventListener('touchend', touchEnd)
      }
    }
  }, [carsList])

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
    const carCardIndex = Math.round(slider.current.scrollLeft / carCardWidth)
    setIndex(carCardIndex)
  }

  /**
   * Snaps the current car card to the center (mobile devices).
   */
  const snapScroll = () => {
    if (!slider.current) return
    slider.current.scrollTo({
      left: calculateSnapScrolling(),
      behavior: 'smooth',
    })
  }

  /**
   * Calculate snap scroll postion.
   * @returns Snap scroll postion.
   */
  const calculateSnapScrolling = () => {
    if (!slider.current) return 0
    // Snap to the start and the end with the first and the last car card.
    if (index === 0) return 0
    if (index === carsList.length) return slider.current.scrollWidth

    const carCardWidth = slider.current.scrollWidth / carsList.length
    // A car card is 75% of the slider's width. To center the current card,
    // each of the adjacent two cards should show 12.5% of the width.
    const scrollPostion = index * carCardWidth - 0.125 * carCardWidth
    return scrollPostion
  }

  /**
   * Scrolls the slider to the first postion.
   */
  const restScrollPostion = () => {
    if (!slider.current) return
    setIndex(0)
    slider.current.scrollTo({
      left: 0,
      behavior: 'auto',
    })
  }

  /**
   * Detects if the slider has stopped scrolling.
   */
  const detectStopScrolling = () => {
    setIsScrolling(true)
    clearTimeout(scrollingTimerRef.current)
    scrollingTimerRef.current = window.setTimeout(() => {
      setIsScrolling(false)
    }, 100)
  }

  /**
   * Indicates that touching has started.
   */
  const touchStart = () => {
    setIsTouching(true)
  }

  /**
   * Indicates that touching has ended.
   */
  const touchEnd = () => {
    setIsTouching(false)
  }

  /**
   * On scroll handler.
   */
  const onScroll = () => {
    updateIndex()
    detectStopScrolling()
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
        {carsList?.map((car, i) => (
          <CarCard
            bodyType={car.bodyType}
            modelName={car.modelName}
            modelType={car.modelType}
            imageUrl={car.imageUrl}
            key={car.id}
            cardIndex={i}
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
        display={isOverflown ? { default: 'none', fromM: 'flex' } : 'none'}
      >
        <Click onClick={scrollPrevious} aria-label="previuos">
          <Icon
            type="mediacircled-previous-40"
            color={isOverflown ? 'primary' : 'secondary'}
          />
        </Click>
        <Click onClick={scrollNext} aria-label="next">
          <Icon
            type="mediacircled-next-40"
            color={isOverflown ? 'primary' : 'secondary'}
          />
        </Click>
      </View>
    </View>
  )
}

export default ProductSlider
