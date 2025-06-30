import React, { useState, useEffect } from 'react'
import { getTokenPrice, formatMarketCap, formatPriceUSD, TOKEN_MINTS } from '../services/jupiter'
import { useSiteConfig } from '../hooks/useSiteConfig'

const PriceDisplay = ({ token, symbol, compact = false }) => {
  const [price, setPrice] = useState(null)
  const [loading, setLoading] = useState(true)
  const { config } = useSiteConfig()

  useEffect(() => {
    let interval

    const fetchPrice = async () => {
      try {
        // Use dynamic address from config for MXS, fallback to hardcoded for SOL
        const mintAddress = token === 'MXS' ? config.mxs_token_address : TOKEN_MINTS[token]
        const tokenPrice = await getTokenPrice(mintAddress)
        setPrice(tokenPrice)
        setLoading(false)
      } catch (error) {
        console.error(`Error fetching ${token} price:`, error)
        setLoading(false)
      }
    }

    // Initial fetch
    fetchPrice()

    // Set up interval for updates
    interval = setInterval(fetchPrice, 10000) // 10 seconds

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [token, config.mxs_token_address])

  return (
    <div className={`flex items-center ${compact ? 'gap-1' : 'gap-1.5'}`}>
      <span className={`${compact ? 'text-[10px]' : 'text-xs'} text-moonshot-primary/70 dark:text-white/70`}>
        {symbol}:
      </span>
      <span className={`${compact ? 'text-[10px]' : 'text-xs'} text-moonshot-primary dark:text-white font-medium`}>
        {loading ? '...' : (token === 'SOL' ? formatPriceUSD(price || 0) : formatMarketCap(price || 0))}
      </span>
    </div>
  )
}

export default PriceDisplay