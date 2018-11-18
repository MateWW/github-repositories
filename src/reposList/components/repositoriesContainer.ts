import { h } from 'maquette';

import { formatDate } from '../helpers/formatDate';
import { GitApiService } from '../services/gitApiService';
import { repositoriesList } from './repositoriesList';

export interface RepositoriesListProps {
    user: string;
    updatedAt: string;
    service: GitApiService;
    onReRender: () => void;
}

export const repositoriesContainer = ({ user, updatedAt, service, onReRender }: RepositoriesListProps) => {
    service.loadUsers(user, new Date(updatedAt));
    service.subscribe(() => onReRender());
    return () => {
        const { error, pending, data } = service.getState();
        return h('div', { class: 'repositories-box' }, [
            h('h1', { class: 'title' }, [`Repositories belonging to ${user}`]),
            h('p', { class: 'title' }, [`With last activity after ${formatDate(updatedAt)}`]),
            pending && h('div', { class: 'loader' }),
            error && h('p', { class: 'alert' }, [error]),
            repositoriesList(data),
        ]);
    };
};
