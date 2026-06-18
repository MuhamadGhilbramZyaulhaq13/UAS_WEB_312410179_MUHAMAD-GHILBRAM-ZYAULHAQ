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
        $header = $request->getHeaderLine('Authorization');
        $token = null;

        if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
            $token = $matches[1];
        }

        if (is_null($token) || empty($token)) {
            return \Config\Services::response()->setJSON(['message' => 'Akses ditolak: Token tidak ada'])->setStatusCode(401);
        }

        try {
            $key = 'muhamadghlbramzyaulhaqheriherlambangdanurprasetyawendahaikallukmannurhakimenricosyafalullahardiansyah';
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
        } catch (\Exception $e) {
            return $response->setJSON(['status' => 401, 'error' => 'Token tidak valid atau sudah kedaluwarsa.'])->setStatusCode(401);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}