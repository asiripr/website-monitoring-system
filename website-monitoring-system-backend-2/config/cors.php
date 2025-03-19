<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie','register','websites', 'login', 'mroles', 'monitoring-logs/*', 'user', 'user/*', 'dashboard', 'users','add-website', 'monitoring-logs', 'manage-users', 'manage-users/*', 'roles'], // allow API and CSRF routes
    'allowed_methods' => ['*'], // allow all methods (GET, POST, etc.)
    'allowed_origins' => ['http://127.0.0.1:5173', 'http://localhost:5173'], // allow frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // required for Sanctum authentication
];