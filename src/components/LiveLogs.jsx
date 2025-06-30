import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useSupabaseRealtime } from '../hooks/useSupabaseRealtime'

const Statistics = ({ successful, queued, failed }) => (
  <div className="px-4 sm:px-6 py-3 sm:py-5 border-b border-moonshot-primary/10 dark:border-moonshot-secondary/10">
    <div className="flex items-center justify-between">
      <h2 className="text-lg sm:text-xl text-moonshot-primary dark:text-white">Live Activity</h2>
      <div className="bg-white dark:bg-moonshot-primary rounded-lg border border-moonshot-primary/10 dark:border-moonshot-secondary/10 px-3 sm:px-4 py-1.5 sm:py-2">
        <h3 className="text-[10px] sm:text-xs text-moonshot-primary/50 dark:text-white/50 uppercase tracking-wider mb-1">Statistics</h3>
        <div className="flex gap-3 sm:gap-4">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-moonshot-primary dark:text-white font-medium">{successful}</p>
            <p className="text-[10px] sm:text-xs text-moonshot-primary/70 dark:text-white/70">Completed</p>
          </div>
          <div className="w-px bg-moonshot-primary/10 dark:bg-moonshot-secondary/20"></div>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-moonshot-primary dark:text-white font-medium">{queued}</p>
            <p className="text-[10px] sm:text-xs text-moonshot-primary/70 dark:text-white/70">Queue</p>
          </div>
          <div className="w-px bg-moonshot-primary/10 dark:bg-moonshot-secondary/20"></div>
          <div className="text-center">
            <p className="text-xs sm:text-sm text-moonshot-primary dark:text-white font-medium">{failed}</p>
            <p className="text-[10px] sm:text-xs text-moonshot-primary/70 dark:text-white/70">Failed</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ProcessingToken = ({ token }) => {
  if (!token) {
    return (
      <div className="flex items-center justify-center h-full text-moonshot-primary/50 dark:text-white/50">
        <p className="text-sm sm:text-base">No token processing...</p>
      </div>
    )
  }

  const tweetUrl = `https://twitter.com/${token.twitter_user}/status/${token.tweet_id}`
  const profileUrl = `https://twitter.com/${token.twitter_user}`

  // Format follower count
  const formatFollowers = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm text-moonshot-primary/70 dark:text-white/70 mb-3">
            Creating Token
          </h4>
          
          {/* User Info */}
          <div className="flex items-start gap-3 mb-4">
            {/* Profile Picture */}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              {token.profile_image_url ? (
                <img
                  src={token.profile_image_url}
                  alt={token.twitter_user}
                  className="w-14 h-14 rounded-full hover:ring-2 hover:ring-moonshot-accent transition-all"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-moonshot-accent flex items-center justify-center">
                  <span className="text-white text-xl">
                    {token.twitter_user.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </a>

            {/* User Details */}
            <div className="flex-1">
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-moonshot-primary dark:text-white hover:text-moonshot-accent transition-colors"
              >
                {token.name || token.twitter_user}
              </a>
              <p className="text-sm text-moonshot-primary/70 dark:text-white/70">
                @{token.twitter_user} • {formatFollowers(token.followers_count || 0)} followers
              </p>
            </div>
          </div>

          {/* Token Info */}
          <div className="bg-moonshot-accent/10 rounded-xl p-4">
            <p className="text-3xl font-mono text-moonshot-primary dark:text-white">
              ${token.ticker}
            </p>
            <a
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-moonshot-accent hover:text-moonshot-accent-hover hover:underline mt-1 inline-block transition-colors"
            >
              View Tweet →
            </a>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-moonshot-primary/70 dark:text-white/70">Status</span>
            <span className="text-moonshot-accent">Creating...</span>
          </div>
        </div>

        <div className="relative pt-4">
          <div className="h-2 bg-moonshot-primary/10 dark:bg-moonshot-secondary/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-moonshot-accent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.45, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const QueueItem = ({ item, index, totalInQueue }) => {
  const [timeRemaining, setTimeRemaining] = useState(null)
  
  useEffect(() => {
    // Calculate initial time: 1.45 minutes (87 seconds) per token
    const initialTime = (index + 1) * 87 // 1.45 minutes = 87 seconds
    setTimeRemaining(initialTime)
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [index])
  
  const formatTime = (seconds) => {
    if (seconds === 0) return 'Loading...'
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const tweetUrl = `https://twitter.com/${item.twitter_user}/status/${item.tweet_id}`
  const profileUrl = `https://twitter.com/${item.twitter_user}`

  // Format follower count
  const formatFollowers = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }
  
  // Tweet text construction (same as LiveFeed)
  const tweetText = `Perfecto $${item.ticker} @memeXshot`

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white dark:bg-moonshot-primary border border-moonshot-primary/10 dark:border-moonshot-secondary/10 rounded-lg hover:bg-moonshot-primary/5 dark:hover:bg-moonshot-secondary/5 transition-colors group cursor-pointer relative overflow-hidden m-2"
      onClick={() => window.open(tweetUrl, '_blank')}
    >
      <div className="p-2">
        <div className="flex items-start gap-2">
          {/* Profile Picture */}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0"
          >
            {item.profile_image_url ? (
              <img
                src={item.profile_image_url}
                alt={item.twitter_user}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:ring-2 hover:ring-moonshot-accent transition-all"
              />
            ) : (
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-moonshot-accent flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-xs">
                  {item.twitter_user.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </a>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                <span className="text-[11px] sm:text-xs text-moonshot-primary dark:text-white truncate">
                  {item.name || item.twitter_user}
                </span>
                <span className="text-[10px] sm:text-xs text-moonshot-primary/70 dark:text-white/70 hidden xs:inline">
                  @{item.twitter_user}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-moonshot-accent font-medium flex-shrink-0">
                {formatTime(timeRemaining)}
              </p>
            </div>
            
            {/* Tweet Text */}
            <p className="text-xs text-moonshot-primary dark:text-white mb-1">
              {tweetText}
            </p>
            
            {/* Bottom Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                <p className="font-mono text-xs sm:text-sm text-moonshot-primary dark:text-white">
                  ${item.ticker}
                </p>
                <span className="text-[10px] sm:text-xs text-moonshot-primary/70 dark:text-white/70 hidden xs:inline">
                  • {formatFollowers(item.followers_count || 0)} followers
                </span>
              </div>
              
              {/* Small Image Preview */}
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={`${item.ticker} token`}
                  className="w-6 h-6 rounded object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const LiveLogs = () => {
  // Fetch queue data
  const { data: queueData } = useSupabaseRealtime('tweet_queue', {
    orderBy: { column: 'created_at', ascending: true }
  })
  
  // Fetch coins data for processing items
  const { data: coinsData } = useSupabaseRealtime('coins', {
    orderBy: { column: 'created_at', ascending: false },
    limit: 10
  })

  // Use real data from Supabase
  const activeQueueData = queueData

  // Filter queue items (only from tweet_queue)
  const queueItems = activeQueueData.filter(item => item.status === 'queued')
  
  // Find processing item - check coins table for items with status 'processing'
  const processingCoin = coinsData.find(coin => coin.status === 'processing')
  const processingQueueItem = activeQueueData.find(item => item.status === 'processing')
  
  // Use coin data if available, otherwise fallback to queue data
  const processingItem = processingCoin || processingQueueItem
  
  // Calculate stats - combine both tables
  const stats = {
    successful: coinsData.filter(coin => coin.status === 'completed').length,
    queued: queueItems.length,
    failed: coinsData.filter(coin => coin.status === 'failed').length
  }

  return (
    <div className="bg-white dark:bg-moonshot-primary rounded-2xl sm:rounded-3xl overflow-hidden h-[350px] xs:h-[400px] sm:h-[600px] relative border-2 border-moonshot-primary/20 dark:border-moonshot-secondary/20">
      <Statistics {...stats} />

      <div className="grid grid-cols-1 sm:grid-cols-2 h-[calc(100%-73px)]">
        {/* Processing Section */}
        <div className="sm:border-r border-b sm:border-b-0 border-moonshot-primary/10 dark:border-moonshot-secondary/10">
          <ProcessingToken token={processingItem} />
        </div>

        {/* Queue Section */}
        <div className="overflow-y-auto">
          <div className="p-3 sm:p-4 border-b border-moonshot-primary/10 dark:border-moonshot-secondary/10 sticky top-0 bg-white dark:bg-moonshot-primary">
            <h3 className="text-sm sm:text-base text-moonshot-primary dark:text-white">
              Queue ({queueItems.length})
            </h3>
          </div>
          
          {queueItems.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-moonshot-primary/50 dark:text-white/50">
              <p>No tokens in queue</p>
            </div>
          ) : (
            <div className="space-y-1">
              {queueItems.map((item, index) => (
                <QueueItem 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  totalInQueue={queueItems.length} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LiveLogs