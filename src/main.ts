import './assets/scss/main.scss';
import {RepositoriesModel} from './app/model/repositories.model';

let a = new RepositoriesModel();

a.getRepoByName('jquery').then((data:any) => {
    console.log('all data: ',data);
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


