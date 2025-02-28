/* eslint-disable @typescript-eslint/no-unused-expressions */
type Props = {
  residentNames: string[];
  onChange: (e: string) => void;
};

function FilterDropdown(props: Props) {
  const onChangeHandle = (e) => {
    props.onChange && props.onChange(e.target.value);
  };
  return (
    <select className="border bg-white p-2" onChange={onChangeHandle}>
      <option value="">Filter by Resident</option>
      {props.residentNames.length > 0 &&
        props.residentNames.map((name, index) => (
          <option value={name} key={index}>
            {name}
          </option>
        ))}
    </select>
  );
}

export default FilterDropdown;
