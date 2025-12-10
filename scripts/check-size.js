const fs = require('node:fs')
const path = require('node:path')
const { gzipSync } = require('node:zlib')
const { compress } = require('brotli')
const chalk = require('chalk')

function checkFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    return
  }
  const file = fs.readFileSync(filePath)
  const minSize = `${(file.length / 1024).toFixed(2)}kb`
  const gzipped = gzipSync(file)
  const gzippedSize = `${(gzipped.length / 1024).toFixed(2)}kb`
  const compressed = compress(file)
  const compressedSize = `${(compressed.length / 1024).toFixed(2)}kb`
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(filePath)),
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`,
  )
}

checkFileSize(path.resolve(__dirname, '../size-checks/dist/webRouter.js'))
checkFileSize(path.resolve(__dirname, '../dist/vue-router.global.prod.js'))
