export const C_WEEKS_OF_YEAR = {
  MONDAY: { label: 'LUN', value: '01' },
  TUESDAY: { label: 'MAR', value: '02' },
  WEDNESDAY: { label: 'MIÉ', value: '03' },
  THURSDAY: { label: 'JUE', value: '04' },
  FRIDAY: { label: 'VIE', value: '05' },
  SATURDAY: { label: 'SÁB', value: '06' },
  SUNDAY: { label: 'DOM', value: '07' },
};

export const A_WEEKS_OF_YEAR = Object.values(C_WEEKS_OF_YEAR);

export const O_WEEKS_YEARS_OBJ = {
  [C_WEEKS_OF_YEAR.MONDAY.label]: C_WEEKS_OF_YEAR.MONDAY,
  [C_WEEKS_OF_YEAR.MONDAY.value]: C_WEEKS_OF_YEAR.MONDAY,
  [C_WEEKS_OF_YEAR.TUESDAY.label]: C_WEEKS_OF_YEAR.TUESDAY,
  [C_WEEKS_OF_YEAR.TUESDAY.value]: C_WEEKS_OF_YEAR.TUESDAY,
  [C_WEEKS_OF_YEAR.WEDNESDAY.label]: C_WEEKS_OF_YEAR.WEDNESDAY,
  [C_WEEKS_OF_YEAR.WEDNESDAY.value]: C_WEEKS_OF_YEAR.WEDNESDAY,
  [C_WEEKS_OF_YEAR.THURSDAY.label]: C_WEEKS_OF_YEAR.THURSDAY,
  [C_WEEKS_OF_YEAR.THURSDAY.value]: C_WEEKS_OF_YEAR.THURSDAY,
  [C_WEEKS_OF_YEAR.FRIDAY.label]: C_WEEKS_OF_YEAR.FRIDAY,
  [C_WEEKS_OF_YEAR.FRIDAY.value]: C_WEEKS_OF_YEAR.FRIDAY,
  [C_WEEKS_OF_YEAR.SATURDAY.label]: C_WEEKS_OF_YEAR.SATURDAY,
  [C_WEEKS_OF_YEAR.SATURDAY.value]: C_WEEKS_OF_YEAR.SATURDAY,
  [C_WEEKS_OF_YEAR.SUNDAY.label]: C_WEEKS_OF_YEAR.SUNDAY,
  [C_WEEKS_OF_YEAR.SUNDAY.value]: C_WEEKS_OF_YEAR.SUNDAY,
};
