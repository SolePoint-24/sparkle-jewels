import { Component } from '@theme/component';
import { ThemeEvents } from '@theme/events';
import { morph } from '@theme/morph';

export class PriceBreakdown extends Component {
	#abortController = new AbortController();

	connectedCallback() {
    super.connectedCallback();

    const { signal } = this.#abortController;
		const target = this.closest('.shopify-section, dialog, product-card');
    target?.addEventListener(ThemeEvents.variantUpdate, this.onVariantUpdate.bind(this), { signal });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.#abortController.abort();
  }

	onVariantUpdate(event) {
    const newHtml = event.detail?.data?.html;

    const newPriceBreakdown = newHtml.querySelector('price-breakdown');

    console.log('this', this.dataset['id'])
    console.log('Updating price breakdown')
    if (!newPriceBreakdown) {
      throw new Error('No new price breakdown found');
    }
    
    morph(this, newPriceBreakdown);
  }
}

if (!customElements.get('price-breakdown')) {
  customElements.define('price-breakdown', PriceBreakdown);
}

