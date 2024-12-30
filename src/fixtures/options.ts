export function defineOptions<
  InstanceInput extends unknown[] = [],
  Instance = never,
>() {
  return function resolveOptions<Id extends OptionId>(
    optionsMap:
      | FullOptionsInput<Id, InstanceInput, Instance>
      | SimpleOptionsInput<Id>,
  ): OptionsDefinition<Id, InstanceInput, Instance> {
    const ids = Object.keys(optionsMap) as Id[];
    const list = ids.map((id) => {
      const v = optionsMap[id];
      return {
        id,
        label: typeof v === "string" ? v : v.label,
      };
    });

    return {
      list,
      ids,
      create(id, ...args): Instance {
        const option = optionsMap[id];
        if (typeof option === "string") {
          throw new Error(`Simple option maps have no create function`);
        }
        return option.create(...args);
      },
      parseId(str) {
        if (!ids.includes(str as Id)) {
          throw new Error(`Unknown option ID: ${str}`);
        }
        return str as Id;
      },
    };
  };
}

export type FullOptionsInput<
  Id extends OptionId,
  InstanceInput extends unknown[],
  Instance,
> = Record<
  Id,
  { label: string; create: (...input: InstanceInput) => Instance }
>;

export type SimpleOptionsInput<Id extends OptionId> = Record<Id, string>;

export interface OptionsDefinition<
  Id extends OptionId,
  InstanceInput extends unknown[],
  Instance,
> {
  list: ReadonlyArray<Option<Id>>;
  ids: Id[];
  create(id: Id, ...args: InstanceInput): Instance;
  parseId(str: string): Id;
}

export interface Option<Id extends OptionId> {
  label: string;
  id: Id;
}

export type OptionId = string | number;
