import { h } from 'maquette';

import { formatDate } from '../helpers/formatDate';
import { emptyRepository, GithubRepository } from '../model/GithubRepository';

const getCorrectListElement = (headerRow: boolean, value: string | number = null, headerName: string = null) => {
    const tag = headerRow ? 'th' : 'td';
    const className = `repositories-table-${headerRow ? 'header' : 'element'}`;
    return h(tag, { class: className }, [headerRow ? headerName : `${value}`]);
};

export const repositoriesListRow = (repository: GithubRepository | null, headerRow = false) => {
    const { name, description, updated_at, downloads_url, id } = repository || emptyRepository;
    return h('tr', { key: `${id}`, class: 'repositories-table-row' }, [
        getCorrectListElement(headerRow, name, 'Name'),
        getCorrectListElement(headerRow, description || 'No description', 'Description'),
        getCorrectListElement(headerRow, formatDate(updated_at), 'Last update'),
        getCorrectListElement(headerRow, downloads_url, 'Download link'),
    ]);
};
