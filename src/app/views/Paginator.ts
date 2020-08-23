export class Paginator {
    private currentPage: number = 1;
    private numberOfItems: number = 0;
    private paginatorBody: HTMLElement | null;

    constructor() {
        this.paginatorBody = document.querySelector('.paginator .paginator-body');
        if (!this.paginatorBody) {
            throw Error('Paginator element has not found');
        }
    }

    public init(quantity: number) {
        let paginatorBodyNodeList = this.paginatorBody?.querySelectorAll('.paginator-body_page');
        if (paginatorBodyNodeList && paginatorBodyNodeList.length !== 0) {
            paginatorBodyNodeList.forEach(element => {
                element.remove();
            });
        } 
        this.numberOfItems = quantity;
        let firstInitQuantity: number = this.numberOfItems;
        if (this.numberOfItems > 10) {
            firstInitQuantity = 10;
        }
        
        for (let i = 1; i <= firstInitQuantity; i++) {
            this.paginatorBody?.append(this.createPage(i));
        }
    }

    public initByCurrentPage(pageIndex: number, quantity: number) {
        this.numberOfItems = quantity;
        let currentPage = this.createPage(pageIndex);
        currentPage.classList.add('paginator__active');
        this.paginatorBody?.append(currentPage);
        this.rebuildPages(currentPage);
    }

    public bindPageChange(handler: Function) {
        this.paginatorBody?.addEventListener('click', (event) => {
            let target = event.target;
            if (target instanceof HTMLElement && target.hasAttribute('data-page-index')) {
                target.classList.add('paginator__active')
                this.rebuildPages(target);
                handler(target.dataset.pageIndex);
            }
        });
    }

    
    private rebuildPages(targetPage: HTMLElement) {
        let pageIndex = Number(targetPage.dataset.pageIndex);
        let afterTragetPages: Array<HTMLElement> = [];

        if (pageIndex <= 4) {
            this.paginatorBody?.querySelectorAll('.paginator-body_page').forEach(element => {
                if (element instanceof HTMLElement && Number(element.dataset.pageIndex) !== pageIndex) {
                    element.remove();
                }
            });

            let i = 1;
            while(i < pageIndex) {
                targetPage.before(this.createPage(i));
                i++;
            }
            i += 1;
            while(i <= 10) {
                afterTragetPages.push(this.createPage(i));
                i++;
            }
            targetPage.after(...afterTragetPages);
        } else {
            let leftLimit = 5;
            let rightLimit: number;
            if (this.numberOfItems - pageIndex < 4) {
                rightLimit = this.numberOfItems - pageIndex;
            } else {
                rightLimit = 4;
            }
            this.paginatorBody?.querySelectorAll('.paginator-body_page').forEach(element => {
                if (element instanceof HTMLElement) {
                    if (Number(element.dataset.pageIndex) !== pageIndex) {
                        element.remove();
                    }
                }
            });
            
            for (let i = pageIndex - leftLimit + 1; i < pageIndex; i++) {
                targetPage.before(this.createPage(i));
            }

            afterTragetPages = [];
            for (let i = pageIndex + 1; i <= pageIndex + rightLimit + 1; i++) {
                afterTragetPages.push(this.createPage(i));
            }
            targetPage.after(...afterTragetPages);

        }
    }

    private createPage(index: number): HTMLDivElement {
        let paginatorPage = document.createElement('div');
        paginatorPage.innerText = String(index);
        paginatorPage.classList.add('paginator-body_page');
        paginatorPage.setAttribute('data-page-index', String(index));
        return paginatorPage;
    }
}