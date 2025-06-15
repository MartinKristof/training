import { memo } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = memo<SearchInputProps>(({ value, onChange }) => {
  console.log('SearchInput render (memoized)');

  return (
    <input
      type="text"
      value={value}
      onChange={event => onChange(event.target.value)}
      placeholder="Search users... (memoized)"
      className="w-full p-2 border rounded"
    />
  );
});

SearchInput.displayName = 'SearchInput';
