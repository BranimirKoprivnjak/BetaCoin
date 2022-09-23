export const colors = {
  GREEN: {
    base: 'rgba(111, 230, 169, 1)',
    opaque: 'rgba(111, 230, 169, 0.5)',
    gradient: {
      start: 'rgba(19, 54, 50, 0.1)',
      end: 'rgba(19, 54, 50, 0.5)',
    },
  },
  RED: {
    base: 'rgba(212, 75, 83, 1)',
    opaque: 'rgba(212, 75, 83, 0.5)',
    gradient: {
      start: 'rgba(105, 42, 48, 0.1)',
      end: 'rgba(105, 42, 48, 0.5)',
    },
  },
  GRAY: {
    light: 'rgba(101, 104, 116, 1)',
    dark: 'rgba(58, 65, 87, 1)',
  },
  BLACK: {
    black: 'rgba(0, 0, 0, 1)',
  },
  PURPLE: {
    light: 'rgba(114, 123, 158, 1)',
    dark: 'rgba(41, 41, 67, 1)',
    glow: 'rgba(139, 111, 251, 1)',
  },
  BLUE: {
    light: 'rgba(27, 30, 41, 1)',
    dark: 'rgba(16, 18, 24, 1)',
  },
};

export const hourlyFormat: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
};

export const monthlyFormat: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  month: 'short',
  day: 'numeric',
};

export const yearlyFormat: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};
