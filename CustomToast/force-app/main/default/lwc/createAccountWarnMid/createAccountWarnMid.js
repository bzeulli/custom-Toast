import { LightningElement, track } from 'lwc';
import createAccount from '@salesforce/apex/AccountService.createAccount';


export default class CreateAccountWarnMid extends LightningElement {
    @track accountName = '';
    @track isCompleted = false;


    handleNameChange(event) {
        this.accountName = event.target.value;
    }

    handleSave() {
        createAccount({ nome: this.accountName })
            .then(() => {
                const toast = this.template.querySelector('c-custom-toast');
                console.log('Toast: ', toast);
                let toastOptions = {
                    message: 'Conta criada com sucesso, lembre-se: deve alterar o propietário!',
                    position: 'bottom-center',
                    duration: 5000,
                    backgroundColor: '#f5a623',
                    height: '50px',
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
                        size: '16px',
                        weight: '500'
                    }
                };
                this.isCompleted = true;
                toast.show(toastOptions);
            })
            .catch(error => {
                console.error(error);
            });
    }
    
    handleCreateAnother() {
        this.accountName = '';
        this.isCompleted = false;
    }
}