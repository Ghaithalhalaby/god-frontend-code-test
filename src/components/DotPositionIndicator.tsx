import { Flex, useTheme } from 'vcc-ui'

interface Props {
  numberOfDots: number
  activeDot: number
}

export const DotPositionIndicator: React.FC<Props> = ({
  numberOfDots = 0,
  activeDot = 0,
}) => {
  const theme = useTheme()
  let dotsElements = []

  for (let i = 1; i < numberOfDots + 1; i++) {
    const dotColor =
      i === activeDot
        ? theme.color.foreground.primary
        : theme.color.ornament.border

    dotsElements.push(
      <svg height="0.8rem" width="0.8rem" style={{ padding: '0.2rem' }} key={i}>
        <circle
          cx="0.4rem"
          cy="0.4rem"
          r="0.3rem"
          strokeWidth="0"
          fill={dotColor}
        />
      </svg>
    )
  }
  return (
    <Flex aria-label="Carousel indicator" extend={{ flexDirection: 'row' }}>
      {' '}
      {dotsElements}{' '}
    </Flex>
  )
}
