<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PengaduanModel;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Pengaduan extends ResourceController
{

    public function index()
    {
        $model = new PengaduanModel();
       
        $laporan = $model->select('pengaduan.*, users.nama as pelapor')
                         ->join('users', 'users.id = pengaduan.user_id', 'left')
                         ->orderBy('pengaduan.created_at', 'DESC')
                         ->findAll();

        $dataFormatted = array_map(function($row) {
            return [
                'db_id'     => $row['id'],                 // ID angka untuk keperluan hapus/update
                'id'        => $row['kode_laporan'],       // ID unik string (ADU-XXXX) untuk tampilan
                'pelapor'   => $row['pelapor'] ?? 'Anonim', // Jika nama tidak ada, jadikan 'Anonim'
                'judul'     => $row['judul'],
                'kategori'  => $row['kategori'],
                'deskripsi' => $row['deskripsi'],
                'status'    => $row['status'],
                'date'      => $row['created_at'],
                'lampiran'  => $row['lampiran'] ? base_url('uploads/' . $row['lampiran']) : null
            ];
        }, $laporan);

        return $this->respond($dataFormatted);
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
        $fileFoto = $this->request->getFile('lampiran');
        $namaFoto = null;
        if ($fileFoto && $fileFoto->isValid() && !$fileFoto->hasMoved()) {
            $namaFoto = $fileFoto->getRandomName();
            $fileFoto->move(FCPATH . 'uploads', $namaFoto);
        }
        $kode = 'ADU-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));

        $data = [
            'kode_laporan' => $kode,
            'user_id'      => $user_id_asli, 
            'judul'        => $json->judul ?? '',
            'kategori'     => $json->kategori ?? '',
            'deskripsi'    => $json->deskripsi ?? '',
            'lampiran'     => $namaFoto,
            'status'       => 'pending'
        ];

        if ($model->insert($data)) {
            return $this->respondCreated(['message' => 'Laporan berhasil dikirim', 'kode' => $kode]);
        } else {
            return $this->fail($model->errors());
        }
    }

    
    public function delete($kode_laporan = null)
    {
        $model = new PengaduanModel();
        
        $laporan = $model->where('kode_laporan', $kode_laporan)->first();

        if (!$laporan) {
            return $this->failNotFound("Data laporan dengan ID $kode_laporan tidak ditemukan.");
        }

        if ($model->delete($laporan['id'])) {
            return $this->respondDeleted([
                'status'  => 200,
                'message' => "Laporan $kode_laporan berhasil dihapus secara permanen"
            ]);
        } else {
            return $this->failServerError('Gagal menghapus data dari database.');
        }
    }

    public function update($kode_laporan = null)
    {
        $model = new PengaduanModel();
        
        // Menangkap data JSON yang dikirim (misal: {"status": "in_progress"})
        $json = $this->request->getJSON();

        if (!$json || !isset($json->status)) {
            return $this->failValidationErrors('Data status tidak ditemukan.');
        }

        // 1. Cari laporan berdasarkan kode uniknya
        $laporan = $model->where('kode_laporan', $kode_laporan)->first();

        if (!$laporan) {
            return $this->failNotFound("Data laporan $kode_laporan tidak ditemukan.");
        }

        // 2. Lakukan update status ke database berdasarkan ID asli
        if ($model->update($laporan['id'], ['status' => $json->status])) {
            return $this->respond([
                'status'  => 200,
                'message' => "Status laporan $kode_laporan berhasil diperbarui menjadi " . $json->status
            ]);
        } else {
            return $this->failServerError('Gagal memperbarui status di database.');
        }
    }
}