<?php
	/*
	*	Goodlayers Function File
	*	---------------------------------------------------------------------
	*	This file include all of important function and features of the theme
	*	---------------------------------------------------------------------
	*/

	// goodlayers core plugin function
	include_once(get_template_directory() . '/admin/core/sidebar-generator.php');
	include_once(get_template_directory() . '/admin/core/utility.php');
	include_once(get_template_directory() . '/admin/core/media.php' );

	// create admin page
	if( is_admin() ){
		include_once(get_template_directory() . '/admin/tgmpa/class-tgm-plugin-activation.php');
		include_once(get_template_directory() . '/admin/tgmpa/plugin-activation.php');
		include_once(get_template_directory() . '/admin/function/getting-start.php');
	}

	// plugins
	include_once(get_template_directory() . '/plugins/wpml.php');
	include_once(get_template_directory() . '/plugins/revslider.php');

	include_once(get_template_directory() . '/include/pb/personnel-item.php');
	include_once(get_template_directory() . '/include/pb/pb-element-blog.php');
	include_once(get_template_directory() . '/include/pb/pb-element-event.php');
	include_once(get_template_directory() . '/include/pb/recent-event-widget.php');
	include_once(get_template_directory() . '/include/pb/pb-element-personnel.php');
	include_once(get_template_directory() . '/include/pb/pb-element-personnel-info.php');
	include_once(get_template_directory() . '/include/pb/block-title.php');
	include_once(get_template_directory() . '/include/pb/pb-element-tab.php');
	include_once(get_template_directory() . '/include/pb/pb-element-title.php');


	/////////////////////
	// front end script
	/////////////////////

	include_once(get_template_directory() . '/include/utility.php' );
	include_once(get_template_directory() . '/include/function-regist.php' );
	include_once(get_template_directory() . '/include/navigation-menu.php' );
	include_once(get_template_directory() . '/include/include-script.php' );
	include_once(get_template_directory() . '/include/goodlayers-core-filter.php' );
	include_once(get_template_directory() . '/include/maintenance.php' );
	include_once(get_template_directory() . '/woocommerce/woocommerce-settings.php' );

	/////////////////////
	// execute module
	/////////////////////

	// initiate sidebar structure
	$sidebar_atts = array(
		'before_widget' => '<div id="%1$s" class="widget %2$s kingster-widget">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="kingster-widget-title">',
		'after_title'   => '</h3><span class="clear"></span>' );
	new gdlr_core_sidebar_generator($sidebar_atts);

	// clear data for wpml translation
	add_action('init', 'kingster_clear_general_option');
	if( !function_exists('kingster_clear_general_option') ){
		function kingster_clear_general_option(){
			unset($GLOBALS['kingster_general']);
		}
	}

	// remove the core default action to enqueue the theme script
	remove_action('after_setup_theme', 'gdlr_init_goodlayers_core_elements');
	add_action('after_setup_theme', 'kingster_init_goodlayers_core_elements');
	if( !function_exists('kingster_init_goodlayers_core_elements') ){
		function kingster_init_goodlayers_core_elements(){

			// create an admin option and customizer
			if( (is_admin() || is_customize_preview()) && class_exists('gdlr_core_admin_option') && class_exists('gdlr_core_theme_customizer') ){

				$kingster_admin_option = new gdlr_core_admin_option(array(
					'filewrite' => kingster_get_style_custom(true)
				));

				include_once( get_template_directory() . '/include/options/general.php');
				include_once( get_template_directory() . '/include/options/typography.php');
				include_once( get_template_directory() . '/include/options/color.php');
				include_once( get_template_directory() . '/include/options/plugin-settings.php');

				if( is_customize_preview() ){
					new gdlr_core_theme_customizer($kingster_admin_option);
				}

				// clear an option for customize page
				add_action('wp', 'kingster_clear_option');

			}

			// add the script for page builder / page options / post option
			if( is_admin() ){

				if( class_exists('gdlr_core_revision') ){
					$revision_num = 5;
					new gdlr_core_revision($revision_num);
				}

				// create page option
				if( class_exists('gdlr_core_page_option') ){

					// for page post type
					new gdlr_core_page_option(array(
						'post_type' => array('page'),
						'options' => array(
							'layout' => array(
								'title' => esc_html__('Layout', 'kingster'),
								'options' => array(
									'enable-header-area' => array(
										'title' => esc_html__('Enable Header Area', 'kingster'),
										'type' => 'checkbox',
										'default' => 'enable'
									),
									'sticky-navigation' => array(
										'title' => esc_html__('Sticky Navigation', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'enable' => esc_html__('Enable', 'kingster'),
											'disable' => esc_html__('Disable', 'kingster'),
										),
										'condition' => array( 'enable-header-area' => 'enable' )
									),
									'enable-page-title' => array(
										'title' => esc_html__('Enable Page Title', 'kingster'),
										'type' => 'checkbox',
										'default' => 'enable',
										'condition' => array( 'enable-header-area' => 'enable' )
									),
									'page-caption' => array(
										'title' => esc_html__('Caption', 'kingster'),
										'type' => 'textarea',
										'condition' => array( 'enable-header-area' => 'enable', 'enable-page-title' => 'enable' )
									),
									'enable-title-background' => array(
										'title' => esc_html__('Enable Title Background', 'kingster'),
										'type' => 'checkbox',
										'default' => 'enable',
										'condition' => array( 'enable-header-area' => 'enable', 'enable-page-title' => 'enable' )
									),
									'title-background' => array(
										'title' => esc_html__('Page Title Background', 'kingster'),
										'type' => 'upload',
										'condition' => array( 'enable-header-area' => 'enable', 'enable-page-title' => 'enable', 'enable-title-background' => 'enable' )
									),
									'enable-breadcrumbs' => array(
										'title' => esc_html__('Enable Breadcrumbs', 'kingster'),
										'type' => 'checkbox',
										'default' => 'disable',
										'condition' => array( 'enable-header-area' => 'enable', 'enable-page-title' => 'enable' )
									),
									'body-background-type' => array(
										'title' => esc_html__('Body Background Type', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'image' => esc_html__('Image ( Only For Boxed Layout )', 'kingster'),
										)
									),
									'body-background-image' => array(
										'title' => esc_html__('Body Background Image', 'kingster'),
										'type' => 'upload',
										'data-type' => 'file',
										'condition' => array( 'body-background-type' => 'image' )
									),
									'body-background-image-opacity' => array(
										'title' => esc_html__('Body Background Image Opacity', 'kingster'),
										'type' => 'fontslider',
										'data-type' => 'opacity',
										'default' => '100',
										'condition' => array( 'body-background-type' => 'image' )
									),
									'show-content' => array(
										'title' => esc_html__('Show WordPress Editor Content', 'kingster'),
										'type' => 'checkbox',
										'default' => 'enable',
										'description' => esc_html__('Disable this to hide the content in editor to show only page builder content.', 'kingster'),
									),
									'sidebar' => array(
										'title' => esc_html__('Sidebar', 'kingster'),
										'type' => 'radioimage',
										'options' => 'sidebar',
										'default' => 'none',
										'wrapper-class' => 'gdlr-core-fullsize'
									),
									'sidebar-left' => array(
										'title' => esc_html__('Sidebar Left', 'kingster'),
										'type' => 'combobox',
										'options' => 'sidebar',
										'condition' => array( 'sidebar' => array('left', 'both') )
									),
									'sidebar-right' => array(
										'title' => esc_html__('Sidebar Right', 'kingster'),
										'type' => 'combobox',
										'options' => 'sidebar',
										'condition' => array( 'sidebar' => array('right', 'both') )
									),
									'enable-footer' => array(
										'title' => esc_html__('Enable Footer', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'enable' => esc_html__('Enable', 'kingster'),
											'disable' => esc_html__('Disable', 'kingster'),
										)
									),
									'enable-copyright' => array(
										'title' => esc_html__('Enable Copyright', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'enable' => esc_html__('Enable', 'kingster'),
											'disable' => esc_html__('Disable', 'kingster'),
										)
									),

								)
							), // layout
							'title' => array(
								'title' => esc_html__('Title Style', 'kingster'),
								'options' => array(

									'title-style' => array(
										'title' => esc_html__('Page Title Style', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'small' => esc_html__('Small', 'kingster'),
											'medium' => esc_html__('Medium', 'kingster'),
											'large' => esc_html__('Large', 'kingster'),
											'custom' => esc_html__('Custom', 'kingster'),
										),
										'default' => 'default'
									),
									'title-align' => array(
										'title' => esc_html__('Page Title Alignment', 'kingster'),
										'type' => 'radioimage',
										'options' => 'text-align',
										'with-default' => true,
										'default' => 'default'
									),
									'title-spacing' => array(
										'title' => esc_html__('Page Title Padding', 'kingster'),
										'type' => 'custom',
										'item-type' => 'padding',
										'data-input-type' => 'pixel',
										'options' => array('padding-top', 'padding-bottom', 'caption-bottom-margin'),
										'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
										'condition' => array( 'title-style' => 'custom' )
									),
									'title-font-size' => array(
										'title' => esc_html__('Page Title Font Size', 'kingster'),
										'type' => 'custom',
										'item-type' => 'padding',
										'data-input-type' => 'pixel',
										'options' => array('title-size', 'title-letter-spacing', 'caption-size', 'caption-letter-spacing'),
										'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
										'condition' => array( 'title-style' => 'custom' )
									),
									'title-font-weight' => array(
										'title' => esc_html__('Page Title Font Weight', 'kingster'),
										'type' => 'custom',
										'item-type' => 'padding',
										'options' => array('title-weight', 'caption-weight'),
										'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
										'condition' => array( 'title-style' => 'custom' )
									),
									'title-font-transform' => array(
										'title' => esc_html__('Page Title Font Transform', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'none' => esc_html__('None', 'kingster'),
											'uppercase' => esc_html__('Uppercase', 'kingster'),
											'lowercase' => esc_html__('Lowercase', 'kingster'),
											'capitalize' => esc_html__('Capitalize', 'kingster'),
										),
										'default' => 'uppercase',
										'condition' => array( 'title-style' => 'custom' )
									),
									'top-bottom-gradient' => array(
										'title' => esc_html__('Title Top/Bottom Gradient', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'both' => esc_html__('Both', 'kingster'),
											'top' => esc_html__('Top', 'kingster'),
											'bottom' => esc_html__('Bottom', 'kingster'),
											'disable' => esc_html__('None', 'kingster'),
										)
									),
									'title-background-overlay-opacity' => array(
										'title' => esc_html__('Page Title Background Overlay Opacity', 'kingster'),
										'type' => 'text',
										'description' => esc_html__('Fill the number between 0.01 - 1 ( Leave Blank For Default Value )', 'kingster'),
										'condition' => array( 'title-style' => 'custom' )
									),
									'breadcrumbs-padding' => array(
										'title' => esc_html__('Breadcrumbs Padding', 'kingster'),
										'type' => 'custom',
										'item-type' => 'padding',
										'data-input-type' => 'pixel',
										'options' => array('padding-top', 'padding-bottom'),
										'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
										'condition' => array( 'title-style' => 'custom' )
									),
									'title-color' => array(
										'title' => esc_html__('Page Title Color', 'kingster'),
										'type' => 'colorpicker',
									),
									'caption-color' => array(
										'title' => esc_html__('Page Caption Color', 'kingster'),
										'type' => 'colorpicker',
									),
									'title-background-overlay-color' => array(
										'title' => esc_html__('Page Background Overlay Color', 'kingster'),
										'type' => 'colorpicker',
									),

								)
							), // title
							'header' => array(
								'title' => esc_html__('Header', 'kingster'),
								'options' => array(

									'header-slider' => array(
										'title' => esc_html__('Header Slider ( Above Navigation )', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'none' => esc_html__('None', 'kingster'),
											'layer-slider' => esc_html__('Layer Slider', 'kingster'),
											'master-slider' => esc_html__('Master Slider', 'kingster'),
											'revolution-slider' => esc_html__('Revolution Slider', 'kingster'),
										),
										'description' => esc_html__('For header style plain / bar / boxed', 'kingster'),
									),
									'layer-slider-id' => array(
										'title' => esc_html__('Choose Layer Slider', 'kingster'),
										'type' => 'combobox',
										'options' => gdlr_core_get_layerslider_list(),
										'condition' => array( 'header-slider' => 'layer-slider' )
									),
									'master-slider-id' => array(
										'title' => esc_html__('Choose Master Slider', 'kingster'),
										'type' => 'combobox',
										'options' => gdlr_core_get_masterslider_list(),
										'condition' => array( 'header-slider' => 'master-slider' )
									),
									'revolution-slider-id' => array(
										'title' => esc_html__('Choose Revolution Slider', 'kingster'),
										'type' => 'combobox',
										'options' => gdlr_core_get_revolution_slider_list(),
										'condition' => array( 'header-slider' => 'revolution-slider' )
									),

								) // header options
							), // header
							'bullet-anchor' => array(
								'title' => esc_html__('Bullet Anchor', 'kingster'),
								'options' => array(
									'bullet-anchor-description' => array(
										'type' => 'description',
										'description' => esc_html__('This feature is used for one page navigation. It will appear on the right side of page. You can put the id of element in \'Anchor Link\' field to let the bullet scroll the page to.', 'kingster')
									),
									'bullet-anchor' => array(
										'title' => esc_html__('Add Anchor', 'kingster'),
										'type' => 'custom',
										'item-type' => 'tabs',
										'options' => array(
											'title' => array(
												'title' => esc_html__('Anchor Link', 'kingster'),
												'type' => 'text',
											),
											'anchor-color' => array(
												'title' => esc_html__('Anchor Color', 'kingster'),
												'type' => 'colorpicker',
											),
											'anchor-hover-color' => array(
												'title' => esc_html__('Anchor Hover Color', 'kingster'),
												'type' => 'colorpicker',
											)
										),
										'wrapper-class' => 'gdlr-core-fullsize'
									),
								)
							)
						)
					));

					// for post post type
					new gdlr_core_page_option(array(
						'post_type' => array('post'),
						'options' => array(
							'layout' => array(
								'title' => esc_html__('Layout', 'kingster'),
								'options' => array(

									'show-content' => array(
										'title' => esc_html__('Show WordPress Editor Content', 'kingster'),
										'type' => 'checkbox',
										'default' => 'enable',
										'description' => esc_html__('Disable this to hide the content in editor to show only page builder content.', 'kingster'),
									),
									'sidebar' => array(
										'title' => esc_html__('Sidebar', 'kingster'),
										'type' => 'radioimage',
										'options' => 'sidebar',
										'with-default' => true,
										'default' => 'default',
										'wrapper-class' => 'gdlr-core-fullsize'
									),
									'sidebar-left' => array(
										'title' => esc_html__('Sidebar Left', 'kingster'),
										'type' => 'combobox',
										'options' => 'sidebar',
										'condition' => array( 'sidebar' => array('left', 'both') )
									),
									'sidebar-right' => array(
										'title' => esc_html__('Sidebar Right', 'kingster'),
										'type' => 'combobox',
										'options' => 'sidebar',
										'condition' => array( 'sidebar' => array('right', 'both') )
									),
								)
							),
							'metro-layout' => array(
								'title' => esc_html__('Metro Layout', 'kingster'),
								'options' => array(
									'metro-column-size' => array(
										'title' => esc_html__('Column Size', 'kingster'),
										'type' => 'combobox',
										'options' => array( 'default'=> esc_html__('Default', 'kingster'),
											60 => '1/1', 30 => '1/2', 20 => '1/3', 40 => '2/3',
											15 => '1/4', 45 => '3/4', 12 => '1/5', 24 => '2/5', 36 => '3/5', 48 => '4/5',
											10 => '1/6', 50 => '5/6'),
										'default' => 'default',
										'description' => esc_html__('Choosing default will display the value selected by the page builder item.', 'kingster')
									),
									'metro-thumbnail-size' => array(
										'title' => esc_html__('Thumbnail Size', 'kingster'),
										'type' => 'combobox',
										'options' => 'thumbnail-size',
										'with-default' => true,
										'default' => 'default',
										'description' => esc_html__('Choosing default will display the value selected by the page builder item.', 'kingster')
									)
								)
							),
							'title' => array(
								'title' => esc_html__('Title', 'kingster'),
								'options' => array(

									'blog-title-style' => array(
										'title' => esc_html__('Blog Title Style', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'small' => esc_html__('Small', 'kingster'),
											'large' => esc_html__('Large', 'kingster'),
											'custom' => esc_html__('Custom', 'kingster'),
											'inside-content' => esc_html__('Inside Content', 'kingster'),
											'none' => esc_html__('None', 'kingster'),
										),
										'default' => 'default'
									),
									'blog-title-padding' => array(
										'title' => esc_html__('Blog Title Padding', 'kingster'),
										'type' => 'custom',
										'item-type' => 'padding',
										'data-input-type' => 'pixel',
										'options' => array('padding-top', 'padding-bottom'),
										'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
										'condition' => array( 'blog-title-style' => 'custom' )
									),
									'blog-feature-image' => array(
										'title' => esc_html__('Blog Feature Image Location', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'content' => esc_html__('Inside Content', 'kingster'),
											'title-background' => esc_html__('Title Background', 'kingster'),
											'none' => esc_html__('None', 'kingster'),
										)
									),
									'blog-title-background-image' => array(
										'title' => esc_html__('Blog Title Background Image', 'kingster'),
										'type' => 'upload',
										'data-type' => 'file',
										'condition' => array(
											'blog-title-style' => array('default', 'small', 'large', 'custom'),
											'blog-feature-image' => array('default', 'content', 'none')
										),
										'description' => esc_html__('Will be overridden by feature image if selected.', 'kingster'),
									),
									'blog-top-bottom-gradient' => array(
										'title' => esc_html__('Blog ( Feature Image ) Title Top/Bottom Gradient', 'kingster'),
										'type' => 'combobox',
										'options' => array(
											'default' => esc_html__('Default', 'kingster'),
											'enable' => esc_html__('Both', 'kingster'),
											'top' => esc_html__('Top', 'kingster'),
											'bottom' => esc_html__('Bottom', 'kingster'),
											'disable' => esc_html__('None', 'kingster'),
										)
									),
									'blog-title-background-overlay-opacity' => array(
										'title' => esc_html__('Blog Title Background Overlay Opacity', 'kingster'),
										'type' => 'text',
										'description' => esc_html__('Fill the number between 0.01 - 1 ( Leave Blank For Default Value )', 'kingster'),
									),

								) // options
							) // title
						)
					));
				}

			}

			// create page builder
			if( class_exists('gdlr_core_page_builder') ){
				new gdlr_core_page_builder(array(
					'style' => array(
						'style-custom' => kingster_get_style_custom()
					)
				));
			}

		} // kingster_init_goodlayers_core_elements
	} // function_exists


	add_filter('gdlr_core_course_options', 'kingster_gdlr_core_course_options');
	if( !function_exists('kingster_gdlr_core_course_options') ){
		function kingster_gdlr_core_course_options( $options ){

			if( !empty($options['general']['options']) ){
				$options['general']['options'] = $options['general']['options'] + array(
					'enable-title-background' => array(
						'title' => esc_html__('Enable Title Background', 'kingster'),
						'type' => 'checkbox',
						'default' => 'enable',
						'condition' => array( 'enable-page-title' => 'enable' )
					),
					'title-background' => array(
						'title' => esc_html__('Page Title Background', 'kingster'),
						'type' => 'upload',
						'condition' => array( 'enable-page-title' => 'enable', 'enable-title-background' => 'enable' )
					),
					'enable-breadcrumbs' => array(
						'title' => esc_html__('Enable Breadcrumbs', 'kingster'),
						'type' => 'checkbox',
						'default' => 'disable',
						'condition' => array( 'enable-page-title' => 'enable' )
					),
				);
			}

			if( !empty($options) ){
				$options['title'] = array(
					'title' => esc_html__('Title Style', 'kingster'),
					'options' => array(

						'title-style' => array(
							'title' => esc_html__('Page Title Style', 'kingster'),
							'type' => 'combobox',
							'options' => array(
								'default' => esc_html__('Default', 'kingster'),
								'small' => esc_html__('Small', 'kingster'),
								'medium' => esc_html__('Medium', 'kingster'),
								'large' => esc_html__('Large', 'kingster'),
								'custom' => esc_html__('Custom', 'kingster'),
							),
							'default' => 'default'
						),
						'title-align' => array(
							'title' => esc_html__('Page Title Alignment', 'kingster'),
							'type' => 'radioimage',
							'options' => 'text-align',
							'with-default' => true,
							'default' => 'default'
						),
						'title-spacing' => array(
							'title' => esc_html__('Page Title Padding', 'kingster'),
							'type' => 'custom',
							'item-type' => 'padding',
							'data-input-type' => 'pixel',
							'options' => array('padding-top', 'padding-bottom', 'caption-bottom-margin'),
							'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
							'condition' => array( 'title-style' => 'custom' )
						),
						'title-font-size' => array(
							'title' => esc_html__('Page Title Font Size', 'kingster'),
							'type' => 'custom',
							'item-type' => 'padding',
							'data-input-type' => 'pixel',
							'options' => array('title-size', 'title-letter-spacing', 'caption-size', 'caption-letter-spacing'),
							'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
							'condition' => array( 'title-style' => 'custom' )
						),
						'title-font-weight' => array(
							'title' => esc_html__('Page Title Font Weight', 'kingster'),
							'type' => 'custom',
							'item-type' => 'padding',
							'options' => array('title-weight', 'caption-weight'),
							'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
							'condition' => array( 'title-style' => 'custom' )
						),
						'title-font-transform' => array(
							'title' => esc_html__('Page Title Font Transform', 'kingster'),
							'type' => 'combobox',
							'options' => array(
								'none' => esc_html__('None', 'kingster'),
								'uppercase' => esc_html__('Uppercase', 'kingster'),
								'lowercase' => esc_html__('Lowercase', 'kingster'),
								'capitalize' => esc_html__('Capitalize', 'kingster'),
							),
							'default' => 'uppercase',
							'condition' => array( 'title-style' => 'custom' )
						),
						'top-bottom-gradient' => array(
							'title' => esc_html__('Title Top/Bottom Gradient', 'kingster'),
							'type' => 'combobox',
							'options' => array(
								'default' => esc_html__('Default', 'kingster'),
								'both' => esc_html__('Both', 'kingster'),
								'top' => esc_html__('Top', 'kingster'),
								'bottom' => esc_html__('Bottom', 'kingster'),
								'disable' => esc_html__('None', 'kingster'),
							)
						),
						'title-background-overlay-opacity' => array(
							'title' => esc_html__('Page Title Background Overlay Opacity', 'kingster'),
							'type' => 'text',
							'description' => esc_html__('Fill the number between 0.01 - 1 ( Leave Blank For Default Value )', 'kingster'),
							'condition' => array( 'title-style' => 'custom' )
						),
						'breadcrumbs-padding' => array(
							'title' => esc_html__('Breadcrumbs Padding', 'kingster'),
							'type' => 'custom',
							'item-type' => 'padding',
							'data-input-type' => 'pixel',
							'options' => array('padding-top', 'padding-bottom'),
							'wrapper-class' => 'gdlr-core-fullsize gdlr-core-no-link gdlr-core-large',
							'condition' => array( 'title-style' => 'custom' )
						),
						'title-color' => array(
							'title' => esc_html__('Page Title Color', 'kingster'),
							'type' => 'colorpicker',
						),
						'caption-color' => array(
							'title' => esc_html__('Page Caption Color', 'kingster'),
							'type' => 'colorpicker',
						),
						'title-background-overlay-color' => array(
							'title' => esc_html__('Page Background Overlay Color', 'kingster'),
							'type' => 'colorpicker',
						),
					)

				);
			}

			return $options;
		}
	}

	function enqueue_my_custom_script() {
	    wp_enqueue_script( 'jquery-for-courses', 'https://summeronline.nd.edu/jquery-for-courses.js', false );
	}

	add_action( 'wp_enqueue_scripts', 'enqueue_my_custom_script' );
