export const advancedFunctions = {
  // 電気工学
  '電圧/電流計算': (voltage: number, current: number) => ({ result: voltage / current, unit: 'Ω' }),
  '電力計算': (voltage: number, current: number) => ({ result: voltage * current, unit: 'W' }),
  '静電容量': (frequency: number, capacitance: number) => ({ 
    result: 1 / (2 * Math.PI * frequency * capacitance), 
    unit: 'Ω' 
  }),

  // 機械工学
  '応力計算': (force: number, area: number) => ({ result: force / area, unit: 'Pa' }),
  'ひずみ計算': (deltaL: number, originalL: number) => ({ result: deltaL / originalL, unit: '' }),
  '慣性モーメント': (base: number, height: number) => ({ 
    result: (base * Math.pow(height, 3)) / 12, 
    unit: 'm⁴' 
  }),

  // 熱力学
  '熱エネルギー': (mass: number, specificHeat: number, deltaT: number) => ({ 
    result: mass * specificHeat * deltaT, 
    unit: 'J' 
  }),
  '熱膨張': (length: number, coefficient: number, deltaT: number) => ({ 
    result: length * coefficient * deltaT, 
    unit: 'm' 
  }),

  // 流体力学
  'レイノルズ数': (velocity: number, length: number, kinematicViscosity: number) => ({ 
    result: (velocity * length) / kinematicViscosity, 
    unit: '' 
  })
};