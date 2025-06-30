import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null)
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  
  const faqs = [
    {
      question: "How it works?",
      answer: "This application allows you to create tokens automatically and for free on the Moonshot mobile app by tweeting. All you need to do is tweet 'launch $ticker @memeXshot' along with an image. Our script will handle the rest."
    },
    {
      question: "How can I tell this is not a manual launch?",
      answer: "Humans make mistakes, but scripts never do. If you watch the system's progress, you'll understand that this is real automation. Additionally, our code is published as open source on GitHub. You can check it here (GitHub link)"
    },
    {
      question: "What is the cost of creating a coin on Moonshot?",
      answer: "Creating a coin on Moonshot costs $4 USD + $5 USD mandatory initial purchase, totaling $9 USD."
    },
    {
      question: "How can I create a coin for free?",
      answer: "Moonshot gives a portion of the trading volume from coins created in the app to creators. The volume revenues from all created tokens, especially mXs, will be spent in an infinite loop to create free coins."
    },
    {
      question: "How exactly will volume revenues be managed?",
      answer: "50% of creator fee earnings will be used as salaries for the team to continue the project. The other 50% will be used for the free coin cycle."
    },
    {
      question: "Is there a plan for mXs holders?",
      answer: "Yes there is! The team plans to airdrop a certain percentage to token holders based on the platform's volume revenue. However, there is no definitive decision on this yet. This will be a reward system directly proportional to your growth of the platform."
    },
    {
      question: "Can I donate to the funding wallet?",
      answer: "We would appreciate that! If our development team has earned your love and appreciation by preparing a free coin creation automation for the Solana community, you can also contribute to the continuation of this infinite loop by donating to the funding wallet.\n\nCreator Wallet: 6si9Wyhk8jD8t4fuL3gH8AywdgApPxtmrg1Q57tbZCoU"
    },
    {
      question: "Why do you have multiple X accounts and what are their functions?",
      answer: "We have 4 different Twitter accounts:\n• memeXshot - our auto launch account that allows you to create free coins\n• memeXsupport1 and memeXsupport2 - our helper bot accounts\n• memeXteam - the account controlled by the team that communicates with the community and makes announcements. We have no other official accounts."
    },
    {
      question: "How long does it take to create a coin?",
      answer: "Each coin transaction takes between 1 to 2 minutes. Coin creation is done through a queue system. You can watch the coins in the queue live on our website."
    },
    {
      question: "Can everyone create coins? Are there daily limits or follower count requirements?",
      answer: "A Twitter user can currently create a maximum of 3 free tokens per day. The follower count restriction is currently '0', but the team reserves the right to increase this number after launch."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-moonshot-primary">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-moonshot-primary border-b border-moonshot-primary/10 dark:border-moonshot-secondary/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <a 
            href="/"
            className="flex items-center gap-2 text-moonshot-primary dark:text-white hover:text-moonshot-accent transition-colors w-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-moonshot-primary dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-moonshot-primary/70 dark:text-white/70">
            Everything you need to know about memeXshot
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-moonshot-secondary/10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-moonshot-primary/10 dark:border-moonshot-secondary/30 overflow-hidden group"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-3 sm:px-6 sm:py-5 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-moonshot-pink/10 hover:to-moonshot-accent/10 dark:hover:from-moonshot-secondary/20 dark:hover:to-moonshot-accent/20 transition-all duration-200"
              >
                <h3 className="text-base sm:text-lg text-moonshot-primary dark:text-white font-medium pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 p-1.5 rounded-full bg-moonshot-accent/10 group-hover:bg-moonshot-accent/20 transition-colors"
                >
                  <ChevronDownIcon className="w-5 h-5 text-moonshot-accent" />
                </motion.div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-4 pt-0 sm:px-6 sm:pb-5">
                      <div className="h-px bg-gradient-to-r from-moonshot-pink/20 via-moonshot-accent/20 to-moonshot-pink/20 mb-3 sm:mb-4"></div>
                      <p className="text-sm sm:text-base text-moonshot-primary/70 dark:text-white/70 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-moonshot-primary/60 dark:text-white/60 mb-4">
            Creator Wallet:
          </p>
          <div className="inline-block bg-gradient-to-r from-moonshot-pink/10 to-moonshot-accent/10 p-[1px] rounded-lg max-w-full">
            <code className="block bg-white dark:bg-moonshot-primary px-3 py-2 sm:px-6 sm:py-3 rounded-lg text-[11px] xs:text-xs sm:text-sm text-moonshot-primary dark:text-white font-mono break-all">
              6si9Wyhk8jD8t4fuL3gH8AywdgApPxtmrg1Q57tbZCoU
            </code>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQs