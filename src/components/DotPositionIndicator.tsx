import { Flex, useTheme } from 'vcc-ui'

interface Props {
  numberOfDots: number
  activeDot: number
}

const DotPositionIndicator: React.FC<Props> = ({
  numberOfDots = 0,
  activeDot = 0,
}) => {
  const theme = useTheme()
  let dotsElements = []

  for (let i = 0; i < numberOfDots; i++) {
    const dotColor =
      i === activeDot
        ? theme.color.foreground.primary
        : theme.color.ornament.border

    dotsElements.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        style={{ padding: '0.2rem' }}
        key={i}
      >
        <circle fill={dotColor} cx="5" cy="5" r="4" />
      </svg>
    )
  }
  return (
    <Flex aria-label="Carousel indicator" extend={{ flexDirection: 'row' }}>
      {dotsElements}
    </Flex>
  )
}

export default DotPositionIndicator
