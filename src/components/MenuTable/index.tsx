import { useMenus } from '@/shared/hooks/useMenus'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useOptimistic, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { ModalWrapper } from '../Modal/modal'

export default function MenuTable() {
  const menusData = useMenus()
  const [optimisticMenusData] = useOptimistic(menusData.data || [])
  const [open, setOpen] = useState(false)

  return (
  <div className="container mx-auto py-10 space-y-4">

    {/*Testando Modal*/}
        <>
      <Button onClick={() => setOpen(true)}>Abrir Modal de Teste</Button>

      <ModalWrapper
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log('Salvar enviado!')
          setOpen(false)
        }}

        title="Modal de Teste"
        description="Preencha os campos abaixo"
        size="lg"
        variant="alert"
      >
        <form className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Campo de teste"
          />
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Outro campo"
          />
        </form>
      </ModalWrapper>
    </>

    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={optimisticMenusData} />
    </div>
    </div>
    )
  }
