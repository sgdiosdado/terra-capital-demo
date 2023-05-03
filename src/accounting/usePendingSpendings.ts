import { useEffect, useState } from "react"

export type PendingSpendings = {
  id: number;
  development: string;
  price: number;
  discount: number;
  saleType: string;
};

const dummyData: PendingSpendings[] = [
  {
    id: 1,
    development: 'Villa Dorada',
    price: 1700000,
    discount: 150000,
    saleType: 'contado',
  },
  {
    id: 2,
    development: 'Los Encinos',
    price: 1500000,
    discount: 20000,
    saleType: 'contado',
  },
  {
    id: 3,
    development: 'Las Palmas',
    price: 2000000,
    discount: 185000,
    saleType: 'financiado',
  },
  {
    id: 4,
    development: 'Los Doctores',
    price: 169000,
    discount: 15000,
    saleType: 'Contando',
  },
];

export const usePendingSpendings = () => {
  const [data, setData] = useState<PendingSpendings[]>([]);

  useEffect(() => {
    const fetchPendingSpendings = async () => {
      return Promise.resolve(dummyData)
    }
    fetchPendingSpendings().then(res => setData(res));
  }, [])

  return { data }
}