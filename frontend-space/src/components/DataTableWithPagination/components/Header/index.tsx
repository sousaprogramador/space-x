import Icon from '../../../ui/Icon';
import { useEffect, useState } from 'react';

import {
  InputSearch,
  IconContainer,
  HeaderContainer,
  InputSearchContainer,
} from './styles';

interface Props {
  handleSearch: (value: string) => void;
}

export default function Header({ handleSearch }: Props) {
  const [search, setSearch] = useState('');

  const handleChange = (value: string) => {
    setSearch(value);

    if (!value.length) handleSearch('');
  };

  const handleSearchClick = () => {
    if (search.trim().length) handleSearch(search);
  };

  const queryParams = new URLSearchParams(window.location.search);
  const queryValue = queryParams.get('q');

  useEffect(() => {
    if (!search.length && !queryValue) return;

    window.history.pushState(null, '', `?q=${search}`);
  }, [search]);

  useEffect(() => {
    if (!queryValue) return;

    handleChange(queryValue);
    handleSearch(queryValue);
  }, []);

  return (
    <HeaderContainer>
      <strong>Registros de lançamento</strong>

      <InputSearchContainer>
        <InputSearch
          name="search"
          type="search"
          value={search}
          placeholder="Pesquisar..."
          onChange={({ target: { value } }) => {
            handleChange(value);
          }}
        />

        <IconContainer
          disabled={!search.trim().length}
          onClick={handleSearchClick}
        >
          <Icon name="search" size={1.5} />
        </IconContainer>
      </InputSearchContainer>
    </HeaderContainer>
  );
}
