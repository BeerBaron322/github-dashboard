import './assets/scss/main.scss';
import {RepositoriesModel} from './app/model/repositories.model';
import {RepositoriesListView} from './app/views/repositoriesList.view'
import {Controller} from './app/controllers/Controller'

let cont = document.querySelector("#root") as HTMLElement;
let controller = new Controller(new RepositoriesListView(cont), new RepositoriesModel);


