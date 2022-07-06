import styles from '../../public/css/productCard.module.css'
import { View, Text, useTheme, Link, Spacer } from 'vcc-ui'
import { Car } from '../utils/types'

interface Props extends Car {
  cardIndex?: number
}

export const CarCard: React.FC<Props> = ({
  bodyType,
  modelName,
  modelType,
  imageUrl,
  cardIndex = 0,
}) => {
  const theme = useTheme()

  return (
    <View
      paddingLeft={1}
      paddingRight={1}
      as="li"
      className={styles.fadein}
      extend={{
        flexBasis: '25%',
        untilM: {
          flexBasis: '75%',
        },
        untilL: {
          flexBasis: '33.33%',
        },
        animationDelay: `${cardIndex * 100}ms`,
      }}
    >
      <Text
        variant="kelly"
        subStyle="emphasis"
        extend={{
          color: theme.color.foreground.secondary,
          textTransform: 'uppercase',
        }}
      >
        {bodyType}
      </Text>
      <View direction="row" spacing={1} wrap="wrap" marginBottom={1}>
        <Text
          variant={'amundsen'}
          as={'h3'}
          extend={{ color: theme.color.foreground.primary }}
        >
          {modelName}
        </Text>
        <Text
          variant={'columbus'}
          extend={{ color: theme.color.foreground.secondary }}
        >
          {modelType}
        </Text>
      </View>

      <img
        src={imageUrl}
        width="100%"
        height="auto"
        alt={`${modelName}${modelType}`}
      />

      <View direction="row" justifyContent="center" marginTop={1}>
        <Link
          href="#"
          arrow="right"
          aria-label={`Learn more about ${modelName}${modelType}`}
        >
          learn
        </Link>
        <Spacer />
        <Link
          href="#"
          arrow="right"
          aria-label={`Buy ${modelName}${modelType}`}
        >
          SHOP
        </Link>
      </View>
    </View>
  )
}
