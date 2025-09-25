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

    // [...newHTML.getElementsByTagName('price-breakdown')].filter(el => el.dataset['id'] === this.dataset['id'])
    const newPriceBreakdown = newHtml.querySelector('price-breakdown');

    if (!newPriceBreakdown) {
      throw new Error('No new price breakdown found');
    }
    
    morph(this, newPriceBreakdown);
  }
}

if (!customElements.get('variant-value-updater')) {
  customElements.define('variant-value-updater', PriceBreakdown);
}

