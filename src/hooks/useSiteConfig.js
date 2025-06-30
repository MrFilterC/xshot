import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export const useSiteConfig = () => {
  const [config, setConfig] = useState({
    mxs_token_address: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXmoon',
    mxs_buy_link: 'https://moonshot.money/',
    sol_price_api: 'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch initial config
    fetchConfig()

    // Subscribe to changes
    const subscription = supabase
      .channel('site_config_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'site_config'
      }, () => {
        fetchConfig()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('site_config')
        .select('key, value')

      if (error) throw error

      if (data) {
        const configObj = {}
        data.forEach(item => {
          configObj[item.key] = item.value
        })
        setConfig(prev => ({ ...prev, ...configObj }))
      }
    } catch (error) {
      console.error('Error fetching site config:', error)
    } finally {
      setLoading(false)
    }
  }

  return { config, loading }
}