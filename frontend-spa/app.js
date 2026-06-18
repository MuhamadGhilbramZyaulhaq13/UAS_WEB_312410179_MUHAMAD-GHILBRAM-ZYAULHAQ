// ========================================================
// 1. DEFINISI KOMPONEN HALAMAN (Skeletons / Placeholder)
// ========================================================

const HomePublic = {
    data() {
        return {
            // Data dummy sementara sebelum kita hubungkan ke Backend CI4
            recentReports: [
                { id: 'ADU-0981', judul: 'Jalan Berlubang di Pusat Kota', deskripsi: 'Terdapat lubang besar yang membahayakan pengendara di pertigaan lampu merah. Sudah ada 2 motor yang jatuh.', kategori: 'Infrastruktur', status: 'resolved', date: '18 Jun 2026, 08:30' },
                { id: 'ADU-0980', judul: 'Pungli di Kantor Pelayanan', deskripsi: 'Oknum petugas meminta biaya tambahan tanpa kuitansi resmi saat pengurusan dokumen kependudukan.', kategori: 'Pelayanan Publik', status: 'in_progress', date: '17 Jun 2026, 14:15' },
                { id: 'ADU-0979', judul: 'Lampu Penerangan Mati', deskripsi: 'Lampu taman kota sudah mati selama seminggu, area menjadi gelap dan rawan kejahatan di malam hari.', kategori: 'Fasilitas Umum', status: 'pending', date: '17 Jun 2026, 09:00' },
                { id: 'ADU-0978', judul: 'Laporan Fiktif Coba-coba', deskripsi: 'Tes aplikasi e-report apakah berfungsi dengan baik atau tidak.', kategori: 'Lainnya', status: 'rejected', date: '16 Jun 2026, 11:20' }
            ]
        };
    },
    methods: {
        // Fungsi untuk memberikan warna badge secara dinamis sesuai prinsip HCI
        getStatusBadge(status) {
            const badges = {
                'pending': 'bg-cyan-100 text-info border-cyan-200', // Info / Diterima
                'in_progress': 'bg-amber-100 text-warning border-amber-200', // Warning / Diproses
                'resolved': 'bg-green-100 text-success border-green-200', // Success / Selesai
                'rejected': 'bg-red-100 text-danger border-red-200' // Danger / Ditolak
            };
            return badges[status] || 'bg-gray-100 text-gray-600 border-gray-200';
        },
        translateStatus(status) {
            const translations = {
                'pending': 'Diterima',
                'in_progress': 'Diproses',
                'resolved': 'Selesai',
                'rejected': 'Ditolak'
            };
            return translations[status] || status;
        }
    },
    template: `
        <div class="min-h-screen flex flex-col bg-background">
            
            <nav class="bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
                <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold font-heading">e</div>
                        <span class="font-heading font-bold text-xl text-primary-dark tracking-tight">Report</span>
                    </div>
                    <div class="flex items-center gap-6">
                        <router-link to="/admin/login" class="hidden md:block text-sm font-medium text-text-secondary hover:text-admin transition-colors">
                            Masuk sebagai Admin
                        </router-link>
                        <router-link to="/login" class="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-[8px] hover:bg-primary-dark shadow-soft transition-all transform hover:-translate-y-0.5">
                            Masuk / Daftar
                        </router-link>
                    </div>
                </div>
            </nav>

            <section class="pt-24 pb-20 px-6 text-center relative overflow-hidden">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-light rounded-full blur-3xl opacity-50 -z-10"></div>
                
                <div class="max-w-3xl mx-auto">
                    <h1 class="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight mb-6">
                        Suara Anda Membangun <br/>
                        <span class="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-info">Perubahan Nyata</span>
                    </h1>
                    <p class="text-text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
                        Platform resmi pengaduan masyarakat. Sampaikan laporan, aspirasi, dan keluhan Anda dengan aman, transparan, dan dapat dilacak kapan saja.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <router-link to="/login" class="bg-primary text-white text-base font-semibold px-8 py-3.5 rounded-[8px] hover:bg-primary-dark shadow-soft transition-all transform hover:-translate-y-0.5">
                            Mulai Buat Laporan
                        </router-link>
                        <a href="#timeline" class="bg-surface border border-border text-text-primary text-base font-semibold px-8 py-3.5 rounded-[8px] hover:bg-gray-50 transition-all">
                            Lihat Timeline
                        </a>
                    </div>
                </div>
            </section>

            <section id="timeline" class="py-16 px-6 bg-surface flex-grow border-t border-border">
                <div class="max-w-4xl mx-auto">
                    <div class="flex justify-between items-end mb-8 border-b border-border pb-4">
                        <div>
                            <h2 class="font-heading text-2xl font-bold text-text-primary">Timeline Aduan Publik</h2>
                            <p class="text-text-secondary text-sm mt-1">Daftar laporan terbaru yang masuk ke dalam sistem.</p>
                        </div>
                        <div class="hidden sm:flex items-center gap-2 text-sm text-info font-medium">
                            <span class="relative flex h-3 w-3">
                              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-info opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-3 w-3 bg-info"></span>
                            </span>
                            Live Update
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div v-for="aduan in recentReports" :key="aduan.id" class="p-5 bg-background rounded-[12px] border border-border shadow-soft flex flex-col md:flex-row gap-5 hover:shadow-md transition-shadow group">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-3">
                                    <span class="font-mono text-sm text-text-secondary font-medium">{{ aduan.id }}</span>
                                    <span :class="getStatusBadge(aduan.status)" class="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border">
                                        {{ translateStatus(aduan.status) }}
                                    </span>
                                    <span class="text-sm text-text-secondary ml-auto md:ml-0">{{ aduan.date }}</span>
                                </div>
                                <h3 class="font-heading text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{{ aduan.judul }}</h3>
                                <p class="text-text-secondary text-sm line-clamp-2 leading-relaxed">{{ aduan.deskripsi }}</p>
                                <div class="mt-4 inline-flex items-center bg-surface border border-border text-xs px-2.5 py-1 rounded-[6px] text-text-secondary font-medium">
                                    <svg class="w-3.5 h-3.5 mr-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>
                                    {{ aduan.kategori }}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center mt-8">
                        <router-link to="/login" class="text-primary font-medium hover:underline">Masuk untuk melihat laporan lebih lengkap &rarr;</router-link>
                    </div>
                </div>
            </section>

            <footer class="bg-surface border-t border-border py-8 px-6 text-center">
                <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-text-secondary text-sm font-medium">&copy; 2026 e-Report System. Hak Cipta Dilindungi.</p>
                    <div class="flex gap-4 text-sm text-text-secondary">
                        <a href="#" class="hover:text-primary transition-colors">Bantuan</a>
                        <a href="#" class="hover:text-primary transition-colors">Kebijakan Privasi</a>
                        <a href="#" class="hover:text-primary transition-colors">Ketentuan Layanan</a>
                    </div>
                </div>
            </footer>

        </div>
    `
};
// ==========================================
// HALAMAN LOGIN MASYARAKAT
// ==========================================
const LoginMasyarakat = {
    data() {
        return {
            email: '',
            password: '',
            isLoading: false
        };
    },
    methods: {
        async handleLogin() {
            this.isLoading = true;
            try {
                // Mengirim email & password yang diketik user ke backend CI4
                const response = await axios.post('http://localhost:8080/login', {
                    email: this.email,
                    password: this.password
                });

                // Jika backend bilang OK, simpan kunci (token) dan data penting ke memori browser
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.user.role);
                localStorage.setItem('nama', response.data.user.nama); // Opsional agar nama di navbar bisa berubah

                alert('Berhasil Masuk!');
                
                // Arahkan ke dashboard masyarakat
                this.$router.push('/dashboard'); 
                
            } catch (error) {
                console.error("Gagal Login:", error);
                // Tangkap pesan error dari CI4 (jika email tidak terdaftar atau password salah)
                const pesanError = error.response?.data?.messages?.error || 'Login Gagal, periksa koneksi Anda.';
                alert(pesanError);
            } finally {
                this.isLoading = false;
            }
        }
    },
    template: `
        <div class="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8 bg-background">
            <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <router-link to="/" class="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                    <div class="w-10 h-10 rounded bg-primary flex items-center justify-center text-white font-bold font-heading text-lg">e</div>
                    <span class="font-heading font-bold text-2xl text-primary-dark tracking-tight">Report</span>
                </router-link>
                <h2 class="text-center text-2xl font-bold font-heading text-text-primary">Masuk ke Akun Anda</h2>
                <p class="mt-2 text-center text-sm text-text-secondary">
                    Atau 
                    <router-link to="/register" class="font-medium text-primary hover:text-primary-dark transition-colors">daftar akun baru sekarang</router-link>
                </p>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-surface py-8 px-6 shadow-soft border border-border rounded-[12px] sm:px-10">
                    <form class="space-y-5" @submit.prevent="handleLogin">
                        <div>
                            <label for="email" class="block text-sm font-medium text-text-primary mb-1.5">Alamat Email</label>
                            <input id="email" v-model="email" type="email" required 
                                class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" 
                                placeholder="nama@email.com">
                        </div>

                        <div>
                            <div class="flex items-center justify-between mb-1.5">
                                <label for="password" class="block text-sm font-medium text-text-primary">Password</label>
                                <a href="#" class="text-sm font-medium text-primary hover:text-primary-dark transition-colors">Lupa password?</a>
                            </div>
                            <input id="password" v-model="password" type="password" required 
                                class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" 
                                placeholder="••••••••">
                        </div>

                        <div class="pt-2">
                            <button type="submit" :disabled="isLoading" 
                                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-[8px] shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                                {{ isLoading ? 'Memproses...' : 'Masuk' }}
                            </button>
                        </div>

                        <div class="text-center mt-6">
                            <router-link to="/" class="text-sm font-medium text-text-secondary hover:text-admin transition-colors">&larr; Kembali ke Halaman Publik</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
};

// ==========================================
// HALAMAN REGISTER MASYARAKAT
// ==========================================
const RegisterMasyarakat = {
    data() {
        return {
            form: { nama: '', email: '', password: '', confirm_password: '', telepon: '' },
            isLoading: false
        };
    },
    methods: {
        handleRegister() {
            if(this.form.password !== this.form.confirm_password) {
                alert('Password dan Konfirmasi Password tidak sama!');
                return;
            }
            
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false;
                alert('Simulasi Register Berhasil! Arahkan ke halaman login.');
                this.$router.push('/login');
            }, 1000);
        }
    },
    template: `
        <div class="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8 bg-background">
            <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <router-link to="/" class="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                    <div class="w-10 h-10 rounded bg-primary flex items-center justify-center text-white font-bold font-heading text-lg">e</div>
                    <span class="font-heading font-bold text-2xl text-primary-dark tracking-tight">Report</span>
                </router-link>
                <h2 class="text-center text-2xl font-bold font-heading text-text-primary">Buat Akun Baru</h2>
                <p class="mt-2 text-center text-sm text-text-secondary">
                    Sudah punya akun? 
                    <router-link to="/login" class="font-medium text-primary hover:text-primary-dark transition-colors">Masuk di sini</router-link>
                </p>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md mb-12">
                <div class="bg-surface py-8 px-6 shadow-soft border border-border rounded-[12px] sm:px-10">
                    <form class="space-y-5" @submit.prevent="handleRegister">
                        
                        <div>
                            <label class="block text-sm font-medium text-text-primary mb-1.5">Nama Lengkap</label>
                            <input v-model="form.nama" type="text" required 
                                class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" placeholder="Budi Santoso">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-text-primary mb-1.5">Alamat Email</label>
                            <input v-model="form.email" type="email" required 
                                class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" placeholder="budi@email.com">
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-text-primary mb-1.5">Nomor Telepon <span class="text-text-secondary font-normal">(Opsional)</span></label>
                            <input v-model="form.telepon" type="tel" 
                                class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" placeholder="08123456789">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-text-primary mb-1.5">Password</label>
                                <input v-model="form.password" type="password" required minlength="6"
                                    class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" placeholder="••••••••">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-text-primary mb-1.5">Konfirmasi</label>
                                <input v-model="form.confirm_password" type="password" required minlength="6"
                                    class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm" placeholder="••••••••">
                            </div>
                        </div>

                        <div class="pt-4">
                            <button type="submit" :disabled="isLoading" 
                                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-[8px] shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                                {{ isLoading ? 'Memproses...' : 'Daftar Akun' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `
};

// ==========================================
// HALAMAN LOGIN ADMIN
// ==========================================
const LoginAdmin = {
    data() {
        return {
            username: '',
            password: '',
            isLoading: false
        };
    },
    methods: {
        handleLogin() {
            this.isLoading = true;
            
            // Simulasi proses verifikasi admin
            setTimeout(() => {
                this.isLoading = false;
                
                // AKTIFKAN KODE DI BAWAH INI:
                // Simpan token dan set role sebagai 'admin'
                localStorage.setItem('token', 'dummy-admin-token');
                localStorage.setItem('role', 'admin');
                
                // Arahkan ke Dashboard Admin
                this.$router.push('/admin/dashboard'); 
                
            }, 1000);
        }
    },
    template: `
        <div class="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-8 bg-slate-50">
            <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div class="flex justify-center items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-lg bg-admin flex items-center justify-center text-white font-bold font-heading text-xl shadow-md">e</div>
                    <div class="text-left flex flex-col justify-center">
                        <span class="font-heading font-extrabold text-2xl text-admin tracking-tight leading-none">Report</span>
                        <span class="text-[10px] font-bold text-white bg-admin px-2 py-0.5 rounded uppercase tracking-widest mt-1 inline-block w-max">Portal Admin</span>
                    </div>
                </div>
                <h2 class="text-center text-2xl font-bold font-heading text-text-primary">Otorisasi Sistem</h2>
                <p class="mt-2 text-center text-sm text-text-secondary">
                    Masuk menggunakan kredensial administrator Anda.
                </p>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-surface py-8 px-6 shadow-soft border-t-4 border-t-admin border-x border-b border-border rounded-b-[12px] rounded-t-[4px] sm:px-10">
                    <form class="space-y-6" @submit.prevent="handleLogin">
                        
                        <div>
                            <label for="username" class="block text-sm font-medium text-text-primary mb-1.5">Username atau Email</label>
                            <input id="username" v-model="username" type="text" required 
                                class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-admin focus:border-admin transition-all text-sm" 
                                placeholder="admin@ereport.com">
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-text-primary mb-1.5">Password</label>
                            <input id="password" v-model="password" type="password" required 
                                class="w-full px-4 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-admin focus:border-admin transition-all text-sm" 
                                placeholder="••••••••">
                        </div>

                        <div class="pt-2">
                            <button type="submit" :disabled="isLoading" 
                                class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-[8px] shadow-sm text-sm font-semibold text-white bg-admin hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-admin transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                                {{ isLoading ? 'Memverifikasi...' : 'Masuk ke Dashboard' }}
                            </button>
                        </div>
                        
                        <div class="text-center mt-6">
                            <router-link to="/" class="text-sm font-medium text-text-secondary hover:text-admin transition-colors">&larr; Kembali ke Halaman Publik</router-link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    `
};
// ==========================================
// DASHBOARD MASYARAKAT
// ==========================================
const DashboardMasyarakat = {
    data() {
        return {
            userName: 'Budi Santoso',
            form: {
                judul: '',
                kategori: '',
                deskripsi: '',
                lampiran: null
            },
            isSubmitting: false,
            // 1. Kosongkan data dummy, biarkan array kosong untuk diisi dari database
            riwayat: [] 
        };
    },
    // 2. Gunakan mounted agar saat halaman dibuka, Vue otomatis mengambil data dari CI4
    mounted() {
        this.loadRiwayat();
    },
    methods: {
        handleFileUpload(event) {
            this.form.lampiran = event.target.files[0];
        },
        
        // 1. Fungsi mengambil data dari database (GET)
        async loadRiwayat() {
            try {
                // Ambil token dari memori browser
                const token = localStorage.getItem('token');
                
                // Sisipkan token ke dalam Header Authorization
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                // Kirim request beserta config token-nya
                const response = await axios.get('http://localhost:8080/pengaduan', config);
                this.riwayat = response.data; 
                
            } catch (error) {
                console.error("Gagal mengambil data riwayat:", error);
                if (error.response && error.response.status === 401) {
                    alert("Sesi Anda telah habis. Silakan login kembali.");
                    this.logout(); // Paksa keluar jika token tidak valid/kedaluwarsa
                }
            }
        },

        // 2. Fungsi mengirim data ke database (POST)
        async submitLaporan() {
            this.isSubmitting = true;
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const payload = {
                    judul: this.form.judul,
                    kategori: this.form.kategori,
                    deskripsi: this.form.deskripsi
                };

                // Tambahkan parameter config di urutan ketiga untuk method POST
                const response = await axios.post('http://localhost:8080/pengaduan/create', payload, config);
                
                alert('Laporan berhasil dikirim dan masuk ke database!');
                
                // Reset Form
                this.form.judul = '';
                this.form.kategori = '';
                this.form.deskripsi = '';
                this.form.lampiran = null;
                if(this.$refs.fileInput) this.$refs.fileInput.value = '';
                
                // Ambil ulang data
                this.loadRiwayat();
                
            } catch (error) {
                console.error("Gagal mengirim laporan:", error);
                alert('Gagal mengirim laporan. Sesi mungkin telah habis.');
            } finally {
                this.isSubmitting = false;
            }
        },
        
        logout() {
            if(confirm('Apakah Anda yakin ingin keluar?')) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                this.$router.push('/login');
            }
        },
        getStatusBadge(status) {
            const badges = {
                'pending': 'bg-cyan-100 text-info border-cyan-200',
                'in_progress': 'bg-amber-100 text-warning border-amber-200',
                'resolved': 'bg-green-100 text-success border-green-200',
                'rejected': 'bg-red-100 text-danger border-red-200'
            };
            return badges[status] || 'bg-gray-100 text-gray-600 border-gray-200';
        },
        translateStatus(status) {
            const translations = { 'pending': 'Diterima', 'in_progress': 'Diproses', 'resolved': 'Selesai', 'rejected': 'Ditolak' };
            return translations[status] || status;
        }
    },
    template: `
        <div class="min-h-screen bg-background flex flex-col">
            
            <!-- NAVBAR KHUSUS DASHBOARD -->
            <nav class="bg-surface border-b border-border sticky top-0 z-50">
                <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold font-heading">e</div>
                        <span class="font-heading font-bold text-xl text-primary-dark tracking-tight">Report</span>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="hidden md:flex items-center gap-2 text-sm text-text-primary font-medium border-r border-border pr-4">
                            <div class="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold">
                                {{ userName.charAt(0) }}
                            </div>
                            {{ userName }}
                        </div>
                        <button @click="logout" class="text-sm font-medium text-danger hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors">
                            Keluar
                        </button>
                    </div>
                </div>
            </nav>

            <!-- KONTEN UTAMA -->
            <main class="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    <!-- KIRI: FORM TAMBAH ADUAN (Kolom: 4/12) -->
                    <div class="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                        <div class="bg-surface rounded-[12px] p-6 shadow-soft border border-border">
                            <h2 class="font-heading text-lg font-bold text-text-primary mb-1">Buat Laporan Baru</h2>
                            <p class="text-sm text-text-secondary mb-5">Sampaikan laporan Anda dengan detail dan jelas.</p>
                            
                            <form @submit.prevent="submitLaporan" class="space-y-4">
                                <!-- Judul -->
                                <div>
                                    <label class="block text-sm font-medium text-text-primary mb-1.5">Judul Laporan</label>
                                    <input v-model="form.judul" type="text" required 
                                        class="w-full px-3 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm" 
                                        placeholder="Contoh: Lampu Jalan Mati di Jl. Merdeka">
                                </div>

                                <!-- Kategori -->
                                <div>
                                    <label class="block text-sm font-medium text-text-primary mb-1.5">Kategori</label>
                                    <select v-model="form.kategori" required 
                                        class="w-full px-3 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm appearance-none">
                                        <option value="" disabled selected>-- Pilih Kategori --</option>
                                        <option value="Infrastruktur">Infrastruktur & Fasilitas Umum</option>
                                        <option value="Pelayanan Publik">Pelayanan Publik</option>
                                        <option value="Keamanan">Keamanan & Ketertiban</option>
                                        <option value="Lingkungan">Lingkungan Hidup</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>

                                <!-- Deskripsi -->
                                <div>
                                    <label class="block text-sm font-medium text-text-primary mb-1.5">Deskripsi Lengkap</label>
                                    <textarea v-model="form.deskripsi" required rows="4" 
                                        class="w-full px-3 py-2.5 bg-background border border-border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm resize-none" 
                                        placeholder="Ceritakan kronologi, lokasi spesifik, atau detail lainnya..."></textarea>
                                </div>

                                <!-- Upload Foto (Opsional) -->
                                <div>
                                    <label class="block text-sm font-medium text-text-primary mb-1.5">Foto/Dokumen Pendukung <span class="text-text-secondary font-normal">(Opsional)</span></label>
                                    <input type="file" @change="handleFileUpload" ref="fileInput" accept="image/*,.pdf"
                                        class="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-[6px] file:border-0 file:text-sm file:font-semibold file:bg-primary-light file:text-primary hover:file:bg-blue-100 transition-colors">
                                </div>

                                <!-- Submit Button -->
                                <div class="pt-2">
                                    <button type="submit" :disabled="isSubmitting" 
                                        class="w-full flex justify-center py-2.5 px-4 rounded-[8px] shadow-sm text-sm font-semibold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                                        {{ isSubmitting ? 'Mengirim...' : 'Kirim Aduan' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- KANAN: RIWAYAT ADUAN SAYA (Kolom: 8/12) -->
                    <div class="lg:col-span-8">
                        <h2 class="font-heading text-xl font-bold text-text-primary mb-5">Riwayat Aduan Saya</h2>
                        
                        <!-- Jika ada riwayat -->
                        <div v-if="riwayat.length > 0" class="space-y-4">
                            <div v-for="item in riwayat" :key="item.id" class="bg-surface rounded-[12px] p-5 shadow-soft border border-border flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow">
                                <div class="flex-1">
                                    <div class="flex flex-wrap items-center gap-3 mb-2">
                                        <span class="font-mono text-sm text-text-secondary font-medium">{{ item.id }}</span>
                                        <span :class="getStatusBadge(item.status)" class="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border">
                                            {{ translateStatus(item.status) }}
                                        </span>
                                        <span class="text-sm text-text-secondary ml-auto sm:ml-0">{{ item.date }}</span>
                                    </div>
                                    <h3 class="font-heading text-lg font-bold text-text-primary mb-2">{{ item.judul }}</h3>
                                    <p class="text-text-secondary text-sm leading-relaxed mb-3">{{ item.deskripsi }}</p>
                                    <div class="inline-flex items-center bg-background border border-border text-xs px-2.5 py-1 rounded-[6px] text-text-secondary font-medium">
                                        {{ item.kategori }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Jika belum ada laporan (Empty State) -->
                        <div v-else class="bg-surface rounded-[12px] p-10 shadow-soft border border-border text-center flex flex-col items-center justify-center">
                            <div class="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                                <svg class="w-8 h-8 text-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            </div>
                            <h3 class="font-heading text-lg font-bold text-text-primary mb-1">Belum Ada Laporan</h3>
                            <p class="text-sm text-text-secondary max-w-sm">Anda belum pernah mengirimkan laporan pengaduan. Silakan gunakan formulir di samping untuk membuat laporan pertama Anda.</p>
                        </div>

                    </div>

                </div>
            </main>

        </div>
    `
};

// ==========================================
// DASHBOARD ADMIN
// ==========================================
const DashboardAdmin = {
    data() {
        return {
            adminName: 'Administrator',
            isSidebarOpen: false, // Untuk toggle di tampilan mobile
            searchQuery: '',
            filterStatus: '',
            // Dummy Data Laporan (Semua user)
            semuaLaporan: [
                { id: 'ADU-0985', pelapor: 'Budi Santoso', judul: 'Jalan Berlubang di Depan Rumah', kategori: 'Infrastruktur', status: 'pending', date: '18 Jun 2026' },
                { id: 'ADU-0982', pelapor: 'Siti Aminah', judul: 'Layanan KTP Terlambat', kategori: 'Pelayanan Publik', status: 'in_progress', date: '17 Jun 2026' },
                { id: 'ADU-0980', pelapor: 'Ahmad Faisal', judul: 'Pungli di Kantor Pelayanan', kategori: 'Pelayanan Publik', status: 'in_progress', date: '17 Jun 2026' },
                { id: 'ADU-0979', pelapor: 'Dian Sastro', judul: 'Lampu Penerangan Mati', kategori: 'Fasilitas Umum', status: 'resolved', date: '16 Jun 2026' },
                { id: 'ADU-0978', pelapor: 'Reza Rahardian', judul: 'Laporan Fiktif Coba-coba', kategori: 'Lainnya', status: 'rejected', date: '16 Jun 2026' }
            ]
        };
    },
    computed: {
        // Fitur Filter & Search secara Real-time (Frontend)
        filteredLaporan() {
            return this.semuaLaporan.filter(item => {
                const matchSearch = item.judul.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                                    item.id.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchStatus = this.filterStatus === '' || item.status === this.filterStatus;
                return matchSearch && matchStatus;
            });
        },
        // Kalkulasi Statistik
        statTotal() { return this.semuaLaporan.length; },
        statBaru() { return this.semuaLaporan.filter(i => i.status === 'pending').length; },
        statProses() { return this.semuaLaporan.filter(i => i.status === 'in_progress').length; },
        statSelesai() { return this.semuaLaporan.filter(i => i.status === 'resolved').length; }
    },
    methods: {
        logout() {
            if(confirm('Akhiri sesi Admin Anda?')) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                this.$router.push('/admin/login');
            }
        },
        hapusLaporan(id) {
            // Prinsip HCI: Error Prevention & User Control (Konfirmasi Hapus)
            if(confirm(`PERINGATAN!\n\nApakah Anda yakin ingin MENGHAPUS permanen laporan dengan ID: ${id}?`)) {
                this.semuaLaporan = this.semuaLaporan.filter(item => item.id !== id);
                alert(`Laporan ${id} berhasil dihapus.`);
            }
        },
        ubahStatus(id) {
            alert(`Membuka modal edit untuk laporan ${id}... (Fitur ini akan kita buat terpisah)`);
        },
        getStatusBadge(status) {
            const badges = {
                'pending': 'bg-cyan-100 text-info border-cyan-200',
                'in_progress': 'bg-amber-100 text-warning border-amber-200',
                'resolved': 'bg-green-100 text-success border-green-200',
                'rejected': 'bg-red-100 text-danger border-red-200'
            };
            return badges[status] || 'bg-gray-100 text-gray-600';
        },
        translateStatus(status) {
            const trans = { 'pending': 'Baru', 'in_progress': 'Diproses', 'resolved': 'Selesai', 'rejected': 'Ditolak' };
            return trans[status] || status;
        }
    },
    template: `
        <div class="min-h-screen flex bg-background">
            
            <!-- 1. SIDEBAR (Fixed Desktop, Collapsible Mobile) -->
            <aside :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'" class="fixed inset-y-0 left-0 z-40 w-64 bg-admin text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col shadow-xl">
                <!-- Header Sidebar -->
                <div class="h-16 flex items-center justify-center border-b border-indigo-700/50 px-6">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded bg-white flex items-center justify-center text-admin font-bold font-heading text-lg">e</div>
                        <span class="font-heading font-bold text-xl tracking-tight">Admin Portal</span>
                    </div>
                </div>
                
                <!-- Menu Navigasi -->
                <nav class="flex-1 px-4 py-6 space-y-2">
                    <a href="#" class="flex items-center gap-3 px-4 py-3 bg-indigo-700/50 rounded-lg text-sm font-medium transition-colors text-white">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        Dashboard & Aduan
                    </a>
                    <!-- Fitur tambahan (Placeholder) -->
                    <a href="#" class="flex items-center gap-3 px-4 py-3 hover:bg-indigo-800/30 rounded-lg text-sm font-medium transition-colors text-indigo-200 hover:text-white">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        Kelola Pengguna
                    </a>
                </nav>

                <!-- Footer Sidebar (User & Logout) -->
                <div class="p-4 border-t border-indigo-700/50">
                    <div class="flex items-center gap-3 px-4 py-2 mb-2">
                        <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-sm">{{ adminName.charAt(0) }}</div>
                        <div class="flex flex-col">
                            <span class="text-sm font-medium leading-none">{{ adminName }}</span>
                            <span class="text-[10px] text-indigo-300 mt-1 uppercase">Super Admin</span>
                        </div>
                    </div>
                    <button @click="logout" class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-lg text-sm font-medium transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Keluar
                    </button>
                </div>
            </aside>

            <!-- Overlay transparan untuk nutup sidebar di mobile -->
            <div v-if="isSidebarOpen" @click="isSidebarOpen = false" class="fixed inset-0 bg-gray-900/50 z-30 lg:hidden"></div>

            <!-- 2. KONTEN UTAMA KANAN -->
            <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
                
                <!-- Navbar Mobile Toggle -->
                <header class="h-16 flex items-center justify-between px-6 bg-surface border-b border-border lg:hidden">
                    <span class="font-heading font-bold text-admin">e-Report Admin</span>
                    <button @click="isSidebarOpen = true" class="text-text-secondary hover:text-admin">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </header>

                <!-- Scrollable Content -->
                <main class="flex-1 overflow-y-auto p-6 lg:p-8">
                    
                    <div class="mb-8">
                        <h1 class="text-2xl font-bold font-heading text-text-primary">Overview Pengaduan</h1>
                        <p class="text-text-secondary text-sm">Pantau dan kelola seluruh laporan yang masuk dari masyarakat.</p>
                    </div>

                    <!-- CARD STATISTIK -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                        <!-- Total -->
                        <div class="bg-surface p-5 rounded-[12px] border border-border shadow-soft flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-text-secondary">Total Aduan</p>
                                <p class="text-3xl font-bold font-heading text-text-primary mt-1">{{ statTotal }}</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div>
                        </div>
                        <!-- Baru (Pending) -->
                        <div class="bg-surface p-5 rounded-[12px] border border-cyan-200 shadow-soft flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-text-secondary">Aduan Baru</p>
                                <p class="text-3xl font-bold font-heading text-info mt-1">{{ statBaru }}</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center text-info"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                        </div>
                        <!-- Diproses -->
                        <div class="bg-surface p-5 rounded-[12px] border border-amber-200 shadow-soft flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-text-secondary">Diproses</p>
                                <p class="text-3xl font-bold font-heading text-warning mt-1">{{ statProses }}</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-warning"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div>
                        </div>
                        <!-- Selesai -->
                        <div class="bg-surface p-5 rounded-[12px] border border-green-200 shadow-soft flex items-center justify-between">
                            <div>
                                <p class="text-sm font-medium text-text-secondary">Selesai</p>
                                <p class="text-3xl font-bold font-heading text-success mt-1">{{ statSelesai }}</p>
                            </div>
                            <div class="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-success"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                        </div>
                    </div>

                    <!-- TABEL DATA -->
                    <div class="bg-surface rounded-[12px] shadow-soft border border-border overflow-hidden">
                        
                        <!-- Header Tabel (Search & Filter) -->
                        <div class="p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h2 class="font-heading font-bold text-lg text-text-primary">Daftar Laporan Masuk</h2>
                            
                            <div class="flex flex-col sm:flex-row gap-3">
                                <!-- Search -->
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    </div>
                                    <input v-model="searchQuery" type="text" class="pl-10 pr-4 py-2 bg-background border border-border rounded-[8px] focus:ring-2 focus:ring-admin focus:border-admin text-sm w-full sm:w-64" placeholder="Cari ID atau Judul...">
                                </div>
                                <!-- Filter Status -->
                                <select v-model="filterStatus" class="px-4 py-2 bg-background border border-border rounded-[8px] focus:ring-2 focus:ring-admin focus:border-admin text-sm outline-none">
                                    <option value="">Semua Status</option>
                                    <option value="pending">Baru (Pending)</option>
                                    <option value="in_progress">Diproses</option>
                                    <option value="resolved">Selesai</option>
                                    <option value="rejected">Ditolak</option>
                                </select>
                            </div>
                        </div>

                        <!-- Wrapper Tabel agar bisa di-scroll horizontal di layar kecil -->
                        <div class="overflow-x-auto">
                            <table class="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr class="bg-background/50 border-b border-border text-sm text-text-secondary">
                                        <th class="py-3 px-5 font-semibold">ID Laporan</th>
                                        <th class="py-3 px-5 font-semibold">Tanggal</th>
                                        <th class="py-3 px-5 font-semibold">Pelapor</th>
                                        <th class="py-3 px-5 font-semibold">Judul Aduan</th>
                                        <th class="py-3 px-5 font-semibold">Status</th>
                                        <th class="py-3 px-5 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in filteredLaporan" :key="item.id" class="border-b border-border hover:bg-gray-50/50 transition-colors">
                                        <td class="py-3 px-5 font-mono text-sm font-medium text-admin">{{ item.id }}</td>
                                        <td class="py-3 px-5 text-sm text-text-secondary">{{ item.date }}</td>
                                        <td class="py-3 px-5 text-sm font-medium text-text-primary">{{ item.pelapor }}</td>
                                        <td class="py-3 px-5 text-sm text-text-secondary max-w-xs truncate">{{ item.judul }}</td>
                                        <td class="py-3 px-5">
                                            <span :class="getStatusBadge(item.status)" class="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border">
                                                {{ translateStatus(item.status) }}
                                            </span>
                                        </td>
                                        <td class="py-3 px-5 flex justify-end gap-2">
                                            <!-- Tombol Ubah / Lihat -->
                                            <button @click="ubahStatus(item.id)" class="px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-md text-xs font-semibold transition border border-indigo-200">
                                                Tinjau & Edit
                                            </button>
                                            <!-- Tombol Hapus -->
                                            <button @click="hapusLaporan(item.id)" class="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-xs font-semibold transition border border-red-200">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                    <!-- Jika data filter kosong -->
                                    <tr v-if="filteredLaporan.length === 0">
                                        <td colspan="6" class="py-8 text-center text-text-secondary text-sm">
                                            Tidak ada laporan yang sesuai dengan pencarian/filter.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    `
};

// ========================================================
// 2. KONFIGURASI ROUTING & MIDDLEWARE
// ========================================================

const routes = [
    { path: '/', component: HomePublic },
    { path: '/login', component: LoginMasyarakat },
    { path: '/register', component: RegisterMasyarakat },
    { path: '/admin/login', component: LoginAdmin },
    
    // Rute yang dilindungi (Protected Routes)
    { 
        path: '/dashboard', 
        component: DashboardMasyarakat, 
        meta: { requiresAuth: true, role: 'masyarakat' } 
    },
    { 
        path: '/admin/dashboard', 
        component: DashboardAdmin, 
        meta: { requiresAuth: true, role: 'admin' } 
    }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

// Navigation Guard (Sistem Penjaga Gerbang)
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (to.meta.requiresAuth) {
        if (!token) {
            // Jika belum login, lempar ke halaman login yang sesuai
            return next(to.path.includes('/admin') ? '/admin/login' : '/login');
        }
        if (to.meta.role && to.meta.role !== userRole) {
            // Jika role tidak cocok (misal masyarakat mencoba buka dashboard admin)
            alert('Akses Ditolak: Anda tidak memiliki izin untuk halaman ini.');
            return next('/');
        }
    }
    next(); // Izinkan masuk
});

// ========================================================
// 3. INISIALISASI APLIKASI
// ========================================================

const app = Vue.createApp({});
app.use(router);
app.mount('#app');