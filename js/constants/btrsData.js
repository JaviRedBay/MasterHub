/**
 * Datos y Tablas del Sistema BTRS (Breiel Three-Role System)
 * Basado en las reglas oficiales de disponibilidad, modificadores de tienda,
 * condición de objetos, población y regateo.
 */

export const SHOP_MODIFIERS = [
  { id: 'vecindario', name: 'Tienda de barrio', rollMod: 0, pricePercentFixed: 0.0, description: 'Establecimiento local común, precios y oferta estándar (0%).' },
  { id: 'gremio', name: 'Tienda de gremio', rollMod: 1, pricePercentFixed: 0.10, description: 'Comercio respaldado por gremios comerciales (+10% precio).' },
  { id: 'lujo', name: 'Tienda de lujo', rollMod: 2, pricePercentFixed: 0.20, description: 'Boutique de alta gama para nobles y mecenas (+20% precio).' },
  { id: 'negro', name: 'Mercado negro', rollMod: 4, pricePercentFixed: 0.40, description: 'Tráfico clandestino de reliquias raras y contrabandeadas (+40% precio).' },
  { id: 'especializado', name: 'Mercado especializado', rollMod: -1, pricePercentFixed: -0.10, description: 'Bazar temático donde los objetos del tipo son más accesibles (-10% precio).' },
];

export const POPULATION_MODIFIERS = [
  { id: 'aldea', name: 'Aldea (Hamlet)', rollMod: 2, priceMod: 2, pricePercentFixed: 0.20, description: 'Asentamiento pequeño con recursos muy limitados. Los objetos son escasos y caros (+20% precio).' },
  { id: 'pueblo', name: 'Pueblo (Town)', rollMod: 1, priceMod: 1, pricePercentFixed: 0.10, description: 'Población modesta con comercio regular y artesanos básicos (+10% precio).' },
  { id: 'ciudad_peq', name: 'Ciudad pequeña (Small City)', rollMod: 0, priceMod: 0, pricePercentFixed: 0.00, description: 'Centro comercial regional con acceso a suministros estándar (precio base).' },
  { id: 'ciudad_gra', name: 'Ciudad grande (Large City)', rollMod: -1, priceMod: -1, pricePercentFixed: -0.10, description: 'Gran urbe con alta competencia entre comerciantes y gran oferta (-10% precio).' },
  { id: 'metropolis', name: 'Metrópolis (Metropolis)', rollMod: -2, priceMod: -2, pricePercentFixed: -0.20, description: 'Capital o megalópolis comercial con los mejores precios y máxima variedad (-20% precio).' },
];

export const RARITY_MODIFIERS = [
  { id: 'comun', name: 'Común', rollMod: 0, priceMod: 0, color: '#6c757d' },
  { id: 'uncomun', name: 'Poco común', rollMod: 1, priceMod: 1, color: '#198754' },
  { id: 'raro', name: 'Raro', rollMod: 2, priceMod: 2, color: '#0d6efd' },
  { id: 'muy_raro', name: 'Muy raro', rollMod: 3, priceMod: 3, color: '#6f42c1' },
  { id: 'legendario', name: 'Legendario', rollMod: 4, priceMod: 4, color: '#fd7e14' },
];

export const CONDITION_FACTORS = [
  { dieRoll: 1, name: 'Dañado', rollMod: -4, pricePercentFixed: -0.40, description: 'Presenta fisuras, muescas o desgaste mágico (-40% precio).' },
  { dieRoll: 2, name: 'Vendedor se quiere deshacer del objeto', rollMod: -2, pricePercentFixed: -0.20, description: 'Liquidación por inventario o urgencia de oro (-20% precio).' },
  { dieRoll: 3, name: 'Materiales más caros', rollMod: 1, pricePercentFixed: 0.10, description: 'Grabados finos, plata o gemas ornamentales (+10% precio).' },
  { dieRoll: 4, name: 'Objeto abundante', rollMod: -2, pricePercentFixed: -0.20, description: 'Excedente de oferta en la región (-20% precio).' },
  { dieRoll: 5, name: 'Objeto escaso', rollMod: 2, pricePercentFixed: 0.20, description: 'Alta demanda y poca disponibilidad (+20% precio).' },
  { dieRoll: 6, name: 'Reservado a otro cliente', rollMod: 2, pricePercentFixed: 0.20, description: 'El mercader exige un sobreprecio para anular el encargo previo (+20% precio).' },
];

// Requisitos de disponibilidad (CD de tirada 1d20 + rollModTienda) para cada población y rareza
export const AVAILABILITY_THRESHOLDS = {
  // Aldea
  'aldea_comun': 8,
  'aldea_uncomun': 12,
  'aldea_raro': 16,
  'aldea_muy_raro': 20,
  'aldea_legendario': 21, // Casi imposible
  
  // Pueblo
  'pueblo_comun': 6,
  'pueblo_uncomun': 10,
  'pueblo_raro': 14,
  'pueblo_muy_raro': 18,
  'pueblo_legendario': 20,
  
  // Ciudad pequeña
  'ciudad_peq_comun': 5,
  'ciudad_peq_uncomun': 9,
  'ciudad_peq_raro': 13,
  'ciudad_peq_muy_raro': 17,
  'ciudad_peq_legendario': 19,
  
  // Ciudad grande
  'ciudad_gra_comun': 4,
  'ciudad_gra_uncomun': 8,
  'ciudad_gra_raro': 12,
  'ciudad_gra_muy_raro': 16,
  'ciudad_gra_legendario': 18,
  
  // Metrópolis
  'metropolis_comun': 3,
  'metropolis_uncomun': 7,
  'metropolis_raro': 11,
  'metropolis_muy_raro': 15,
  'metropolis_legendario': 17,
};

// Tablas de Precios según Rareza y resultado de Tirada Final BTRS (Canónicas según BTRS.pdf)
export const PRICE_TABLES = {
  'comun': [
    { maxRoll: 4, price: 50, label: '50 p.o.' },
    { maxRoll: 8, price: 60, label: '60 p.o.' },
    { maxRoll: 12, price: 75, label: '75 p.o.' },
    { maxRoll: 16, price: 90, label: '90 p.o.' },
    { maxRoll: 999, price: 100, label: '100 p.o.' },
  ],
  'uncomun': [
    { maxRoll: 4, price: 100, label: '100 p.o.' },
    { maxRoll: 8, price: 200, label: '200 p.o.' },
    { maxRoll: 12, price: 300, label: '300 p.o.' },
    { maxRoll: 16, price: 400, label: '400 p.o.' },
    { maxRoll: 999, price: 500, label: '500 p.o.' },
  ],
  'raro': [
    { maxRoll: 2, price: 500, label: '500 p.o.' },
    { maxRoll: 6, price: 1500, label: '1.500 p.o.' },
    { maxRoll: 10, price: 2500, label: '2.500 p.o.' },
    { maxRoll: 15, price: 3500, label: '3.500 p.o.' },
    { maxRoll: 19, price: 4500, label: '4.500 p.o.' },
    { maxRoll: 999, price: 5000, label: '5.000 p.o.' },
  ],
  'muy_raro': [
    { maxRoll: 2, price: 5000, label: '5.000 p.o.' },
    { maxRoll: 6, price: 15000, label: '15.000 p.o.' },
    { maxRoll: 10, price: 25000, label: '25.000 p.o.' },
    { maxRoll: 15, price: 35000, label: '35.000 p.o.' },
    { maxRoll: 19, price: 45000, label: '45.000 p.o.' },
    { maxRoll: 999, price: 50000, label: '50.000 p.o.' },
  ],
  'legendario': [
    { maxRoll: 2, price: 55000, label: '55.000 p.o.' },
    { maxRoll: 6, price: 75000, label: '75.000 p.o.' },
    { maxRoll: 10, price: 120000, label: '120.000 p.o.' },
    { maxRoll: 15, price: 175000, label: '175.000 p.o.' },
    { maxRoll: 19, price: 225000, label: '225.000 p.o.' },
    { maxRoll: 999, price: 250000, label: '250.000 p.o.' },
  ],
};

// Tabla de Regateo (Bargaining) según Tirada de Carisma / Persuasión (Tabla 10 en BTRS.pdf)
export const BARGAIN_RULES = [
  { maxRoll: 5, discountPercent: -0.10, priceMultiplier: 1.10, label: '+10% recargo (Fallo en la negociación, el mercader desconfía)' },
  { maxRoll: 10, discountPercent: 0.00, priceMultiplier: 1.00, label: '0% sin cambios (Precio fijado sin variación)' },
  { maxRoll: 15, discountPercent: 0.05, priceMultiplier: 0.95, label: '-5% descuento (Cortesía y trato amable)' },
  { maxRoll: 20, discountPercent: 0.10, priceMultiplier: 0.90, label: '-10% descuento (Buena conversación y argumento comercial)' },
  { maxRoll: 25, discountPercent: 0.15, priceMultiplier: 0.85, label: '-15% descuento (Negociación muy convincente)' },
  { maxRoll: 999, discountPercent: 0.20, priceMultiplier: 0.80, label: '-20% descuento (Maestría en regateo, trato excepcional)' },
];
