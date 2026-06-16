<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Pengaduan extends ResourceController
{
    protected $modelName = 'App\Models\PengaduanModel';
    protected $format    = 'json';

    // GET /pengaduan -> Menampilkan semua pengaduan beserta nama & kategori
    public function index()
    {
        return $this->respond($this->model->getPengaduan());
    }

    // GET /pengaduan/1 -> Menampilkan detail 1 pengaduan
    public function show($id = null)
    {
        $data = $this->model->getPengaduan($id);
        return $data ? $this->respond($data) : $this->failNotFound('Data tidak ditemukan');
    }

    // POST /pengaduan -> Tambah laporan baru (Wajib Token)
    public function create()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost(); 
        if (!$this->model->save($data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respondCreated(['status' => 201, 'message' => 'Laporan pengaduan berhasil dikirim']);
    }

    // PUT /pengaduan/1 -> Update status pengaduan (Wajib Token)
    public function update($id = null)
    {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respond(['status' => 200, 'message' => 'Status pengaduan berhasil diperbarui']);
    }

    // DELETE /pengaduan/1 -> Hapus data (Wajib Token)
    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data tidak ditemukan');
        }
        $this->model->delete($id);
        return $this->respondDeleted(['status' => 200, 'message' => 'Laporan pengaduan berhasil dihapus']);
    }
}