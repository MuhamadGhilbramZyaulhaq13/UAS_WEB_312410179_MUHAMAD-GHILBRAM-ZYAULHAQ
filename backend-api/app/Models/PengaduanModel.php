<?php

namespace App\Models;

use CodeIgniter\Model;

class PengaduanModel extends Model
{
    protected $table            = 'pengaduan';
    protected $primaryKey       = 'id';
    protected $allowedFields    = ['user_id', 'kategori_id', 'judul', 'isi_laporan', 'status'];

    // Fungsi tambahan untuk menggabungkan tabel pengaduan, users, dan kategori
    public function getPengaduan($id = false)
    {
        $this->select('pengaduan.*, users.nama as nama_pelapor, kategori.nama_kategori');
        $this->join('users', 'users.id = pengaduan.user_id');
        $this->join('kategori', 'kategori.id = pengaduan.kategori_id');
        
        if ($id === false) {
            return $this->findAll(); // Tampilkan semua
        }
        
        return $this->where(['pengaduan.id' => $id])->first(); // Tampilkan satu saja
    }
}