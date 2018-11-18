import { GithubRepository } from '../model/GithubRepository';
import { HttpService } from './httpService';

type SubscriptionFn = (err: string, data: GithubRepository[], pending: boolean) => void;

export class GitApiService {
    private apiUrl = 'https://api.github.com';

    private data: GithubRepository[] = [];
    private pending = false;
    private error = '';
    private subscribers: SubscriptionFn[] = [];

    constructor(private http: HttpService) {}

    public subscribe(fn: SubscriptionFn): void {
        fn(this.error, this.data, this.pending);
        this.subscribers = [...this.subscribers, fn];
    }

    public loadUsers(user: string): void {
        this.setPending(true);
        this.http
            .get<GithubRepository[]>(`${this.apiUrl}/users/${user}/repos`)
            .then(repositories => this.setRepositories(repositories))
            .catch(err => this.parseError(err));
    }

    private parseError(err: Response): void {
        switch (err.status) {
            case 404:
                return this.setError(`User doesn't exist`);
            default:
                return this.setError('Something went wrong while downloading');
        }
    }

    private setRepositories(data: GithubRepository[]): void {
        this.data = data;
        this.error = '';
        this.setPending(false);
    }

    private setError(message: string): void {
        this.error = message;
        this.data = [];
        this.setPending(false);
    }

    private setPending(status: boolean): void {
        this.pending = status;
        this.callSubscribers();
    }

    private callSubscribers(): void {
        this.subscribers.forEach(subscribeFn => subscribeFn(this.error, this.data, this.pending));
    }
}
