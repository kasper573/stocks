export const alertDirections = {
  up: {
    label: "up by",
    isMatch: (actual, target) => actual >= Math.abs(target),
  },
  down: {
    label: "down by",
    isMatch: (actual, target) => actual <= -Math.abs(target),
  },
  both: {
    label: "up or down by",
    isMatch: (actual, target): boolean =>
      alertDirections.up.isMatch(actual, target) ||
      alertDirections.down.isMatch(actual, target),
  },
} satisfies Record<
  string,
  {
    label: string;
    isMatch: (actual: number, target: number) => boolean;
  }
>;

export type AlertDirection = keyof typeof alertDirections;
