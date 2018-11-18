import { GitApiService } from './services/gitApiService';
import { HttpService } from './services/httpService';

const httpService = new HttpService();
const githubService = new GitApiService(httpService);

githubService.loadUsers('MateWW');

githubService.subscribe((err, data, pending) => console.log(err, data, pending));
