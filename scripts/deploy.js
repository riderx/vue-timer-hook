const ghpages = require('gh-pages')

ghpages.publish('demo_dist')
  .catch((err) => {
    console.error('Deploy failed:', err)
  })
