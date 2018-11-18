import { GithubRepository } from './GithubRepository';

export interface GitApiState {
    error: string;
    data: GithubRepository[];
    pending: boolean;
}

export function createGitApiState(error: string, data: GithubRepository[], pending: boolean): GitApiState {
    return {
        error,
        data,
        pending,
    };
}
