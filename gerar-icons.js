#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

// Tentar usar sharp, se não estiver disponível, tentar canvas
let iconGenerator

try {
  const sharp = require('sharp')
  iconGenerator = 'sharp'
} catch (e) {
  try {
    const { createCanvas } = require('canvas')
    iconGenerator = 'canvas'
  } catch (e2) {
    console.error('❌ Nenhuma biblioteca de geração de imagens encontrada!')
    console.error('   Instale: npm install sharp')
    process.exit(1)
  }
}

const ICONS_DIR = path.join(__dirname, 'icons')
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR)
  console.log('📁 Pasta icons criada')
}

async function gerarIconsComSharp() {
  const sharp = require('sharp')

  // SVG para o ícone
  const svg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <!-- Background gradiente -->
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1E3A8A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#grad)"/>

      <!-- Texto "DF" -->
      <text x="256" y="340" font-size="280" font-weight="bold" font-family="Arial, sans-serif" text-anchor="middle" fill="white" letter-spacing="-10">DF</text>

      <!-- Decoração - Cruz -->
      <line x1="256" y1="80" x2="256" y2="140" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
      <line x1="226" y1="110" x2="286" y2="110" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
    </svg>
  `

  const svgBuffer = Buffer.from(svg)

  // Gerar ícone 512x512
  console.log('🎨 Gerando icon-512.png...')
  await sharp(svgBuffer)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-512.png'))

  // Gerar ícone 192x192
  console.log('🎨 Gerando icon-192.png...')
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-192.png'))

  // Gerar maskable icons (Android Adaptive Icons)
  const svgMaskable = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1E3A8A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E40AF;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" fill="url(#grad)"/>
      <text x="256" y="340" font-size="280" font-weight="bold" font-family="Arial, sans-serif" text-anchor="middle" fill="white" letter-spacing="-10">DF</text>
    </svg>
  `

  const svgMaskableBuffer = Buffer.from(svgMaskable)

  console.log('🎨 Gerando icon-maskable-512.png...')
  await sharp(svgMaskableBuffer)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-maskable-512.png'))

  console.log('🎨 Gerando icon-maskable-192.png...')
  await sharp(svgMaskableBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-maskable-192.png'))

  console.log('✅ Ícones gerados com sucesso!')
}

async function gerarIconsComCanvas() {
  const { createCanvas } = require('canvas')

  function criarIcon(size, maskable = false) {
    const canvas = createCanvas(size, size)
    const ctx = canvas.getContext('2d')

    // Background gradiente
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, '#1E3A8A')
    gradient.addColorStop(1, '#1E40AF')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)

    if (!maskable) {
      // Decoração - Cruz
      ctx.strokeStyle = '#F59E0B'
      ctx.lineWidth = size * 0.015
      ctx.lineCap = 'round'

      const crossY = size * 0.15
      ctx.beginPath()
      ctx.moveTo(size / 2, crossY)
      ctx.lineTo(size / 2, crossY + size * 0.1)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(size / 2 - size * 0.075, crossY + size * 0.05)
      ctx.lineTo(size / 2 + size * 0.075, crossY + size * 0.05)
      ctx.stroke()
    }

    // Texto "DF"
    ctx.fillStyle = 'white'
    ctx.font = `bold ${size * 0.55}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.letterSpacing = -10
    ctx.fillText('DF', size / 2, size * 0.65)

    return canvas
  }

  console.log('🎨 Gerando ícones com canvas...')

  // 512x512
  criarIcon(512, false).createPNGStream().pipe(
    fs.createWriteStream(path.join(ICONS_DIR, 'icon-512.png'))
  )

  // 192x192
  criarIcon(192, false).createPNGStream().pipe(
    fs.createWriteStream(path.join(ICONS_DIR, 'icon-192.png'))
  )

  // Maskable 512x512
  criarIcon(512, true).createPNGStream().pipe(
    fs.createWriteStream(path.join(ICONS_DIR, 'icon-maskable-512.png'))
  )

  // Maskable 192x192
  criarIcon(192, true).createPNGStream().pipe(
    fs.createWriteStream(path.join(ICONS_DIR, 'icon-maskable-192.png'))
  )

  console.log('✅ Ícones gerados com sucesso!')
}

async function main() {
  console.log('🚀 Gerando ícones para PWA...')
  console.log(`   Usando: ${iconGenerator}`)
  console.log('')

  try {
    if (iconGenerator === 'sharp') {
      await gerarIconsComSharp()
    } else {
      await gerarIconsComCanvas()
    }
    console.log('📦 Ícones prontos em ./icons/')
  } catch (err) {
    console.error('❌ Erro ao gerar ícones:', err.message)
    process.exit(1)
  }
}

main()
