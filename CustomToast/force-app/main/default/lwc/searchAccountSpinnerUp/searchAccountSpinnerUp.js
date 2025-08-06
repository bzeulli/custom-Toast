import { LightningElement, track } from 'lwc';
import getAccountByNameTerm from '@salesforce/apex/AccountService.getAccountByNameTerm';

export default class SearchAccountSpinnerUp extends LightningElement {
    @track accountName = '';
    @track isCompleted = false;
    @track isLoading = false;
    @track accounts = []; // lista de contas encontradas
    accountBaseUrl = '/lightning/r/Account/'; // base do link

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return (
            ('0' + date.getDate()).slice(-2) + '/' +
            ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
            date.getFullYear() + ' ' +
            ('0' + date.getHours()).slice(-2) + ':' +
            ('0' + date.getMinutes()).slice(-2)
        );
    }

    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    handleSearch() {
        this.isLoading = true;
        getAccountByNameTerm({ name: this.accountName })
            .then((result) => {
                this.accounts = result.map(acc => {
                    return {
                        ...acc,
                        accountUrl: this.accountBaseUrl + acc.Id + '/view',
                        createdDateFormatted: this.formatDateTime(acc.CreatedDate)
                    };
                });
                const toast = this.template.querySelector('c-custom-toast');
                let toastOptions = {
                    message: 'Enviando dados...',
                    position: 'bottom-right',
                    backgroundColor: '#cb00fdff',
                    iconColor: '#ffffff',
                    fontOptions: {
                        color: '#ffffff',
                        size: '16px',
                        weight: ''
                    }
                }
                toast.showLoading(toastOptions);

                let toastOptions2 = {
                    message: 'Conta encontrada com sucesso!',
                    position: 'bottom-right',
                    duration: 3000,
                    backgroundColor: '#cb00fdff',
                    width: '900px',
                    persist: false,
                    showIcon: true,
                    iconOptions: {
                        name: 'iconCheck',
                        width: '24',
                        height: '24',
                        color: '#ffffff'
                    },
                    fontOptions: {
                        color: '#ffffff',
                        size: '16px',
                        weight: ''
                    }
                }
                setTimeout(() => {
                    toast.show(toastOptions2);
                    this.isLoading = false;
                    this.isCompleted = true;
                }, 5100);
            })
            .catch(error => {
                this.accounts = []; // limpa lista se erro
                console.error(error);
                const toast2 = this.template.querySelector('c-custom-toast');
                let toastOptions3 = {
                    message: 'Enviando dados...',
                    position: 'bottom-right',
                    backgroundColor: '#cb00fdff',
                    iconColor: '#ffffff',
                    fontOptions: {
                        color: '#ffffff',
                        size: '16px',
                        weight: ''
                    }
                }
                toast2.showLoading(toastOptions3);

                let toastOptions4 = {
                    message: 'Conta não encontrada!',
                    position: 'bottom-right',
                    duration: 3000,
                    backgroundColor: '#f0b2ffff',
                    width: '900px',
                    persist: false,
                    showIcon: true,
                    iconOptions: {
                        name: 'iconCheck',
                        width: '24',
                        height: '24',
                        color: '#ffffff'
                    },
                    fontOptions: {
                        color: '#f80909ff',
                        size: '16px',
                        weight: ''
                    }
                }
                setTimeout(() => {
                    toast2.show(toastOptions4);
                    this.isLoading = false;
                    this.isCompleted = false;
                }, 5100);
            });
    }

    handleSearchAnother() {
        this.accountName = '';
        this.isCompleted = false;
        this.accounts = []; // limpa lista ao pesquisar outra
        this.isLoading = false;
    }
}