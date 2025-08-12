import Head from 'next/head'
import LeadershipMemoryTool from '@/components/LeadershipMemoryTool'

export default function Home() {
  return (
    <>
      <Head>
        <title>Leadership Item Memory Assessment Tool</title>
        <meta name="description" content="Analyze whether your leadership questionnaire items trigger episodic or semantic memory" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LeadershipMemoryTool />
    </>
  )
}