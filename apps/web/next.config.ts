import type { NextConfig } from 'next'
import './src/utils/env/client'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true
  }
}

export default nextConfig
