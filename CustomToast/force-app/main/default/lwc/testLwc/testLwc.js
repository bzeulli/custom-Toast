import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    handleShowToast() {
        const toast = this.template.querySelector('c-toast-test');
        let toastOptions = {
            message: 'Novo item criado com sucesso!',
            position: 'bottom-center',
            duration: 3000,
            backgroundColor: '#FFA500',
            width: '',
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
        toast.show(toastOptions);
    }

    handleShowToast2() {
        const toast = this.template.querySelector('.toast2');
        let toastOptions = {
            message: 'Item excluído com sucesso!',
            position: 'top-right',
            duration: 3000,
            backgroundColor: '#7c5da0',
            width: '',
            persist: false,
            showIcon: true,
            iconOptions: {
                name: 'iconSF',
                width: '24',
                height: '24',
                color: '#fff'
            },
            fontOptions: {
                color: '#ffffff',
                size: '16px',
                weight: '300'
            }
        }
        toast.show(toastOptions);
    }
    handleShowToast3(){
        const toast = this.template.querySelector('c-toast-test');
        let toastOptions = {
            message: 'Enviando dados...',
            position: 'bottom-right',
            backgroundColor: '#455a64',
            iconColor: '#ffffff',
            fontOptions: {
                color: '#ffffff',
                size: '16px',
                weight: ''
            }
        }
        toast.showLoading(toastOptions);
        
        // ... depois de concluir:
        /* setTimeout(() => toast.clearToast(), 5000); */
        let toastOptions2 = {
            message: 'Item salvo com sucesso!',
            position: 'bottom-right',
            duration: 3000,
            backgroundColor: '#8caf50',
            width: '',
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
        setTimeout(() => toast.show(toastOptions2), 5100);
    }
    handleShowToast4() {
        const toast = this.template.querySelector('c-toast-test');
        let toastOptions = {
            message: 'Enviando dados...',
            position: 'bottom-right',
            backgroundColor: '#455a64',
            iconColor: '#ffffff',
            fontOptions: {
                color: '#ffffff',
                size: '16px',
                weight: ''
            }
        }
        toast.showLoading(toastOptions);
        setTimeout(() => toast.clearToast(), 5100);
    }
}