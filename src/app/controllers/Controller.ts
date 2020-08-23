import {RepositoriesListView} from '../views/repositoriesList.view';
import {RepositoriesModel} from '../model/repositories.model';
import {Paginator} from '../views/Paginator';

export class Controller {
    currentSearchName: string | null;
    currentPageIndex: string | null;
    paginator: Paginator;
    storage:Storage = window.localStorage;

    constructor(
        private repoListView:RepositoriesListView,
        private repoModel: RepositoriesModel,
    ) {
        this.repoListView.bindSearchChange(this.handleSearchChange.bind(this));
        this.repoListView.bindSearchRepo(this.handleSearchRepo.bind(this));
        this.repoListView.bindSortList(this.handleSortList.bind(this));

        this.paginator = new Paginator();
        this.paginator.bindPageChange(this.handlePageChange.bind(this));

        this.currentSearchName = this.storage.getItem('name');
        this.currentPageIndex = this.storage.getItem('pageIndex');
        
        if (this.currentSearchName !== null) {
            if (this.currentPageIndex !== null) {
                this.repoModel.getRepoByName(this.currentSearchName, {
                    page: Number(this.currentPageIndex),
                }).then((data) => {
                    this.repoListView.render(data);
                    this.paginator.initByCurrentPage(Number(this.currentPageIndex), data.total_count);
                });
            } else {
                this.repoModel.getRepoByName(this.currentSearchName).then((data) => {
                    this.repoListView.render(data);
                    this.paginator.init(data.total_count);
                });
            }
        } else {
            this.repoModel.getRepoByStars().then(data => {
                this.repoListView.render(data);
                this.paginator.init(data.total_count);
            });
        }
    }

    private handleSearchRepo(name: string) {
        this.repoModel.getRepoByName(name).then(data => {
            this.repoListView.render(data);
            this.paginator.init(data.total_count);
        })
    }

    private handleSortList() {
        if (this.currentSearchName !== null) {
            if (this.currentPageIndex !== null) {
                this.repoModel.getRepoByName(this.currentSearchName, {
                    sort: 'stars',
                    page: Number(this.currentPageIndex),
                }).then(data => {
                    this.repoListView.render(data);
                });
            } else {
                this.repoModel.getRepoByName(this.currentSearchName, {
                    sort: 'stars',
                }).then(data => {
                    this.repoListView.render(data);
                });
            }
        }
    }

    private handleSearchChange(name: string) {
        this.storage.setItem('name', name);
        this.currentSearchName = this.storage.getItem('name');
    }

    private handlePageChange(pageIndex: number){
        this.storage.setItem('pageIndex', String(pageIndex));
        this.currentPageIndex = this.storage.getItem('pageIndex');
        if (this.currentSearchName !== null) {
            this.repoModel.getRepoByName(this.currentSearchName, {
                page: pageIndex,
            }).then(data => {
                this.repoListView.render(data);
            })
        }
    }

}