import dayjs from "dayjs";

const currentYear = dayjs().year();
const dateFormat = "YYYY-MM-DD";

const C_MONTHS_OF_YEARS = {
  JANUARY: {
    label: "ENE",
    value: "01",
    name: "Enero",
    startDate: dayjs(`${currentYear}-01-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-01-31`).format(dateFormat),
  },
  FEBRUARY: {
    label: "FEB",
    value: "02",
    name: "Febrero",
    startDate: dayjs(`${currentYear}-02-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-02-28`).format(dateFormat), // Para años bisiestos, puedes agregar lógica adicional
  },
  MARCH: {
    label: "MAR",
    value: "03",
    name: "Marzo",
    startDate: dayjs(`${currentYear}-03-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-03-31`).format(dateFormat),
  },
  APRIL: {
    label: "ABR",
    value: "04",
    name: "Abril",
    startDate: dayjs(`${currentYear}-04-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-04-30`).format(dateFormat),
  },
  MAY: {
    label: "MAY",
    value: "05",
    name: "Mayo",
    startDate: dayjs(`${currentYear}-05-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-05-31`).format(dateFormat),
  },
  JUNE: {
    label: "JUN",
    value: "06",
    name: "Junio",
    startDate: dayjs(`${currentYear}-06-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-06-30`).format(dateFormat),
  },
  JULY: {
    label: "JUL",
    value: "07",
    name: "Julio",
    startDate: dayjs(`${currentYear}-07-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-07-31`).format(dateFormat),
  },
  AUGUST: {
    label: "AGO",
    value: "08",
    name: "Agosto",
    startDate: dayjs(`${currentYear}-08-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-08-31`).format(dateFormat),
  },
  SEPTEMBER: {
    label: "SEP",
    value: "09",
    name: "Septiembre",
    startDate: dayjs(`${currentYear}-09-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-09-30`).format(dateFormat),
  },
  OCTOBER: {
    label: "OCT",
    value: "10",
    name: "Octubre",
    startDate: dayjs(`${currentYear}-10-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-10-31`).format(dateFormat),
  },
  NOVEMBER: {
    label: "NOV",
    value: "11",
    name: "Noviembre",
    startDate: dayjs(`${currentYear}-11-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-11-30`).format(dateFormat),
  },
  DECEMBER: {
    label: "DIC",
    value: "12",
    name: "Diciembre",
    startDate: dayjs(`${currentYear}-12-01`).format(dateFormat),
    endDate: dayjs(`${currentYear}-12-31`).format(dateFormat),
  },
} as const;

export const A_MONTHS_OF_YEARS = Object.values(C_MONTHS_OF_YEARS);

export const O_MONTHS_YEARS_OBJ = {
  [C_MONTHS_OF_YEARS.JANUARY.label]: C_MONTHS_OF_YEARS.JANUARY,
  [C_MONTHS_OF_YEARS.JANUARY.value]: C_MONTHS_OF_YEARS.JANUARY,
  [C_MONTHS_OF_YEARS.FEBRUARY.label]: C_MONTHS_OF_YEARS.FEBRUARY,
  [C_MONTHS_OF_YEARS.FEBRUARY.value]: C_MONTHS_OF_YEARS.FEBRUARY,
  [C_MONTHS_OF_YEARS.MARCH.label]: C_MONTHS_OF_YEARS.MARCH,
  [C_MONTHS_OF_YEARS.MARCH.value]: C_MONTHS_OF_YEARS.MARCH,
  [C_MONTHS_OF_YEARS.APRIL.label]: C_MONTHS_OF_YEARS.APRIL,
  [C_MONTHS_OF_YEARS.APRIL.value]: C_MONTHS_OF_YEARS.APRIL,
  [C_MONTHS_OF_YEARS.MAY.label]: C_MONTHS_OF_YEARS.MAY,
  [C_MONTHS_OF_YEARS.MAY.value]: C_MONTHS_OF_YEARS.MAY,
  [C_MONTHS_OF_YEARS.JUNE.label]: C_MONTHS_OF_YEARS.JUNE,
  [C_MONTHS_OF_YEARS.JUNE.value]: C_MONTHS_OF_YEARS.JUNE,
  [C_MONTHS_OF_YEARS.JULY.label]: C_MONTHS_OF_YEARS.JULY,
  [C_MONTHS_OF_YEARS.JULY.value]: C_MONTHS_OF_YEARS.JULY,
  [C_MONTHS_OF_YEARS.AUGUST.label]: C_MONTHS_OF_YEARS.AUGUST,
  [C_MONTHS_OF_YEARS.AUGUST.value]: C_MONTHS_OF_YEARS.AUGUST,
  [C_MONTHS_OF_YEARS.SEPTEMBER.label]: C_MONTHS_OF_YEARS.SEPTEMBER,
  [C_MONTHS_OF_YEARS.SEPTEMBER.value]: C_MONTHS_OF_YEARS.SEPTEMBER,
  [C_MONTHS_OF_YEARS.OCTOBER.label]: C_MONTHS_OF_YEARS.OCTOBER,
  [C_MONTHS_OF_YEARS.OCTOBER.value]: C_MONTHS_OF_YEARS.OCTOBER,
  [C_MONTHS_OF_YEARS.NOVEMBER.label]: C_MONTHS_OF_YEARS.NOVEMBER,
  [C_MONTHS_OF_YEARS.NOVEMBER.value]: C_MONTHS_OF_YEARS.NOVEMBER,
  [C_MONTHS_OF_YEARS.DECEMBER.label]: C_MONTHS_OF_YEARS.DECEMBER,
  [C_MONTHS_OF_YEARS.DECEMBER.value]: C_MONTHS_OF_YEARS.DECEMBER,
};

export type TMonthValue =
  (typeof C_MONTHS_OF_YEARS)[keyof typeof C_MONTHS_OF_YEARS]["value"];
