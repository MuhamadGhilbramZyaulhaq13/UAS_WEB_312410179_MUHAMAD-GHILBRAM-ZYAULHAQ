<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class Users extends ResourceController
{
    // ========================================================
    // GET /users (Menampilkan semua pengguna)
    // ========================================================
    public function index()
    {
        $model = new UserModel();
        $users = $model->orderBy('id', 'DESC')->findAll();
        
        // PENTING: Kita hapus password dari data balasan demi keamanan!
        $safeUsers = array_map(function($user) {
            unset($user['password']);
            return $user;
        }, $users);

        return $this->respond($safeUsers);
    }

    // ========================================================
    // POST /users (Menambahkan pengguna/admin baru)
    // ========================================================
    public function create()
    {
        $model = new UserModel();
        $json = $this->request->getJSON();

        if (!$json || empty($json->email) || empty($json->password)) {
            return $this->failValidationErrors('Email dan Password wajib diisi!');
        }

        // Cek apakah email sudah terdaftar sebelumnya
        if ($model->where('email', $json->email)->first()) {
            return $this->failResourceExists('Email ini sudah terdaftar di sistem.');
        }

        // Enkripsi password menggunakan BCRYPT standar industri
        $hashedPassword = password_hash($json->password, PASSWORD_BCRYPT);

        $data = [
            'nama'     => $json->nama ?? 'User Tanpa Nama',
            'email'    => $json->email,
            'password' => $hashedPassword,
            'role'     => $json->role ?? 'masyarakat' // Default role
        ];

        if ($model->insert($data)) {
            return $this->respondCreated(['message' => 'Pengguna berhasil ditambahkan!']);
        } else {
            return $this->failServerError('Gagal menyimpan ke database.');
        }
    }

    // ========================================================
    // DELETE /users/1 (Menghapus akun pengguna)
    // ========================================================
    public function delete($id = null)
    {
        $model = new UserModel();
        
        // Pastikan user ada sebelum dihapus
        if (!$model->find($id)) {
            return $this->failNotFound("Pengguna dengan ID $id tidak ditemukan.");
        }

        if ($model->delete($id)) {
            return $this->respondDeleted(['message' => 'Pengguna berhasil dihapus secara permanen.']);
        } else {
            return $this->failServerError('Gagal menghapus pengguna.');
        }
    }
}