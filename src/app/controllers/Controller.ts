import {RepositoriesListView} from '../views/repositoriesList.view';
import {RepositoriesModel} from '../model/repositories.model';

export class Controller {
    constructor(
        private repoListView:RepositoriesListView,
        private repoModel: RepositoriesModel,
    ) {
        this.repoModel.getRepoByStars().then(data => {
            this.repoListView.render(data);
            this.repoListView.bindSearchRepo(this.handleSearchRepo.bind(this));
            this.repoListView.bindSortList(this.handleSortList.bind(this));
    });
}

    handleSearchRepo (name: string) {
        this.repoModel.getRepoByName(name).then(data => {
            this.repoListView.render(data);
        })
    }

    handleSortList (name: string, page: number) {
        this.repoModel.getRepoByName(name, {
            sort: 'stars',
        }).then(data => {
            this.repoListView.render(data);
        });
    }
}