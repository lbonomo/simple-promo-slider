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
import { PanelBody, TextControl, Button, PanelRow } from '@wordpress/components';

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
					<div class="sliders-control-container">
						<strong>{__('Sliders', 'simple-promo-slider')}</strong>
						{sliders.map((slider, idx) => (
							<PanelRow key={idx} style={{ margin: 0}}>
									<TextControl
										label={__('Slider text', 'simple-promo-slider') + ' ' + (idx + 1)}
										value={slider.text}
										onChange={(value) => onChangeSliderText(idx, value)}
									/>
								{sliders.length > 1 && (
									<Button
										isDestructive
										onClick={() => removeSliderControl(idx)}
										style={{ marginBottom: '8px' }}
									>
										×
									</Button>
								)}
							</PanelRow>
						))}
						<Button variant="primary" onClick={addSliderControl}>
							{__('Add slider text', 'simple-promo-slider')} +
						</Button>
					</div>
				</PanelBody>
			</InspectorControls>
			
			<div {...useBlockProps()}>
				{sliders.length === 0 ? (
					<div className="editor-empty-state">
						{__('Add your first slider text using the + button in the sidebar', 'simple-promo-slider')}
					</div>
				) : (
					<div className="editor-slider-container">
						{sliders.length > 1 && (
							<button className="editor-slider-nav slider-prev">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path d="M15.41 16.58L10.83 12l4.58-4.58L14 6l-6 6 6 6 1.41-1.42z"/>
								</svg>
							</button>
						)}
						
						<div className="editor-slider-wrapper">
							<div className="editor-slider-track">
								{sliders.map((slider, index) => (
									<div key={index} className={`editor-slide ${index === 0 ? 'active' : ''}`}>
										{slider.text || __('Empty text', 'simple-promo-slider')}
									</div>
								))}
							</div>
						</div>
						
						{sliders.length > 1 && (
							<button className="editor-slider-nav slider-next">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
									<path d="M8.59 16.58L13.17 12 8.59 7.42 10 6l6 6-6 6-1.41-1.42z"/>
								</svg>
							</button>
						)}
					</div>
				)}
			</div>
		</>
	);
}
