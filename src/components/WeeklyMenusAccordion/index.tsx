import { useWeeklyMenus } from '@/shared/hooks/useWeeklyMenu'
import React, { useOptimistic } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { removeSeconds } from '@/shared/utils/date-format'
import { sortWeekDays } from '@/shared/utils/array-sort'
import { SquarePen } from 'lucide-react'
import { WeeklyMenuResponse } from '@/shared/types/menu'

const WeeklyMenusAccordion: React.FC = () => {
  const weeklyMenusData = useWeeklyMenus()
  const [displayMenus] = useOptimistic(weeklyMenusData.data || ({} as WeeklyMenuResponse))

  return (
    <Accordion type="single" collapsible className="w-full align-middle" defaultValue="item-1">
      {sortWeekDays(Object.entries(displayMenus)).map(([day, menus]) => (
        <AccordionItem value={`item-${day}`} key={day}>
          <AccordionTrigger className="justify-center text-center">{day}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            {menus
              .toSorted((a, b) => a.dailyEvent.startTime.localeCompare(b.dailyEvent.startTime))
              .map(menu => (
                <div key={menu.id} className="flex flex-col gap-2 items-center">
                  <div className="inline-flex items-center gap-2">
                    <h3 className="text-lg font-semibold">
                      {`${menu.dailyEvent.name} (${removeSeconds(
                        menu.dailyEvent.startTime
                      )} - ${removeSeconds(menu.dailyEvent.endTime)})`}{' '}
                    </h3>{' '}
                    <SquarePen className="cursor-pointer size-4" />
                  </div>
                  <p>{menu.dishes.map(dish => dish.name).join(', ')}</p>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
export default WeeklyMenusAccordion
