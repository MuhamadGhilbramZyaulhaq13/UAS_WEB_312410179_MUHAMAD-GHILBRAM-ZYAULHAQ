<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Kategori extends ResourceController
{
    protected $modelName = 'App\Models\KategoriModel';
    protected $format    = 'json';

    // GET /kategori -> Menampilkan semua data
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    // GET /kategori/1 -> Menampilkan 1 data
    public function show($id = null)
    {
        $data = $this->model->find($id);
        return $data ? $this->respond($data) : $this->failNotFound('Data tidak ditemukan');
    }

    // POST /kategori -> Tambah data baru (Terlindungi Token)
    public function create()
    {
        // Mengambil data JSON yang dikirim dari VueJS nanti
        $data = $this->request->getJSON(true) ?? $this->request->getPost(); 
        
        if (!$this->model->save($data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respondCreated(['status' => 201, 'message' => 'Kategori berhasil ditambahkan']);
    }

    // PUT /kategori/1 -> Update data (Terlindungi Token)
    public function update($id = null)
    {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }
        return $this->respond(['status' => 200, 'message' => 'Kategori berhasil diubah']);
    }

    // DELETE /kategori/1 -> Hapus data (Terlindungi Token)
    public function delete($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data tidak ditemukan');
        }
        $this->model->delete($id);
        return $this->respondDeleted(['status' => 200, 'message' => 'Kategori berhasil dihapus']);
    }
}