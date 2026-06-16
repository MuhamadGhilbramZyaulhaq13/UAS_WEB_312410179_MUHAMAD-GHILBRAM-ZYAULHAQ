<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;
use Firebase\JWT\JWT;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $rules = [
            'email'    => 'required|valid_email',
            'password' => 'required'
        ];

        // Validasi input
        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $model = new UserModel();
        $user = $model->where('email', $this->request->getVar('email'))->first();

        // Jika email tidak ada
        if (!$user) {
            return $this->failNotFound('Email tidak ditemukan');
        }

        // Verifikasi password (menggunakan fungsi bawaan PHP password_verify)
        $verify = password_verify($this->request->getVar('password'), $user['password']);
        if (!$verify) {
            return $this->failUnauthorized('Password salah');
        }

        // Generate JWT Token
        $key = 'ini_adalah_kunci_rahasia_yang_sangat_panjang_dan_aman_sekali_12345';
        $payload = [
            'iat'   => time(),
            'exp'   => time() + 3600, 
            'uid'   => $user['id'],
            'email' => $user['email'],
            'role'  => $user['role']
        ];

        $token = JWT::encode($payload, $key, 'HS256');

        return $this->respond([
            'status'  => 200,
            'message' => 'Login berhasil',
            'token'   => $token,
            'user'    => [
                'id'   => $user['id'],
                'nama' => $user['nama'],
                'role' => $user['role']
            ]
        ]);
    }
}