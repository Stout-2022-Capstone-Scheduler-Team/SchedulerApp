import React, { useRef } from 'react'
import { IndexKind } from 'typescript'
import Home from '../../pages'
import ExportModal from '../export/ExportModal'

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <a href="https://nextjs.org/docs">
      <h2>Documentation &rarr;</h2>
      <p>Find in-depth information about Next.js features and API.</p>
    </a>

    <a href="https://nextjs.org/learn">
      <h2>Learn &rarr;</h2>
      <p>Learn about Next.js in an interactive course with quizzes!</p>
    </a>

    <a href="https://github.com/vercel/next.js/tree/canary/examples">
      <h2>Examples &rarr;</h2>
      <p>Discover and deploy boilerplate example Next.js projects.</p>
    </a>

    <a href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app">
      <h2>Deploy &rarr;</h2>
      <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
    </a>
  </div>
))

const MyComponent = () => {
  const componentRef = useRef()

  return (
    <React.Fragment>
      <ComponentToPrint ref={componentRef} />
      <button
        onClick={async () => {
          const { exportComponentAsPNG } = await import(
            'react-component-export-image'
          )
          exportComponentAsPNG(componentRef)
        }}
      >
        Download as PNG
      </button>
      <button
        onClick={async () => {
          const { exportComponentAsJPEG } = await import(
            'react-component-export-image'
          )
          exportComponentAsJPEG(componentRef)
        }}
      >
        Download as JPEG
      </button>
      <button
        onClick={async () => {
          const { exportComponentAsPDF } = await import(
            'react-component-export-image'
          )
          exportComponentAsPDF(componentRef)
        }}
      >
        Download as PDF
      </button>
    </React.Fragment>
  )
}

export default MyComponent
