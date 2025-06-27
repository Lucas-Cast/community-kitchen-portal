import { useWeeklyMenus } from '@/shared/hooks/useWeeklyMenu'
import React, { useEffect } from 'react'

interface WeeklyMenusAccordionProps {
  children?: React.ReactNode
}

const WeeklyMenusAccordion: React.FC<WeeklyMenusAccordionProps> = () => {
  const weeklyMenusData = useWeeklyMenus()
  useEffect(() => {
    console.log('Weekly Menus Data:', weeklyMenusData.data)
  }, [weeklyMenusData])
  return (
    <div>
      <h2>Weekly Menus Table</h2>
    </div>
  )
}

export default WeeklyMenusAccordion
