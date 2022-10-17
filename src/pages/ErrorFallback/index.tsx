import { ReactNode } from 'react'
import { Container } from '@mantine/core'

const ErrorFallback = (): NonNullable<ReactNode> => {
  return (
    <Container>
      Please Wait...
    </Container>
  )
}

export default ErrorFallback
