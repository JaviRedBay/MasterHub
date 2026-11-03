/**
 * Datos y Tablas del Sistema BTRS (Breiel Three-Role System)
 * Basado en las reglas oficiales de disponibilidad, modificadores de tienda,
 * condición de objetos, población y regateo.
 */

export const SHOP_MODIFIERS = [
  { id: 'vecindario', name: 'Tienda de barrio', rollMod: 0, pricePercentFixed: 0.0, description: 'Establecimiento local común, precios y oferta estándar.' },
  { id: 'gremio', name: 'Tienda de gremio', rollMod: 1, pricePercentFixed: 0.10, description: 'Comercio respaldado por gremios comerciales (+10% precio fijo).' },
  { id: 'lujo', name: 'Tienda de lujo', rollMod: 2, pricePercentFixed: 0.20, description: 'Boutique de alta gama para nobles y mecenas (+20% precio fijo).' },
  { id: 'negro', name: 'Mercado negro', rollMod: 4, pricePercentFixed: 0.40, description: 'Tráfico clandestino de reliquias raras y contrabandeadas (+40% precio fijo).' },
  { id: 'especializado', name: 'Mercado especializado', rollMod: -1, pricePercentFixed: -0.10, description: 'Bazar temático donde los objetos del tipo son más accesibles (-10% precio fijo).' },
];

export const POPULATION_MODIFIERS = [
  { id: 'aldea', name: 'Aldea (Hamlet)', priceMod: 2, description: 'Asentamiento pequeño con recursos muy limitados. Los objetos son escasos y caros.' },
  { id: 'pueblo', name: 'Pueblo (Town)', priceMod: 1, description: 'Población modesta con comercio regular y artesanos básicos.' },
  { id: 'ciudad_peq', name: 'Ciudad pequeña (Small City)', priceMod: 0, description: 'Centro comercial regional con acceso a suministros estándar.' },
  { id: 'ciudad_gra', name: 'Ciudad grande (Large City)', priceMod: -1, description: 'Gran urbe con alta competencia entre comerciantes y gran oferta.' },
  { id: 'metropolis', name: 'Metrópolis (Metropolis)', priceMod: -2, description: 'Capital o megalópolis comercial con los mejores precios y máxima variedad.' },
];

export const RARITY_MODIFIERS = [
  { id: 'comun', name: 'Común', priceMod: 0, color: '#6c757d' },
  { id: 'uncomun', name: 'Poco común', priceMod: 1, color: '#198754' },
  { id: 'raro', name: 'Raro', priceMod: 2, color: '#0d6efd' },
  { id: 'muy_raro', name: 'Muy raro', priceMod: 3, color: '#6f42c1' },
  { id: 'legendario', name: 'Legendario', priceMod: 4, color: '#fd7e14' },
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

// Tablas de Precios según Rareza y resultado de Tirada Final BTRS
export const PRICE_TABLES = {
  'comun': [
    { maxRoll: 2, price: 50, label: '50 p.o.' },
    { maxRoll: 6, price: 75, label: '75 p.o.' },
    { maxRoll: 10, price: 100, label: '100 p.o.' },
    { maxRoll: 15, price: 150, label: '150 p.o.' },
    { maxRoll: 19, price: 200, label: '200 p.o.' },
    { maxRoll: 999, price: 300, label: '300 p.o.' },
  ],
  'uncomun': [
    { maxRoll: 2, price: 100, label: '100 p.o.' },
    { maxRoll: 6, price: 250, label: '250 p.o.' },
    { maxRoll: 10, price: 500, label: '500 p.o.' },
    { maxRoll: 15, price: 750, label: '750 p.o.' },
    { maxRoll: 19, price: 1000, label: '1.000 p.o.' },
    { maxRoll: 999, price: 1500, label: '1.500 p.o.' },
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
    { maxRoll: 6, price: 10000, label: '10.000 p.o.' },
    { maxRoll: 10, price: 15000, label: '15.000 p.o.' },
    { maxRoll: 15, price: 25000, label: '25.000 p.o.' },
    { maxRoll: 19, price: 40000, label: '40.000 p.o.' },
    { maxRoll: 999, price: 50000, label: '50.000 p.o.' },
  ],
  'legendario': [
    { maxRoll: 2, price: 50000, label: '50.000 p.o.' },
    { maxRoll: 6, price: 100000, label: '100.000 p.o.' },
    { maxRoll: 10, price: 150000, label: '150.000 p.o.' },
    { maxRoll: 15, price: 250000, label: '250.000 p.o.' },
    { maxRoll: 19, price: 400000, label: '400.000 p.o.' },
    { maxRoll: 999, price: 500000, label: '500.000 p.o.' },
  ],
};

// Tabla de Regateo (Bargaining) según Tirada de Carisma / Persuasión
export const BARGAIN_RULES = [
  { maxRoll: 5, discountPercent: 0.20, label: '+20% recargo (Fallo estrepitoso, el mercader se ofende)' },
  { maxRoll: 9, discountPercent: 0.10, label: '+10% recargo (Negociación torpe, desconfianza)' },
  { maxRoll: 14, discountPercent: 0.00, label: '0% sin cambios (Precio fijado sin variación)' },
  { maxRoll: 18, discountPercent: -0.10, label: '-10% descuento (Buena conversación y cortesía)' },
  { maxRoll: 20, discountPercent: -0.15, label: '-15% descuento (Argumento comercial convincente)' },
  { maxRoll: 999, discountPercent: -0.20, label: '-20% descuento (Maestría en regateo, trato excepcional)' },
];
