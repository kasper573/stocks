import { OptionId, OptionsDefinition } from "../fixtures/options";

export function OptionSelect<
  Id extends OptionId,
  InstanceInput extends unknown[],
  Instance,
>({
  value,
  options,
  onChange,
}: {
  options: OptionsDefinition<Id, InstanceInput, Instance>;
  value: Id;
  onChange: (value: Id) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(options.parseId(e.currentTarget.value))}
    >
      {options.list.map(({ id, label }) => (
        <option key={id} value={id}>
          {label}
        </option>
      ))}
    </select>
  );
}
