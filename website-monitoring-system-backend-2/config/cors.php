<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie',  'register', 'login'], // ✅ Allow API and CSRF routes
    'allowed_methods' => ['*'], // ✅ Allow all methods (GET, POST, etc.)
    'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:8000'], // ✅ Allow frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // ✅ Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // ✅ Required for Sanctum authentication
];