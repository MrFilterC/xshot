import React from 'react'
import { useSiteConfig } from '../hooks/useSiteConfig'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { config } = useSiteConfig()
  
  const socialLinks = [
    {
      name: 'X',
      href: 'https://x.com/memexshot',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'Support',
      href: 'https://x.com/memexteam',
      text: true
    },
    {
      name: 'X Community',
      href: 'https://x.com/i/communities/1939776026319417395',
      text: true
    },
    {
      name: 'GitHub',
      href: 'https://github.com/memexshot/memexshot',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      )
    }
  ]

  return (
    <footer className="mt-auto bg-white dark:bg-moonshot-primary border-t border-moonshot-primary/10 dark:border-moonshot-secondary/10">
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand Section */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <img src="/images/logo-left.png" alt="Logo" className="h-8 w-auto" />
                <h3 className="text-lg font-bold text-moonshot-primary dark:text-white">memeXshot</h3>
              </div>
              <p className="text-sm text-moonshot-primary/70 dark:text-white/70 mb-4">
               Free and automatic coin creation platform on Moonshot
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.filter(link => link.icon).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-moonshot-primary dark:text-white mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/faqs" className="text-sm text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="https://x.com/memexshot" target="_blank" rel="noopener noreferrer" className="text-sm text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors">
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a href="https://github.com/memexshot/memexshot" target="_blank" rel="noopener noreferrer" className="text-sm text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-sm font-semibold text-moonshot-primary dark:text-white mb-3">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://x.com/i/communities/1939776026319417395" target="_blank" rel="noopener noreferrer" className="text-sm text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors">
                    X Community
                  </a>
                </li>
                <li>
                  <a href="https://x.com/memexteam" target="_blank" rel="noopener noreferrer" className="text-sm text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-sm font-semibold text-moonshot-primary dark:text-white mb-3">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href={config.mxs_buy_link} target="_blank" rel="noopener noreferrer" className="text-sm text-moonshot-primary/70 dark:text-white/70 hover:text-moonshot-accent transition-colors">
                    Buy mXs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-moonshot-primary/10 dark:border-moonshot-secondary/10">
            <div className="flex items-center justify-center">
              <p className="text-xs text-moonshot-primary/50 dark:text-white/50 text-center">
                © {currentYear} memeXshot. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer