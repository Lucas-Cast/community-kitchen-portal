import { useMenus } from '@/shared/hooks/useMenus'
import { DataTable } from '../DataTable'
import { columns } from './columns'
import { useOptimistic } from 'react'
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

export default function MenuTable() {
  const menusData = useMenus()
  const [optimisticMenusData] = useOptimistic(menusData.data || [])

  return (
  <div className="container mx-auto py-10 space-y-4">
    //Testando Modal
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Abrir Modal de Teste</Button>
      </DialogTrigger>
      <DialogContent size='sm' variant='form'>
        <DialogHeader>
          <DialogTitle>Modal de Teste</DialogTitle>
          <DialogDescription>Isso é apenas um teste visual do modal.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <input className="w-full border px-4 py-2 rounded" placeholder="Campo de teste" />
          <input className="w-full border px-4 py-2 rounded" placeholder="Outro campo" />
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancelar</Button>
          <Button>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={optimisticMenusData} />
    </div>
    </div>
    )
  }
