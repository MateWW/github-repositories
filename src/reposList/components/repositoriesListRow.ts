import { h } from 'maquette';

import { formatDate } from '../helpers/formatDate';
import { emptyRepository, GithubRepository } from '../model/GithubRepository';

const getCorrectListElement = (
    headerRow: boolean,
    value: string | number = null,
    headerName: string = null,
    keepTogether: boolean = false,
) => {
    const tag = headerRow ? 'th' : 'td';
    const className = `repositories-table-${headerRow ? 'header' : 'element'}${keepTogether ? ' keep-together' : ''}`;
    return h(tag, { class: className }, [headerRow ? headerName : `${value}`]);
};

export const repositoriesListRow = (repository: GithubRepository | null, headerRow = false) => {
    const { name, description, updated_at, downloads_url, id } = repository || emptyRepository;
    const className = `repositories-table-row${headerRow ? ' repositories-table-header-row' : ''}`;
    return h('tr', { key: `key_${id}`, class: className }, [
        getCorrectListElement(headerRow, name, 'Name'),
        getCorrectListElement(headerRow, description || 'No description', 'Description'),
        getCorrectListElement(headerRow, formatDate(updated_at), 'Last update', true),
        getCorrectListElement(headerRow, downloads_url, 'Download link'),
    ]);
};
