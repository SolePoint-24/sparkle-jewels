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

    const newPriceBreakdown = newHtml.querySelector('price-  ');


    if (!newPriceBreakdown) {
      throw new Error('No new price breakdown found');
    }
     const variantIdElement = newPriceBreakdown.querySelector('div');
    
    // 2. Get the text content, which is the ID.
    const variantId = variantIdElement ? variantIdElement.textContent.trim() : null;

    if (variantId) {
      // 3. Now you have the ID! You can log it or use it as needed.
      console.log('Updated Variant ID:', variantId);
      
      // You can also store it on the component itself for later access
      this.dataset.variantId = variantId;
    }
    morph(this, newPriceBreakdown);
  }
}

if (!customElements.get('price-breakdown')) {
  customElements.define('price-breakdown', PriceBreakdown);
}

