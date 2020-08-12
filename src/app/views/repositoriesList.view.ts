import Handlebars from 'handlebars';
import {IRepositoriesList} from '../interfaces/IRepositorieList';

export class RepositoriesListView {
    private tempalate: string | undefined;
    private container: HTMLElement;
    private name: string = '';

    constructor (conteiner: HTMLElement) {
        let tempalte = document.querySelector('#template_repo-list')?.innerHTML;
        if (tempalte) {
            this.tempalate = tempalte
        }

        this.container = conteiner;
    }

    public bindSortList(handler: Function) {
        let searchBtn = document.querySelector('.actions .sort-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', (event)=> {
                handler(this.name);
            })
        }
    }

    public bindSearchRepo(handler: Function) {
        let searchInput:HTMLInputElement | null = document.querySelector('.actions .search-input');
        if (searchInput !== null) {
            searchInput.addEventListener('keyup', (event:KeyboardEvent) => {
                if (event.key === 'Enter') {
                    let value = searchInput?.value;
                    if (value) {
                        this.name = value;
                        handler(this.name);
                    }
                }
            });
        }
    }

    public render(data:IRepositoriesList) {
        this.container.innerHTML = Handlebars.compile(this.tempalate)(data);
    }
}