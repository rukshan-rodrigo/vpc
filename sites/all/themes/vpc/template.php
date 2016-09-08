<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

/**
 * Implements hook_js_alter().
 */
function vpc_js_alter(&$javascript) {
  // Use updated jQuery library on all but some paths.
//  $node_admin_paths = [
//    'node/*/edit',
//    'node/add',
//    'node/add/*',
//    'user*'

//  ];
//  $replace_jquery = TRUE;
//  if (path_is_admin(current_path())) {
//    $replace_jquery = FALSE;
//  }
//  else {
//    foreach ($node_admin_paths as $node_admin_path) {
//      if (drupal_match_path(current_path(), $node_admin_path)) {
//        $replace_jquery = FALSE;
//      }
//    }
//  }
//  // Swap out jQuery to use an updated version of the library.
//  if ($replace_jquery) {
//    $javascript['misc/jquery.js']['data'] = '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js';
//  }
}