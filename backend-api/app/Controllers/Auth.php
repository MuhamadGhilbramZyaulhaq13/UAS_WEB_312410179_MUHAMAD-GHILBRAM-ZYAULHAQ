<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use Firebase\JWT\JWT;

class Auth extends ResourceController
{
    public function login()
    {
        $json = $this->request->getJSON();
        $email = $json->email ?? '';
        $password = $json->password ?? '';

        $userModel = new UserModel();
        $user = $userModel->where('email', $email)->first();

        if (!$user) {
            return $this->failNotFound('Email tidak terdaftar');
        }

        $isPasswordLolos = password_verify($password, $user['password']) || $password === $user['password'];

        if (!$isPasswordLolos) {
            return $this->failUnauthorized('Password salah');
        }

        $key = getenv('JWT_SECRET') ?: 'muhamadghlbramzyaulhaqheriherlambangdanurprasetyawendahaikallukmannurhakimenricosyafalullahardiansyah';
        
        $payload = [
            'iat'  => time(),                      // Waktu token dibuat
            'exp'  => time() + (60 * 60 * 24),     // Token kedaluwarsa dalam 24 jam
            'uid'  => $user['id'],                 // ID user disisipkan ke dalam token
            'role' => $user['role'],               // Peran user (masyarakat/admin)
            'nama' => $user['nama']
        ];

        // Bungkus menjadi token (PENTING: Pastikan kamu sudah menjalankan "composer require firebase/php-jwt" di terminal)
        $token = JWT::encode($payload, $key, 'HS256');

        return $this->respond([
            'message' => 'Login Berhasil',
            'token'   => $token,
            'user'    => [
                'id'   => $user['id'],
                'nama' => $user['nama'],
                'role' => $user['role']
            ]
        ]);
    }
}