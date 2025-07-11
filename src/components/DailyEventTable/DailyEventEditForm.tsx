
'use client';

import { useState, useEffect } from 'react';
import { DailyEvent } from '@/shared/types/daily-event';
import { DailyEventPayload } from '@/shared/types/daily-event-payload';

import { menuRequirementService } from '@/shared/services/menuRequirement/menuRequirement';
import { useUpdateDailyEvent } from '@/shared/hooks/dailyEvents/useUpdateDailyEvents';
import { toast } from 'sonner';
import { MenuRequirement } from '@/shared/types/menu-requirement';


interface MenuRequirementOption {
  id: number;
  name: string;
}

type DailyEventEditFormProps = {
  data: DailyEvent;
  onSuccess: (updatedData: DailyEvent) => void;
};

export default function DailyEventEditForm({ data, onSuccess }: DailyEventEditFormProps) {
  const [name, setName] = useState(data.name);
  const [startTime, setStartTime] = useState(data.startTime);
  const [endTime, setEndTime] = useState(data.endTime);
  const [selectedRequirementId, setSelectedRequirementId] = useState<number | undefined>(
    data.requirementId
  );

  const [menuRequirementOptions, setMenuRequirementOptions] = useState<MenuRequirementOption[]>([]);
  const [isLoadingRequirements, setIsLoadingRequirements] = useState(true);
  const [errorLoadingRequirements, setErrorLoadingRequirements] = useState<string | null>(null);

  const { update, loading: isUpdating, error: updateError } = useUpdateDailyEvent(updatedDailyEvent => {
    onSuccess(updatedDailyEvent);
  });

  useEffect(() => {
    async function fetchMenuRequirements() {
      setIsLoadingRequirements(true);
      setErrorLoadingRequirements(null);
      try {
        const fullRequirements: MenuRequirement[] = await menuRequirementService.getActiveMenuRequirements();
        const options: MenuRequirementOption[] = fullRequirements.map(req => ({
          id: req.id,
          name: `ID: ${req.id} - ${req.minCalories}-${req.maxCalories} kcal` 
        }));
        setMenuRequirementOptions(options);
      } catch (err) {
        console.error('Erro ao carregar requisitos nutricionais:', err);
        setErrorLoadingRequirements('Erro ao carregar requisitos nutricionais.');
        toast.error('Erro ao carregar requisitos nutricionais para o formulário!');
      } finally {
        setIsLoadingRequirements(false);
      }
    }
    fetchMenuRequirements();
  }, []);

  useEffect(() => {
    setName(data.name);
    setStartTime(data.startTime);
    setEndTime(data.endTime);
    setSelectedRequirementId(data.requirementId);
  }, [data]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: DailyEventPayload = {
      name,
      startTime,
      endTime,
      requirementId: selectedRequirementId,
    };

    await update(data.id, payload);
  }

  return (
    <form className="space-y-4" id="edit-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dailyEventName" className="block text-sm font-medium">Nome</label>
        <input
          id="dailyEventName"
          type="text"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dailyEventStartTime" className="block text-sm font-medium">Horário de Início</label>
        <input
          id="dailyEventStartTime"
          type="time"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dailyEventEndTime" className="block text-sm font-medium">Horário de Término</label>
        <input
          id="dailyEventEndTime"
          type="time"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dailyEventRequirement" className="block text-sm font-medium">Requisito Nutricional</label>
        <select
          id="dailyEventRequirement"
          className="w-full px-3 py-2 border rounded bg-white text-black"
          value={selectedRequirementId ?? ''}
          onChange={e => setSelectedRequirementId(e.target.value ? parseInt(e.target.value) : undefined)}
          disabled={isLoadingRequirements || isUpdating}
        >
          <option value="">{isLoadingRequirements ? 'Carregando requisitos...' : 'Selecione um requisito'}</option>
          {menuRequirementOptions.map((req: MenuRequirementOption) => (
            <option key={req.id} value={req.id}>
              {req.name}
            </option>
          ))}
        </select>
        {errorLoadingRequirements && <p className="text-red-500 text-sm mt-1">{errorLoadingRequirements}</p>}
      </div>

      {updateError && <p className="text-red-500 text-sm mt-2">{updateError}</p>}
    </form>
  );
}