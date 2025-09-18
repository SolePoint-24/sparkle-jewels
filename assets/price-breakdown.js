import { Component } from '@theme/component';
import { ThemeEvents } from '@theme/events';


class PriceBreakdown extends Component {
	#abortController = new AbortController();

	connectedCallback() {
    super.connectedCallback();

    const { signal } = this.#abortController;
		const target = this.closest('.shopify-section, dialog, product-card');
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

