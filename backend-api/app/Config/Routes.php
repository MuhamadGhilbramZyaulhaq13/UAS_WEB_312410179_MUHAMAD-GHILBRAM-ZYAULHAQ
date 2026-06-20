<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->options('(:any)', function() { return ''; });
$routes->get('/', 'Home::index');
// Route untuk Login
$routes->post('login', 'Auth::login');

// Route Kategori Terbuka 
$routes->get('kategori', 'Kategori::index');
$routes->get('kategori/(:num)', 'Kategori::show/$1');

// Route Kategori Terproteksi 
$routes->post('kategori', 'Kategori::create', ['filter' => 'token']);
$routes->put('kategori/(:num)', 'Kategori::update/$1', ['filter' => 'token']);
$routes->delete('kategori/(:num)', 'Kategori::delete/$1', ['filter' => 'token']);

// Route Pengaduan Terbuka 
$routes->get('pengaduan', 'Pengaduan::index');
$routes->get('pengaduan/(:num)', 'Pengaduan::show/$1');

// Route Pengaduan Terproteksi 
$routes->post('pengaduan/create', 'Pengaduan::create', ['filter' => 'token']);
$routes->put('pengaduan/(:segment)', 'Pengaduan::update/$1', ['filter' => 'token']);
$routes->delete('pengaduan/(:segment)', 'Pengaduan::delete/$1', ['filter' => 'token']);

// Route Kelola Pengguna 
$routes->get('users', 'Users::index', ['filter' => 'token']);
$routes->post('users', 'Users::create', ['filter' => 'token']);
$routes->delete('users/(:num)', 'Users::delete/$1', ['filter' => 'token']);