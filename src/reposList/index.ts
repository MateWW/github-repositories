import { createProjector } from 'maquette';

import { repositoriesContainer } from './components/repositoriesContainer';
import { GitApiService } from './services/gitApiService';
import { HttpService } from './services/httpService';

const projector = createProjector();

const httpService = new HttpService();

document.querySelectorAll<HTMLElement>('repos').forEach(reposNode => {
    const githubService = new GitApiService(httpService);
    const { user, update: updatedAt } = reposNode.dataset;
    const onReRender = () => projector.scheduleRender();
    projector.append(reposNode, repositoriesContainer({ user, updatedAt, service: githubService, onReRender }));
});
