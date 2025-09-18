import { Component } from '@theme/component';

class PriceBreakdown extends Component {
	connectedCallback() {
    super.connectedCallback();

    const { signal } = this.#abortController;
    const target = this.closest('.shopify-section');
    target?.addEventListener(ThemeEvents.variantUpdate, this.#onVariantUpdate, { signal });
    target?.addEventListener(ThemeEvents.variantSelected, this.#onVariantSelected, { signal });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.#abortController.abort();
  }
}

if(customComponent.get('price-breakdown')) {
    customComponent.assign('price-breakdown', PriceBreakdown)
}

