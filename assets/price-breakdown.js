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
    console.log('hai hai buou', event);
  }

  static updatePriceBreakdown(newHtml) {
    /** @type {NewProduct | undefined} */
    let newProduct;

    const newPriceBreakdown = newHtml.querySelector(this.tagName.toLowerCase());

    if (!newPriceBreakdown) {
      throw new Error('No new price breakdown found');
    }

    morph(this, newPriceBreakdown);
  }
}

if (!customElements.get('price-breakdown')) {
  customElements.define('price-breakdown', PriceBreakdown);
}

