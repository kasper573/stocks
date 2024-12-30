const gte = (actual: number, target: number): boolean => actual >= target;
const lte = (actual: number, target: number): boolean => actual <= target;

export const alertDirections = {
  up: {
    label: "up by",
    isMatch: gte,
  },
  down: {
    label: "down by",
    isMatch: lte,
  },
  both: {
    label: "up or down by",
    isMatch: (actual, target): boolean => {
      return lte(Math.abs(actual), target) || gte(Math.abs(actual), target);
    },
  },
} satisfies Record<
  string,
  {
    label: string;
    isMatch: (actual: number, target: number) => boolean;
  }
>;

export type AlertDirection = keyof typeof alertDirections;
