import { Component } from '@theme/component';

class PriceBreakdown extends Component {
	connectedCallback() {
		console.log('HERE within connected callaback initial')

    super.connectedCallback();

    const { signal } = this.#abortController;
    console.log('HERE within connected callaback')
		const target = this.closest('.price-config-wrapper');
    target?.addEventListener(ThemeEvents.variantUpdate, this.#onVariantUpdate, { signal });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.#abortController.abort();
  }

	#onVariantUpdate(event) {
		console.log('I AM HERE BOUY', event);
	}
}

if (!customElements.get('price-breakdown')) {
  customElements.define('price-breakdown', PriceBreakdown);
}

