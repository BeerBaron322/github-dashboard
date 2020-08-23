import {IGetRepoOptions} from '../interfaces/IGetRepoOptions';
import {IRepositoriesList} from '../interfaces/IRepositorieList';

export class RepositoriesModel {
    public baseUrl: string = 'https://api.github.com';
    private token = require('../../../token.json').token;
    private headers: Headers | string[][] | Record<string, string> | undefined = {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
    }

    constructor() {
        
    }

    public getRepoByName(name: string, options?:IGetRepoOptions):Promise<IRepositoriesList> {
        let queryParametrs: string = `?q=${name}in:name&per_page=10`;
        if (options) {
            let option: string;
            for (option in options) {
                queryParametrs += `&${option}=${options[option]}`
            }
        }
        let request = fetch(`${this.baseUrl}/search/repositories${queryParametrs}`, {
            method: 'GET',
            headers: this.headers
        });
        return request.then(response => response.json());
    }

    public getRepoByStars():Promise<IRepositoriesList> {
        let queryParametrs: string = '?q=stars:>100000&git per_page=10'
        let request = fetch(`${this.baseUrl}/search/repositories${queryParametrs}`, {
            method: 'GET',
            headers: this.headers
        });
        return request.then(response => response.json());
    }
}