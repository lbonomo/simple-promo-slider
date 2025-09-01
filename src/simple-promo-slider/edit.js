/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
// import NumberControl from '@wordpress/components/build-types/number-control';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	// Convertir en Integer para que no de error el TexControl tipo Number.
	// Ya que los atributos se gurardan como Stirng.
	const speed = parseInt(attributes.speed);

	// Array de sliders dinámicos (array de objetos { text })
	const sliders = attributes.sliders || [];

	function onChangeSpeed(newSpeed) {
		setAttributes({ speed: newSpeed });
	}

	function onChangeSliderText(index, value) {
		const newSliders = [...sliders];
		newSliders[index] = { text: value };
		setAttributes({ sliders: newSliders });
	}

	function addSliderControl() {
		setAttributes({ sliders: [...sliders, { text: '' }] });
	}

	function removeSliderControl(index) {
		const newSliders = sliders.filter((_, idx) => idx !== index);
		setAttributes({ sliders: newSliders });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Settings', 'simple-promo-slider')}>
					<TextControl
						label={__('Slider Speed (ms)', 'simple-promo-slider')}
						value={speed}
						name='speed'
						type='number'
						onChange={onChangeSpeed}
					/>
					<div style={{ marginTop: '1em' }}>
						<strong>{__('Sliders', 'simple-promo-slider')}</strong>
						{sliders.map((slider, idx) => (
							<div key={idx} style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '0.5em' }}>
								<div style={{ flex: 1 }}>
									<TextControl
										label={__('Text', 'simple-promo-slider') + ' ' + (idx + 1)}
										value={slider.text}
										onChange={(value) => onChangeSliderText(idx, value)}
									/>
								</div>
								{sliders.length > 1 && (
									<Button
										variant="secondary"
										isDestructive
										onClick={() => removeSliderControl(idx)}
										style={{ marginBottom: '8px' }}
									>
										×
									</Button>
								)}
							</div>
						))}
						<Button variant="primary" onClick={addSliderControl}>
							{__('Add Slider Text', 'simple-promo-slider')} +
						</Button>
					</div>
				</PanelBody>
			</InspectorControls>
			<p {...useBlockProps()}>
				{__('Simple Promo Slider – hello from the editor!', 'simple-promo-slider')}
			</p>
		</>
	);
}
