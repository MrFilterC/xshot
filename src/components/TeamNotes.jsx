import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../utils/supabase'

const TeamNotes = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('team_notes')
        .select('*')
        .single()

      if (error) throw error

      if (data) {
        // Extract non-null notes from the data
        const notesList = []
        for (let i = 1; i <= 20; i++) {
          const noteKey = `note_${i}`
          if (data[noteKey] && data[noteKey].trim()) {
            notesList.push(data[noteKey])
          }
        }
        setNotes(notesList)
      }
    } catch (error) {
      console.error('Error fetching team notes:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchNotes()

    // Set up polling every 2 minutes (120000ms)
    const interval = setInterval(() => {
      fetchNotes()
    }, 120000)

    // Set up real-time subscription
    const subscription = supabase
      .channel('team_notes_changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'team_notes'
        },
        () => {
          fetchNotes()
        }
      )
      .subscribe()

    return () => {
      clearInterval(interval)
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="bg-white dark:bg-moonshot-primary rounded-3xl overflow-hidden h-[600px] relative border-2 border-moonshot-primary/20 dark:border-moonshot-secondary/20">
      <div className="bg-white dark:bg-moonshot-primary rounded-3xl overflow-hidden h-full">
        <div className="px-6 py-5 border-b border-moonshot-primary/10 dark:border-moonshot-secondary/10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-moonshot-primary dark:text-white">Team Notes & Announcements</h2>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="w-2 h-2 rounded-full bg-moonshot-accent shadow-[0_0_8px_rgba(255,220,0,0.6)]"
              />
              <span className="text-xs text-moonshot-primary/70 dark:text-white/70">Live</span>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100%-73px)]">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full"
            >
              <div className="text-moonshot-primary/50 dark:text-white/50">Loading...</div>
            </motion.div>
          ) : notes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-full text-moonshot-primary/50 dark:text-white/50"
            >
              <p>No announcements yet...</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {notes.map((note, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-moonshot-primary/5 dark:bg-moonshot-secondary/10 rounded-lg p-4 border border-moonshot-primary/10 dark:border-moonshot-secondary/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-moonshot-accent rounded-full flex items-center justify-center">
                      <span className="text-moonshot-primary text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-sm text-moonshot-primary dark:text-white leading-relaxed">
                      {note}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TeamNotes