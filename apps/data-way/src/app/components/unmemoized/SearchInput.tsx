import { FC } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  console.log('SearchInput render (unmemoized)');

  return (
    <input
      type="text"
      value={value}
      onChange={event => onChange(event.target.value)}
      placeholder="Search users... (unmemoized)"
      className="w-full p-2 border rounded"
    />
  );
};
