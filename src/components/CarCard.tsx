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
}) => {
  const theme = useTheme()

  return (
    <View
      padding={1}
      extend={{
        flexBasis: '25%',
        untilM: {
          flexBasis: '75%',
        },
        untilL: {
          flexBasis: '33.33%',
        },
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
          as={'h2'}
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
      <img src={imageUrl} width="100%" height="auto" />
      <View direction="row" justifyContent="center">
        <Link href="https://www.volvocars.com/" arrow="right">
          learn
        </Link>
        <Spacer />
        <Link href="https://www.volvocars.com/" arrow="right">
          SHOP
        </Link>
      </View>
    </View>
  )
}
