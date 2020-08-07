import Handlebars from 'handlebars';
import {IRepositoriesList} from '../interfaces/IRepositorieList';

export class RepositoriesListView {
    private tempalate: string | undefined;
    private container: HTMLElement;
    //private data: IRepositoriesList;

    constructor (conteiner: HTMLElement) {
        let tempalte = document.querySelector('#template_repo-list')?.innerHTML;
        if (tempalte) {
            this.tempalate = tempalte
        }

        this.container = conteiner;
    }

    public handleSortList(handler: Function) {
        let searchBtn = document.querySelector('.repo-list-section .actions .sort-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', (event)=> {
                handler();
            })
        }
    }

    public handleSearchRepo(handler: Function) {

    }

    public render(data:IRepositoriesList) {
        this.container.innerHTML = Handlebars.compile(this.tempalate)(data);
    }
}