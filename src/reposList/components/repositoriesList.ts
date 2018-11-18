import { h } from 'maquette';

import { GithubRepository } from '../model/GithubRepository';
import { repositoriesListRow } from './repositoriesListRow';

export const repositoriesList = (data: GithubRepository[]) => {
    return h('table', { class: 'repositories-table' }, [
        repositoriesListRow(null, true),
        ...data.map(repository => repositoriesListRow(repository)),
    ]);
};
