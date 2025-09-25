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

    const variantValueUpdaterEls = [...newHTML.getElementsByTagName('price-breakdown')]
    const newVariantHTMLForCurrentEl = variantValueUpdaterEls.filter(el => el.dataset['id'] === this.dataset['id'])


    if (!newVariantHTMLForCurrentEl) {
      console.error('Could not found the variant value updater for id: ', this.dataset['id']);
      return;
    }
    
    morph(this, newVariantHTMLForCurrentEl);
  }
}

if (!customElements.get('variant-value-updater')) {
  customElements.define('variant-value-updater', PriceBreakdown);
}

