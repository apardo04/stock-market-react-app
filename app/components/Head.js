import React from 'react'
import NextHead from 'next/head'
import { string } from 'prop-types'

const defaultDescription = 'Keep track of your stock portfolio today.'
const defaultOGURL = 'https://stockify.app'
const defaultOGImage = 'https://stockify.app/static/images/logo.png'

const Head = props => (
  <React.Fragment>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || ''}</title>
      <meta
        name="description"
        content={props.description || defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" sizes="192x192" href="/static/images/logo.png" />
      <link rel="apple-touch-icon" href="" />
      <link rel="mask-icon" href="" color="#49B882" />
      <link rel="icon" href="/static/images/logo.png" />
      <link href="https://fonts.googleapis.com/css?family=Cinzel&display=swap" rel="stylesheet"></link>
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || ''} />
      <meta property="og:description" content={props.description || defaultDescription} />
      <meta name="twitter:site" content={props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image" content={props.ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
    <style jsx global>{`
      :global(body) {
        margin: 0;
        font-family: Avenir, Helvetica, sans-serif;
      }
    `}</style>
  </React.Fragment>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
}

export default Head
