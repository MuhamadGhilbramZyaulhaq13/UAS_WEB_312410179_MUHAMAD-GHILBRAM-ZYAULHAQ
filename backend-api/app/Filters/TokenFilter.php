<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $header = $request->getServer('HTTP_AUTHORIZATION');
        $response = service('response');

        if (!$header) {
            return $response->setJSON(['status' => 401, 'error' => 'Akses ditolak. Token tidak ditemukan.'])->setStatusCode(401);
        }

        // Mengambil token dari string "Bearer <token>"
        $token = explode(' ', $header)[1] ?? '';

        try {
            $key = 'ini_adalah_kunci_rahasia_yang_sangat_panjang_dan_aman_sekali_12345';
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
        } catch (\Exception $e) {
            return $response->setJSON(['status' => 401, 'error' => 'Token tidak valid atau sudah kedaluwarsa.'])->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}