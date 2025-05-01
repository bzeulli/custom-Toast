import { LightningElement, api } from 'lwc';

export default class CustomToast extends LightningElement {
    toastElement;
    timeout;
    iconDefault = {
        name: 'iconInfo',
        width: '24',
        height: '24',
        color: '#ffffff'
    }

    @api
    show(toastOptions) {
        this.clearToast();
        const toastOptionsProperties = Object.getOwnPropertyNames(toastOptions);
        const toastFontOptionsProperties = toastOptionsProperties.includes('fontOptions') ? Object.getOwnPropertyNames(toastOptions.fontOptions) : [];
        let duration = toastOptionsProperties.includes('duration') && (toastOptions.duration != null || toastOptions.duration != '') ? toastOptions.duration : 3000;
        let backgroundColor = toastOptionsProperties.includes('backgroundColor') && (toastOptions.backgroundColor == null || toastOptions.backgroundColor == '') ? '#29b6f6' : toastOptions.backgroundColor;
        let message = !toastOptionsProperties.includes('message') && (toastOptions.message == null || toastOptions.message == '') ? `I'm a toast!` : toastOptions.message;
        let position = !toastOptionsProperties.includes('position') && (toastOptions.position == null || toastOptions.position == '') ? 'bottom-right' : toastOptions.position;
        let width = !toastOptionsProperties.includes('width') && (toastOptions.width == null || toastOptions.width == '') ? 'auto' : toastOptions.width;
        let persist = toastOptionsProperties.includes('persist') && (toastOptions.persist == null || toastOptions.persist == '') ? false : toastOptions.persist;
        let fontColor = !toastFontOptionsProperties.includes('fontColor') && (toastOptions.fontOptions.color == null || toastOptions.fontOptions.color == '') ? '#ffffff' : toastOptions.fontOptions.color;
        let fontSize = !toastFontOptionsProperties.includes('fontSize') && (toastOptions.fontOptions.size == null || toastOptions.fontOptions.size == '') ? '16px' : toastOptions.fontOptions.size;
        let fontWeight = !toastFontOptionsProperties.includes('fontWeight') && (toastOptions.fontOptions.weight == null || toastOptions.fontOptions.weight == '') ? 'normal' : toastOptions.fontOptions.weight;
        let showIcon = toastOptionsProperties.includes('showIcon') && (toastOptions.showIcon == null || toastOptions.showIcon == '') ? false : toastOptions.showIcon;
        let iconOptions = toastOptionsProperties.includes('iconOptions') ? toastOptions.iconOptions : this.iconDefault;

        this.toastElement = document.createElement('div');
        this.toastElement.className = `toast ${position}`;
        this.toastElement.style.backgroundColor = backgroundColor;
        this.toastElement.style.color = fontColor;
        this.toastElement.style.fontSize = fontSize;
        this.toastElement.style.fontWeight = fontWeight;
        if(!persist){
            this.toastElement.style.animationName = `fadeInOut`;
            this.toastElement.style.animationTimingFunction = `ease-in-out`;
            this.toastElement.style.animationDuration = `${duration}ms`;
        }

        if (width) this.toastElement.style.width = width;

        const iconHtml = showIcon ? this.setIcon(iconOptions) : '';

        this.toastElement.innerHTML = iconHtml != '' ? 
            `<div class="toast-content">
                <span class='toast-icon'>${iconHtml}</span>
                <span class="toast-text">${message}</span>
                <span class="toast-close">X</span>
            </div>` : 
            `<div class="toast-content">
                <span class="toast-text">${message}</span>
                <span class="toast-close">X</span>
            </div>`;

        this.template.querySelector('.toast-container').appendChild(this.toastElement);
        this.template.querySelector('.toast-close').addEventListener('click', (e) =>{
                                                                                        const toast = e.target.closest('.toast');
                                                                                        toast.remove();
                                                                                    });

        if (!persist) {
            this.timeout = setTimeout(() => this.clearToast(), duration);
        }
    }

    @api
    showLoading(toastOptions) {
        this.clearToast();
        let message = toastOptions.message == null || toastOptions.message == '' ? '' : toastOptions.message;
        let position = toastOptions.position == null || toastOptions.position == '' ? 'bottom-right' : toastOptions.position;
        let backgroundColor = toastOptions.backgroundColor == null || toastOptions.backgroundColor == '' ? '#29b6f6' : toastOptions.backgroundColor;
        let iconColor = toastOptions.iconColor == null || toastOptions.iconColor == '' ? '#ffffff' : toastOptions.iconColor;
        let fontColor = toastOptions.fontOptions.color == null || toastOptions.fontOptions.color == '' ? '#ffffff' : toastOptions.fontOptions.color;
        let fontSize = toastOptions.fontOptions.size == null || toastOptions.fontOptions.size == '' ? '16px' : toastOptions.fontOptions.size;
        let fontWeight = toastOptions.fontOptions.weight == null || toastOptions.fontOptions.weight == '' ? 'normal' : toastOptions.fontOptions.weight;

        this.toastElement = document.createElement('div');
        this.toastElement.className = `toast ${position} toast-loading`;
        this.toastElement.style.backgroundColor = backgroundColor;
        this.toastElement.style.color = fontColor;
        this.toastElement.style.fontSize = fontSize;
        this.toastElement.style.fontWeight = fontWeight;

        this.toastElement.innerHTML = `
        <div class='toast-content'>
            <div class='toast-spinner style='border-top-color:${iconColor}'></div>
            <span class='toast-text'>${message}</span>
        </div>`

        this.template.querySelector('.toast-container').appendChild(this.toastElement);
    }

    @api
    clearToast() {
        if (this.toastElement) {
            this.toastElement.remove();
            this.toastElement = null;
        }
    }

    setIcon(iconOptions) {
        const toastIconOptionsProperties = Object.getOwnPropertyNames('iconOptions');
        let icon;
        let iconWidth = !toastIconOptionsProperties.includes('width') && (iconOptions.width == null || iconOptions.width == '') ? '24' : iconOptions.width;
        let iconHeight = !toastIconOptionsProperties.includes('height') && (iconOptions.height == null || iconOptions.height == '') ? '24' : iconOptions.height;
        let iconColor = !toastIconOptionsProperties.includes('color') && (iconOptions.color == null || iconOptions.color == '') ? '#ffffff' : iconOptions.color;
        let iconCheck = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width=${iconWidth} height=${iconHeight} viewBox="0,0,256,256"><g fill=${iconColor} fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M32,6c-14.359,0 -26,11.641 -26,26c0,14.359 11.641,26 26,26c14.359,0 26,-11.641 26,-26c0,-14.359 -11.641,-26 -26,-26zM29,42l-11,-11l2,-3l9,6l13.957,-12l3.043,3z"></path></g></g></svg>`;
        let iconCancel = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width=${iconWidth} height=${iconHeight} viewBox="0,0,256,256"><g fill=${iconColor} fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M50.385,50.385c-10.153,10.153 -26.616,10.153 -36.77,0c-10.154,-10.153 -10.153,-26.616 0,-36.77c10.153,-10.154 26.616,-10.153 36.77,0c10.154,10.153 10.153,26.616 0,36.77zM43.314,40.485l-7.071,-8.485l7.071,-8.485l-2.828,-2.828l-8.486,7.07l-8.485,-7.071l-2.828,2.828l7.07,8.486l-7.071,8.485l2.828,2.828l8.486,-7.07l8.485,7.071z"></path></g></g></svg>`;
        let iconBlock = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width=${iconWidth} height=${iconHeight} viewBox="0,0,256,256"><g fill=${iconColor} fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M32,6c-14.359,0 -26,11.641 -26,26c0,14.359 11.641,26 26,26c14.359,0 26,-11.641 26,-26c0,-14.359 -11.641,-26 -26,-26zM32,10c5.33115,0 10.22531,1.90591 14.03711,5.07227l-31.53125,30.24609c-2.82358,-3.69994 -4.50586,-8.31533 -4.50586,-13.31836c0,-12.131 9.869,-22 22,-22zM48.92773,17.96289c3.16636,3.8118 5.07227,8.70596 5.07227,14.03711c0,12.131 -9.869,22 -22,22c-5.00303,0 -9.61841,-1.68228 -13.31836,-4.50586z"></path></g></g></svg>`;
        let iconInfo = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width=${iconWidth} height=${iconHeight} viewBox="0,0,256,256"><g fill=${iconColor} fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M32,6c-14.359,0 -26,11.641 -26,26c0,14.359 11.641,26 26,26c14.359,0 26,-11.641 26,-26c0,-14.359 -11.641,-26 -26,-26zM32.021,16c1.534,0 2.979,1.346 2.979,2.981c0,1.746 -1.445,3.019 -2.979,3.019c-1.796,0 -3.021,-1.273 -3.021,-3.019c0,-1.635 1.225,-2.981 3.021,-2.981zM39,47h-5h-4h-5v-3l5,-1v-13h-4v-3l8,-1v17l5,1z"></path></g></g></svg>`;
        let iconDelete = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width=${iconWidth} height=${iconHeight} viewBox="0,0,256,256"><g fill=${iconColor} fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M28,3c-2.209,0 -4,1.791 -4,4v2h-0.40039l-16.59961,2v3h50v-3l-16.59961,-2h-0.40039v-2c0,-2.209 -1.791,-4 -4,-4zM28,7h8v2h-8zM10,16l4,42h36l3.92383,-41zM32,23c1.333,0 2,1 2,1v29h-4v-29c0,0 0.667,-1 2,-1zM18.97656,23.07031c1.33,-0.093 2.06641,0.85938 2.06641,0.85938l1.96484,29.07031h-4.01172l-1.94336,-28.79297c0,0 0.59383,-1.04372 1.92383,-1.13672zM44.97852,23.07031c1.33,0.093 1.92578,1.13672 1.92578,1.13672l-1.94336,28.79297h-4.01172l1.96484,-29.07031c0,0 0.73445,-0.95238 2.06445,-0.85938z"></path></g></g></svg>`;
        
        let icons = {
            iconCheck: iconCheck,
            iconCancel: iconCancel,
            iconBlock: iconBlock,
            iconInfo: iconInfo,
            iconDelete: iconDelete
        }
        icon = Object.hasOwn(icons, iconOptions.name) ? icons[iconOptions.name] : iconInfo;

        return icon;
    }
}