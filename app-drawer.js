class AppDrawer extends HTMLElement {

    static get observedAttributes() {
        return ['disabled', 'open'];
    }


    get open() {
        return this.hasAttribute('open');
    }

    set open(val) {
        if (val) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
        this.toogleDrawer();
    }

    get disabled() {
        return this.hasAttribute('get');
    }

    set disabled(val) {
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }


    attributeChangedCallback(name, oldValue, newValue) {
        // When the drawer is disabled, update keyboard/screen reader behavior.
        if (this.disabled) {
            this.setAttribute('tabindex', '-1');
            this.setAttribute('aria-disabled', 'true');
        } else {
            this.setAttribute('tabindex', '0');
            this.setAttribute('aria-disabled', 'false');
        }
        // TODO: also react to the open attribute changing.
    }


    constructor() {
        super();


    }
    toogleDrawer() {
        console.log('this');
    }
}
window.customElements.define("app-drawer", AppDrawer);