import { LightningElement, track } from 'lwc';
import deleteAccountByName from '@salesforce/apex/AccountService.deleteAccountByName';

export default class DeleteAccountWarnUp extends LightningElement {
    @track accountName = '';
    @track isCompleted = false;


    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    handleDelete() {
        deleteAccountByName({ name: this.accountName })
            .then(() => {
                const toast = this.template.querySelector('c-custom-toast');
                console.log('Toast: ', toast);
                let toastOptions = {
                    message: 'Conta apagada com sucesso!',
                    position: 'top-right',
                    duration: 5000,
                    backgroundColor: '#f52323ff',
                    height: '100px',
                    width: '400px',
                    persist: true,
                    showIcon: true,
                    iconOptions: {
                        name: 'iconInfo',
                        width: '24',
                        height: '24',
                        color: '#ffffff'
                    },
                    fontOptions: {
                        color: '#ffffff',
                        size: '20px',
                        weight: '500'
                    }
                };
                this.isCompleted = true;
                toast.show(toastOptions);
            })
            .catch(error => {
                console.error(error);
                const toast2 = this.template.querySelector('c-custom-toast');
                console.log('Toast: ', toast2);
                let toastOptions2 = {
                    message: 'Conta não encontrada!',
                    position: 'top-right',
                    duration: 5000,
                    backgroundColor: '#f52323ff',
                    height: '100px',
                    width: '400px',
                    persist: true,
                    showIcon: true,
                    iconOptions: {
                        name: 'iconInfo',
                        width: '24',
                        height: '24',
                        color: '#ffffff'
                    },
                    fontOptions: {
                        color: '#ffffff',
                        size: '20px',
                        weight: '500'
                    }
                };
                this.isCompleted = false;
                toast2.show(toastOptions2);
            });
    }
    
    handleDeleteAnother() {
        this.accountName = '';
        this.isCompleted = false;
    }
}