<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Search Engine
    |--------------------------------------------------------------------------
    |
    | This option controls the default search connection that gets used while
    | using Laravel Scout. This connection is used when syncing all of
    | your model data to your search engines.
    |
    | Supported: "algolia", "meilisearch", "typesense",
    |            "database", "collection", "null"
    |
    */

    'driver' => env('SCOUT_DRIVER', 'database'),

    /*
    |--------------------------------------------------------------------------
    | Index Prefix
    |--------------------------------------------------------------------------
    |
    | Here you may specify a prefix that will be applied to all search index
    | names used by Scout. This prefix may be useful if you have multiple
    | "tenants" or applications sharing the same search infrastructure.
    |
    */

    'prefix' => env('SCOUT_PREFIX', ''),

    /*
    |--------------------------------------------------------------------------
    | Queue Data Syncing
    |--------------------------------------------------------------------------
    |
    | This option allows you to control if the operations that sync your data
    | with your search engines are queued. When this is set to "true" then
    | all automatic data syncing will be queued for better performance.
    |
    */

    'queue' => env('SCOUT_QUEUE', false),

    /*
    |--------------------------------------------------------------------------
    | Database Engine Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your database search engine settings. This engine
    | uses standard database queries like "LIKE" or full text indexes to
    | search your model records in development or simple deployments.
    |
    */

    'database' => [
        'mode' => 'simple',
    ],

    /*
    |--------------------------------------------------------------------------
    | Chunk Sizes
    |--------------------------------------------------------------------------
    |
    | These options allow you to control the maximum chunk size when you are
    | retrieving models from the database to write them to your search
    | indices. You can increase or decrease these values as necessary.
    |
    */

    'chunk' => [
        'searchable' => 500,
        'unsearchable' => 500,
    ],

    /*
    |--------------------------------------------------------------------------
    | Soft Deletes
    |--------------------------------------------------------------------------
    |
    | This option allows you to enable / disable soft deletes in the search
    | results. This will specify whether the soft deleted models will be
    | searched or not for all search queries.
    |
    */

    'soft_delete' => false,

    /*
    |--------------------------------------------------------------------------
    | Identify User
    |--------------------------------------------------------------------------
    |
    | When set to "true", Scout will identify the authenticated user to the
    | search engine, allowing you to personalize search results.
    |
    */

    'identify' => env('SCOUT_IDENTIFY', false),

];
