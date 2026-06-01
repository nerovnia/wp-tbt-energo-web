<?php
/**
 * Email Footer Template
 *
 * Uses modern HTML/CSS while maintaining email client compatibility.
 * CSS classes are prefixed with 'mset-' (MonsterInsights Summary Email Template)
 * to avoid conflicts with email client styles.
 *
 * @since 8.19.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
} ?>
			</div><!-- .mset-content -->
			<div class="mset-footer">
				<div class="mset-footer-content">
					<?php if ( isset( $logo_image ) && $logo_image ) : ?>
						<a href="<?php echo esc_url( $logo_link ); ?>">
							<img src="<?php echo esc_url( $logo_image ); ?>" alt="MonsterInsights" class="mset-footer-logo-image">
						</a>
					<?php endif;

					if ( isset( $settings_tab_url ) && $settings_tab_url ) :
						$footer = sprintf(
							/* translators: %1$s,%2$s are wrapping span tags; %3$s,%4$s wrap the "disable it" link. */
							esc_html__('%1$sThis email was auto-generated and sent from MonsterInsights.%2$s Learn how to %3$s disable it%4$s', 'google-analytics-for-wordpress' ),
						'<span class="mset-footer-text">',
						'</span><span class="mset-footer-text">',
						'<a href="' . $settings_tab_url . '" target="_blank" class="mset-footer-link">',
						'</a>'
						) . '.</span>';

						echo apply_filters( 'mi_email_summaries_footer_text', $footer ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in the sprintf.
					endif; ?>
				</div>
				<div class="mset-footer-bar">
					<?php if ( isset( $left_image ) && $left_image ) : ?>
						<a class="mset-footer-left-image" href="<?php echo esc_url( $logo_link ); ?>">
							<img src="<?php echo esc_url( $left_image ); ?>" alt="MonsterInsights" class="mset-footer-left-image">
						</a>
					<?php endif;

					if ( isset( $facebook_url ) && $facebook_url ) : ?>
						<a href="<?php echo esc_url( $facebook_url ); ?>" target="_blank" class="mset-footer-link">
							<span class="mset-icon mset-icon-facebook"><img src="<?php echo esc_url( $icons_url . 'facebook.png' ); ?>" alt="Facebook" width="16" height="16" style="display: block; width: 100%; height: auto; border: 0;" /></span>
						</a>
					<?php endif;

					if ( isset( $linkedin_url ) && $linkedin_url ) : ?>
						<a href="<?php echo esc_url( $linkedin_url ); ?>" target="_blank" class="mset-footer-link">
							<span class="mset-icon mset-icon-linkedin"><img src="<?php echo esc_url( $icons_url . 'linkedin.png' ); ?>" alt="LinkedIn" width="16" height="16" style="display: block; width: 100%; height: auto; border: 0;" /></span>
						</a>
					<?php endif; ?>
				</div>
			</div>
		</div><!-- .mset-container -->
	</div><!-- .mset-wrapper -->
			</td>
		</tr>
	</table>
</body>
</html>