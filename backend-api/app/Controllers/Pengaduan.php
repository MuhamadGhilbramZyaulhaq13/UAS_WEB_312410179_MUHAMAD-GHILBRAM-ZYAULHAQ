<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PengaduanModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Pengaduan extends ResourceController
{
    // ========================================================
    // GET /pengaduan (Menampilkan data di Dashboard)
    // ========================================================
    public function index()
    {
        $model = new PengaduanModel();
        
        $data = $model->orderBy('created_at', 'DESC')->findAll();
        
        $formattedData = array_map(function($item) {
            return [
                'id'        => $item['kode_laporan'], 
                'judul'     => $item['judul'],
                'deskripsi' => $item['deskripsi'],
                'kategori'  => $item['kategori'],
                'status'    => $item['status'],
                'date'      => $item['created_at']    
            ];
        }, $data);

        return $this->respond($formattedData);
    }

    // ========================================================
    // POST /pengaduan/create (Menyimpan data dari Dashboard)
    // ========================================================
    public function create()
    {
        $model = new PengaduanModel();
        $json = $this->request->getJSON();

        if (!$json) {
            return $this->failValidationErrors('Data JSON tidak terbaca.');
        }
         
        $header = $this->request->getHeaderLine('Authorization');
        
        if (empty($header)) {
            return $this->failUnauthorized('Token tidak ditemukan di header');
        }

        $token = null;
        if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
            $token = $matches[1];
        }

        if (!$token) {
            return $this->failUnauthorized('Format token tidak valid');
        }

        try {
            $key = getenv('JWT_SECRET') ?: 'muhamadghlbramzyaulhaqheriherlambangdanurprasetyawendahaikallukmannurhakimenricosyafalullahardiansyah';
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $user_id_asli = $decoded->uid; 
        } catch (\Exception $e) {
            return $this->failUnauthorized('Token tidak valid atau telah kedaluwarsa: ' . $e->getMessage());
        }
        // ------------------------------------
        // ------------------------------------

        $kode = 'ADU-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));

        $data = [
            'kode_laporan' => $kode,
            'user_id'      => $user_id_asli, 
            'judul'        => $json->judul ?? '',
            'kategori'     => $json->kategori ?? '',
            'deskripsi'    => $json->deskripsi ?? '',
            'status'       => 'pending'
        ];

        if ($model->insert($data)) {
            return $this->respondCreated(['message' => 'Laporan berhasil dikirim', 'kode' => $kode]);
        } else {
            return $this->fail($model->errors());
        }
    }
}