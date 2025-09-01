<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// $attributes  contiene los attributos del bloque.
// $content     contiene el contenido entre etiquetas del bloque (si lo hay).
// $block       contiene toda la información del bloque (nombre, attributos, etc).

$sliders = $attributes['sliders'] ?? [];
$speed = $attributes['speed'] ?? '5000';
$has_multiple_slides = count($sliders) > 1;

?>

<div <?php echo get_block_wrapper_attributes([
	'data-speed' => $speed,
	'data-slides-count' => count($sliders)
]); ?>>
	<?php if ( ! empty( $sliders ) && is_array( $sliders ) ) : ?>
		<div class="simple-promo-slider-container">
			<?php if ( $has_multiple_slides ) : ?>
				<button class="slider-nav slider-prev" aria-label="<?php esc_attr_e('Previous slide', 'simple-promo-slider'); ?>">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M15.41 16.58L10.83 12l4.58-4.58L14 6l-6 6 6 6 1.41-1.42z"/>
					</svg>
				</button>
			<?php endif; ?>
			
			<div class="slider-wrapper">
				<div class="slider-track">
					<?php foreach ( $sliders as $index => $slider ) : ?>
						<div class="slide <?php echo $index === 0 ? 'active' : ''; ?>" data-slide="<?php echo $index; ?>">
							<?php echo esc_html( $slider['text'] ?? '' ); ?>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
			
			<?php if ( $has_multiple_slides ) : ?>
				<button class="slider-nav slider-next" aria-label="<?php esc_attr_e('Next slide', 'simple-promo-slider'); ?>">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M8.59 16.58L13.17 12 8.59 7.42 10 6l6 6-6 6-1.41-1.42z"/>
					</svg>
				</button>
			<?php endif; ?>
		</div>
	<?php endif; ?>
</div>
