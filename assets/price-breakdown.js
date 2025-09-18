import { Component } from '@theme/component';
import { ThemeEvents } from '@theme/events';


class PriceBreakdown extends Component {
	#abortController = new AbortController();

	connectedCallback() {
    super.connectedCallback();

    const { signal } = this.#abortController;
    console.log('HERE within connected callaback')
		const target = this.closest('.price-config-wrapper');
		console.log('target', target)
    target?.addEventListener(ThemeEvents.variantUpdate, () => {console.log('NOBODY DOES IT BETTER')}, { signal });
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

