'use client'


import { Modal } from '../Modal'
import { DataTable } from '../DataTable'
import { useUpcomingDailyEvents } from '@/shared/hooks/dailyEvents/useUpcomingDailyEvent'
import { getUpcomingColumns } from './columnsUpcoming'


type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function UpcomingDailyEventsModal({ isOpen, onClose }: Props) {
  const { data, isLoading, error } = useUpcomingDailyEvents()

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Eventos Restantes de Hoje"
      variant="viewer"
      size="lg"
      animation="slide-up"
    >
      {isLoading && <p className="text-gray-500">Carregando eventos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && data.length > 0 ? (
        <DataTable columns={getUpcomingColumns()} data={data} />
      ) : (
        !isLoading && <p className="text-gray-500">Nenhum evento restante para hoje.</p>
      )}
    </Modal>
  )
}
