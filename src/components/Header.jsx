import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparklesIcon, ClipboardDocumentIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid'
import ThemeToggle from './ThemeToggle'
import CreateCoinModal from './CreateCoinModal'
import MobileMenu from './MobileMenu'
import PriceDisplay from './PriceDisplay'
import { shortenAddress } from '../services/jupiter'
import { useSiteConfig } from '../hooks/useSiteConfig'

const CompactStatus = ({ statuses }) => {
  const statusLabels = {
    server: 'Server',
    xBot: 'X Bot',
    moonshot: 'Moonshot',
    web: 'Web'
  }
  
  return (
    <div className="flex flex-col gap-0.5">
      {Object.entries(statuses).map(([key, status]) => (
        <div key={key} className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${status ? 'bg-moonshot-success' : 'bg-red-400'}`} />
          <span className="text-[10px] text-moonshot-primary/60 dark:text-white/60">
            {statusLabels[key]}
          </span>
        </div>
      ))}
    </div>
  )
}

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // Get site config from Supabase
  const { config } = useSiteConfig()
  const MXS_CONTRACT = config.mxs_token_address
  const MXS_BUY_LINK = config.mxs_buy_link
  
  // Mock status data - replace with real data
  const [statuses] = useState({
    server: true,
    xBot: true,
    moonshot: true,
    web: true
  })

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(MXS_CONTRACT)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      <header className="bg-white dark:bg-moonshot-primary relative z-40 border-b border-moonshot-primary/10 dark:border-moonshot-secondary/10">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left Section - Logo, FAQs, Social Links */}
            <div className="flex items-center gap-3 sm:gap-6">
              {/* Logo */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Left Logo */}
                <div>
                  <img 
                    src="/images/logo-left.png" 
                    alt="Left logo" 
                    className="h-8 sm:h-10 w-auto"
                  />
                </div>
                {/* Main Logo */}
                <div>
                  <img 
                    src="/images/logo-main.png" 
                    alt="moonXshot logo" 
                    className="h-12 sm:h-[60px] w-auto"
                  />
                </div>
              </div>

              {/* Links Section - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-4">
                <a
                  href="/faqs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors text-sm"
                >
                  FAQs
                </a>
                <a
                  href="https://x.com/memexshot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors text-sm"
                >
                  𝕏
                </a>
                <a
                  href="https://x.com/memexteam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors text-sm"
                >
                  Support
                </a>
                <a
                  href="https://x.com/i/communities/1939776026319417395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors text-sm"
                >
                  𝕏 Community
                </a>
                <a
                  href="https://github.com/memexshot/memexshot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors text-sm"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Center - Create Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 sm:gap-3 px-3 sm:px-8 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl bg-moonshot-accent text-white text-sm sm:text-lg hover:bg-moonshot-accent-hover transition-colors"
            >
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg sm:text-2xl leading-none pb-0.5">+</span>
              </div>
              <span className="hidden sm:inline">Create Free Meme Coin</span>
              <span className="sm:hidden">Create</span>
            </button>

            {/* Right Section - Info Panel */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Combined Price & Buy Section */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Prices - Always visible but compact on mobile */}
                <div className="flex flex-col gap-0.5 sm:gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-moonshot-primary/5 dark:bg-moonshot-secondary/5 border border-moonshot-primary/10 dark:border-moonshot-secondary/10">
                  <PriceDisplay token="SOL" symbol="SOL" compact />
                  <PriceDisplay token="MXS" symbol="mXs" compact />
                </div>
                
                {/* Buy MXS & Contract - Hidden on very small screens */}
                <div className="hidden xs:flex flex-col gap-1">
                  <a
                    href={MXS_BUY_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded-lg bg-moonshot-success text-white text-xs hover:bg-moonshot-success/90 transition-colors text-center"
                  >
                    BUY mXs
                  </a>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1 text-xs text-moonshot-primary/50 dark:text-white/50 hover:text-moonshot-accent transition-colors group px-2"
                  >
                    {shortenAddress(MXS_CONTRACT)}
                    {copied ? (
                      <CheckIcon className="w-3 h-3 text-moonshot-success flex-shrink-0" />
                    ) : (
                      <ClipboardDocumentIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              {/* Compact Status - Hidden on mobile */}
              <div className="hidden lg:block">
                <CompactStatus statuses={statuses} />
              </div>
              
              {/* Theme Toggle - Hidden on mobile */}
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-moonshot-primary/5 dark:hover:bg-moonshot-secondary/5 transition-colors"
              >
                <Bars3Icon className="w-6 h-6 text-moonshot-primary dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Buy MXS Bar */}
      <div className="sm:hidden bg-white dark:bg-moonshot-primary border-b border-moonshot-primary/10 dark:border-moonshot-secondary/10 px-4 py-2">
        <div className="flex items-center justify-between">
          <a
            href={MXS_BUY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-lg bg-moonshot-success text-white text-sm hover:bg-moonshot-success/90 transition-colors"
          >
            BUY mXs
          </a>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 text-xs text-moonshot-primary/50 dark:text-white/50 hover:text-moonshot-accent transition-colors"
          >
            {shortenAddress(MXS_CONTRACT)}
            {copied ? (
              <CheckIcon className="w-3 h-3 text-moonshot-success" />
            ) : (
              <ClipboardDocumentIcon className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>

      {/* Create Coin Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <CreateCoinModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        statuses={statuses}
      />
    </>
  )
}

export default Header