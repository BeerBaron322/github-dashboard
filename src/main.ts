import './assets/scss/main.scss';
import {RepositoriesModel} from './app/model/repositories.model';
import {RepositoriesListView} from './app/views/repositoriesList.view'

let cont = document.querySelector("#root") as HTMLElement;
let a = new RepositoriesModel();
let b = new RepositoriesListView(cont);

a.getRepoByName('jquery').then((data:any) => {
    console.log('all data: ',data);
    b.render(data);
});
a.getRepoByName('jquery', 1).then((data:any) => {
    console.log('first page:', data);
});
a.getRepoByName('jquery', 2).then((data:any) => {
    console.log('second page:', data);
});

a.getRepoByStars().then((data:any) => {
    console.log(data);
});


