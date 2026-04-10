import React, { createContext, useContext, ReactNode, useMemo, useState } from 'react';
import { Vehicle } from '../types';

interface VehicleContextType {
  vehicles: Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  removeVehicle: (id: string) => void;
  toggleAvailability: (id: string) => void;
}

const initialVehicles: Vehicle[] = [
  {
    id: '1',
    brand: 'BYD',
    model: 'King (Híbrido)',
    category: 'Black', 
    pricePerDay: 320,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEja9vaNsELNgI94JIEbIZVoxt8xj1drKyrq93zMU6Pd4QN6LkROhAeq2_LMA2aWphhZZTw5riiQi1G1v68qcC-XGDwK8GtLcfs2_WWApBcDnG2epLiQs6mk2GrxVJrHnWv56zaocTuD-izzL9nmkms_E0UGR8Ow3x68dPwK4XV6T2thSzjYihyHBvsdrqzX',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
  {
    id: '2',
    brand: 'Jeep',
    model: 'Renegade',
    category: 'Black',
    pricePerDay: 140,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEiPi0lu6VTbibUBysv3gob8QCFts_SaXifDjmnBkRDJQ5H0sOMg-nFTFwaspmKUMIOjFkKuL_xoD0R7xLrU40nz_4aDfmYE0W2KC7rREm0jfg8oBdAVyz5OtkF6Kx3kMwHggSUyQ72jtNlMur0uEzEeRlVBxFxD4cfTaVVL_V5n2q9F-RhxwXqfWVfVYtHx',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
  {
    id: '3',
    brand: 'Citroen',
    model: 'C4 Cactus',
    category: 'Black',
    pricePerDay: 140,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEjgmYaqKq1AyhKGiuvdC_p-_mBOFH6hdax-5h5_G2Gyv0z-32FrzWLb8Pzp2FnrHgIvLrsALLz1rGtpfkEzaQ_KWFMuY9L7l9Zqb963HIEWAWROnFzH-bv0yTPD02dOrZwE5i1VFVZgcwzFPy6ypmZ0pyIaCLpNvLLLaYyw1gsm6JoTYFR6ViK8B2I0DstS',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
  {
    id: '4',
    brand: 'Renault',
    model: 'Captur',
    category: 'Black',
    pricePerDay: 180,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEjqL7uFA_LpexaC0AL9XD0iemrMc0EA3queC5m5eDm0N6BhPfXmEktWRZhh_nVtfF09e21sM6f0YNfsN9sSzfPMpBhKPfSLxjSpLqV4-mQ9LtH19mgDu8VZtc74ebpHwLqk583CE70Iq7EqKZdBOyG_8rXRSDdqSQ7Q4N_Q_JLYWIyIBrWHObjNlElCmSKQ',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '5',
    brand: 'Renault',
    model: 'Duster',
    category: 'Black',
    pricePerDay: 180,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEg6Oda_B53oFrOAXXLTbQOSM5azpRWbaVP6tpCeRoHOXGu6CyVVBMdnyCapUj5G9SJ1etIDArHdXhz-yYTMMf-riQlfxxqKxyU_rA6bgxAYo5RC_CoHVXSd8j_i9TdqDUf4FfuLkvDJXtP3asCQWbq5yAV6gM7qYC1Cz6lAXpl_YtqMO6rFTV50GI2B8Zkf',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '6',
    brand: 'Nissan',
    model: 'Kicks',
    category: 'Black',
    pricePerDay: 180,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEj2v9565nitwwFFIRrn0zizv6B6L7TJq6byxnlehgeUu8gkzGVAdMP5IVeg-0wSj2eQLxlzZ5h7L19JMxachYtGCyoyZEkCeQrdMlwAA9U5cjY4d9fnuzVy_bhMInGnL5XMzJwbr8tJ3YDyiXO-xvtzxi5U431u51l8KMaTfomE-4cOju5cEW0YjaBlyQ0C',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '7',
    brand: 'Chevrolet',
    model: 'Onix LTZ',
    category: 'Comfort',
    pricePerDay: 196,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEi_enpe6hZFeBhHcDNZIvO-1quOIV90xL7bYmV4FCa_jgXCOvCH3uyfyQJZxHXrFnABEUNKG6_f6fSZDfzBiZSMVSeDVs8TQ-uEN_BVP6y0T_JFx2QHVFWzrobx1bpsfITsblaTSfGyXH29YQo0pNUMAZKVqXjXauXisDBXcaGTchUqbYs_43UwfF49fGOj',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '8',
    brand: 'Renault',
    model: 'Logan',
    category: 'Comfort',
    pricePerDay: 196,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEi6Nzz9FW5009rXa0M8F85hKIY4umXKnr7_x2rPjPdaKkkmPwhiNCng38YwitA_eMIzl_mQUrvzj99obomKtJGTrB7tIGj_4d4RwdBb_tVKFbAEmSWdbOAvBGvmAzosApesyQmacOGs6sH2Q1iNR9_a7A_j29H8QpJPw69JWhPBDsHREAygqADUBjZdcP6P',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '9',
    brand: 'Volkswagen',
    model: 'Voyage',
    category: 'Comfort',
    pricePerDay: 196,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEip8XdiEs29JrbWcoaKDzpYO0sK03jTbmVSTRsdqoiIqz-8kot_0ugPmIn2OD3G96zwPzXoIA4_wiCDVaky16jfHffi4QQ3AeIsC-agpwz3NiiVhoMbk5oPY_x_rxyBUH342gCkR0M1vy2CRFUbkp5qjfUhf04v0X4ifigtyJHM6iOCgxLosLov8X1XSlMi',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '10',
    brand: 'Chevrolet',
    model: 'Prisma',
    category: 'Comfort',
    pricePerDay: 196,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEhc5sAaepIymiCfUZbuXbAcS1KJEUzSr4B2nUnL5Ho2z1mFzaFQgfsR6-BvKTLpdGEWls2O3Yiteg6hvDBT0EBXegXX2Tu7A3QsCDwb4oI7Omp8exTP5iKOvmTmOThPacNepW_qV4SHD7HQ1p2qgEI9BjlLrPr1Uq6rW1gBVM2n9ZgPNamzNHi45n6LF87p',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
  {
    id: '11',
    brand: 'Ford',
    model: 'Ka',
    category: 'X',
    pricePerDay: 96,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEikKHlLUxqLUO8xSuPffGvAIaUwzprxqk3CnI1QNdGY-iKqz67P1O1sndmw0e7PA0OMtivcIiRaIiX8S9CJIKU6geHH-lmxVJ7KV3yQgslKvHrL_t_WJmsgk4zB_YrqNPgbTYzLttqKAZQ346LTrG3QdwebpMnsF4FRob1EL_MC4La0A-A2_GogzV4w4A1n',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
  {
    id: '12',
    brand: 'Volkswagen',
    model: ' Gol',
    category: 'X',
    pricePerDay: 96,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEjRK1LSMchegpiAgTJR3CuPL5v2eP1irHfSa4h0NknJhremaVUDt9JzKvwjGs3CyIAPYGKokrFs8m5b38othrEzEk7Gu2XmN9zgPA4ghKyniAgNU08H4rbJ6QJMYnQIRPOLLjPGYsvWYHyv3uAPb4yaooS_GwZ0c2wS24g_7qRfSZF2zqkCobgxNQiXoIgU',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
  {
    id: '13',
    brand: 'Chevrolet',
    model: ' Onix Joy',
    category: 'X',
    pricePerDay: 96,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEhE8OZ1vRUEUM4zkaJHNf8jMq0O3vlTbR3EjoCmeL_5CnLO7a3LU7G-fS4P-QPw99qqoVPoCrTaEfJ72Pva-kHRHniooCm-nwdo7nbv3QkGyxYC4PGceMyGy_vx_f1vDpwRgOoI4nYMAPLal4cUz3lPfCZFt4oF6CV_9D9TtcjfSFViwLjEcwOiQDgrCyxH',
    description: 'Verifique a disponibilidade.',
    transmission: 'Manual',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '14',
    brand: 'Renault',
    model: 'Sandero',
    category: 'X',
    pricePerDay: 96,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEir_Bhu6lphDxaCkTXN_swQrtM5p4xFhJR6FCYeZKAa3hVpshceYwDYrU7krIJRzI8FuLjVLr6kVi2rwjPG4dP8LiUgLnaN4E1sMqM4nU5X5A7UEasmd6K1fzRocZ1gYRkWY4VZ6XY2rMVRmND1GngUKs7l8EI9CE-CzXtUCnu7DmnAQTdTQyJ8TS0S-qqZ',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
   {
    id: '15',
    brand: 'Fiat',
    model: 'Uno Way',
    category: 'X',
    pricePerDay: 96,
    imageUrl:
      'https://blogger.googleusercontent.com/img/a/AVvXsEjhXcBOIaJTd4x7vUUZmFQ33zWujeGH2ejrIomTjTR55UzmCpINoVfxo_JJGi6fI27PuyFqK94_smfkNpbPZSLikyAnCnGJpUO1dVCe7CYvcAvhSK5RGOS1uVJRhth0E2Bk83zYyw2DWOsi7FfKMxLcgyTiRo4z6kTAXv5qTrM2NKqfH-SCwZRe5a4HOIHM',
    description: 'Verifique a disponibilidade.',
    transmission: 'Automático',
    seats: 5,
    isAvailable: true,
  },
];

const VehicleContext = createContext<VehicleContextType>({
  vehicles: [],
  addVehicle: () => {},
  removeVehicle: () => {},
  toggleAvailability: () => {},
});

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles((prev) => [...prev, vehicle]);
  };

  const removeVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === id
          ? { ...vehicle, isAvailable: !vehicle.isAvailable }
          : vehicle
      )
    );
  };

  const value = useMemo(
    () => ({
      vehicles,
      addVehicle,
      removeVehicle,
      toggleAvailability,
    }),
    [vehicles]
  );

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>;
};

export const useVehicles = () => useContext(VehicleContext);

export default useVehicles;