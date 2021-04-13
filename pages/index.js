import Head from 'next/head'
import { useState } from 'react'
import ResultList from '../components/ResultList'
import ScrapeForm from '../components/ScrapeForm'
import { initResults } from '../lib/results'

export default function Home({ savedResults }) {
  const [results, setResults] = useState(savedResults)

  function addResult(newRes) {
    setResults((oldResults) => [...oldResults, newRes])
  }

  return (
    <div className="container">
      <Head>
        <title>Skrape</title>
      </Head>
      <h1 className="logo">SKRAPE</h1>
      <ScrapeForm addResult={addResult} />
      <ResultList results={results} />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      savedResults: initResults(),
    },
  }
}
