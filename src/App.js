import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client'
import React from 'react'

import { H1, H2, Card, Container, Div, Section } from './styles'

const App = () => {
  const client = new ApolloClient({
    uri: 'https://48p1r2roz4.sse.codesandbox.io',
    cache: new InMemoryCache(),
  })

  const EXCHANGE_RATES = gql`
    query GetExchangeRates {
      rates(currency: "IDR") {
        name
        currency
        rate
      }
    }
  `

  const ExchangeRates = () => {
    const { data, error, loading } = useQuery(EXCHANGE_RATES)

    return (
      <>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Uh oh, something went wrong :(</p>
        ) : (
          <>
            <H2>Currency in IDR</H2>
            {data.rates.map(({ name, currency, rate }) => (
              <Div key={currency}>
                <p>Name: {name}</p>
                <p>
                  {currency}: {rate}
                </p>
              </Div>
            ))}
          </>
        )}
      </>
    )
  }

  return (
    <ApolloProvider client={client}>
      <Section>
        <H1>
          My first Apollo app{' '}
          <span role='img' aria-label='rocket'>
            🚀
          </span>
        </H1>
        <Card>
          <Container>
            <ExchangeRates />
          </Container>
        </Card>
      </Section>
    </ApolloProvider>
  )
}

export default App
