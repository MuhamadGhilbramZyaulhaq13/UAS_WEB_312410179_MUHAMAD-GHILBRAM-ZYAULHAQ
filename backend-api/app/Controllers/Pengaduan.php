<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PengaduanModel;

class Pengaduan extends ResourceController
{
    public function create()
    {
        $model = new PengaduanModel();
        $json = $this->request->getJSON();

        // 1. Generate Kode Laporan Unik (Format: ADU-YYYYMMDD-Random)
        $kode = 'ADU-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));

        $data = [
            'kode_laporan' => $kode,
            'user_id'      => 1, // Nanti kita ambil dari Token JWT user yang login
            'judul'        => $json->judul,
            'kategori'     => $json->kategori, // Sesuai nama kolom di DB
            'deskripsi'    => $json->deskripsi,
            'status'       => 'pending'
        ];

        if ($model->insert($data)) {
            return $this->respondCreated(['message' => 'Laporan berhasil dikirim', 'kode' => $kode]);
        } else {
            return $this->fail($model->errors());
        }
    }
}