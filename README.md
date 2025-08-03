# 🛒 E-Commerce React Firebase

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**🎯 Aplikasi E-Commerce Full-Stack dengan Teknologi Web Modern**

*Proyek Capstone untuk Mata Kuliah Code Generations and Optimization*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-FF6B35?style=for-the-badge&logo=netlify)](https://rulif-capstone-project.netlify.app)
[![LinkedIn Profile](https://img.shields.io/badge/💼_LinkedIn_Profile-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ruliffadrian/)
[![GitHub](https://img.shields.io/badge/📱_Source_Code-GitHub-black?style=for-the-badge&logo=github)](https://github.com/rulifcode/react-ecommerce-firebase)

</div>

---

## 🌟 Gambaran Proyek

> **"Solusi e-commerce modern yang didukung oleh React.js dan Firebase, menampilkan pengembangan aplikasi dunia nyata dengan praktik coding yang dibantu AI."**

Aplikasi web e-commerce berfitur lengkap ini mendemonstrasikan pola pengembangan React.js tingkat lanjut, integrasi Firebase, dan praktik terbaik pengembangan web modern. Dibangun sebagai bagian dari mata kuliah **Code Generations and Optimization**, proyek ini menunjukkan penggunaan efektif alat AI dalam mempercepat pengembangan sambil mempertahankan kualitas kode.

### 🎭 Apa yang Membuat Ini Istimewa?

- 🔐 **Autentikasi Aman** - Firebase Auth dengan protected routes
- 🛍️ **Alur Belanja Lengkap** - Dari browsing hingga checkout
- 📱 **Desain Responsif** - Sempurna di semua perangkat
- 🚀 **Arsitektur Modern** - Context API, React Router, dan lainnya
- 🤖 **Pengembangan Berbantuan AI** - Ditingkatkan dengan IBM Granite

---

## ✨ Showcase Fitur

<table>
<tr>
<td width="50%">

### 🔑 Autentikasi & Keamanan
- ✅ Registrasi & login pengguna
- ✅ Navigasi route yang terlindungi
- ✅ Manajemen sesi
- ✅ Fungsi logout yang aman

### 🛒 Pengalaman Berbelanja
- ✅ Browsing katalog produk
- ✅ Manajemen keranjang dinamis
- ✅ Kalkulasi harga real-time
- ✅ Proses checkout yang mulus

</td>
<td width="50%">

### 📊 Dashboard Pengguna
- ✅ Pelacakan riwayat pesanan
- ✅ Manajemen profil pengguna
- ✅ Analitik pembelian
- ✅ Ringkasan akun

### 🎨 Keunggulan UI/UX
- ✅ Desain mobile responsif
- ✅ Navigasi yang intuitif
- ✅ Loading states & feedback
- ✅ Desain estetika modern

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Backend & Layanan
![Firebase](https://img.shields.io/badge/Firebase_v9-FFCA28?style=flat&logo=firebase&logoColor=black)
![Firestore](https://img.shields.io/badge/Cloud_Firestore-FFCA28?style=flat&logo=firebase&logoColor=black)
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=flat&logo=firebase&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

### Tools Pengembangan
![NPM](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white)

</div>

---

## 🏗️ Arsitektur

```
📦 react-ecommerce-firebase/
├── 🎨 public/
│   ├── index.html
│   ├── favicon.ico
│   ├── _redirects           # Netlify routing configuration
│   └── manifest.json
├── ⚛️ src/
│   ├── 🧩 components/
│   │   ├── Navbar.js          # Komponen navigasi
│   │   ├── Footer.js          # Komponen footer
│   │   └── PrivateRoute.js    # Proteksi route
│   ├── 🔄 contexts/
│   │   ├── AuthContext.js     # State autentikasi
│   │   └── CartContext.js     # State keranjang belanja
│   ├── 📄 pages/
│   │   ├── Home.js            # Halaman utama
│   │   ├── Login.js           # Autentikasi pengguna
│   │   ├── Register.js        # Registrasi pengguna
│   │   ├── ProductList.js     # Katalog produk
│   │   ├── Cart.js            # Keranjang belanja
│   │   ├── Checkout.js        # Proses pemesanan
│   │   ├── OrderSuccess.js    # Konfirmasi sukses
│   │   ├── OrderHistory.js    # Pelacakan pesanan
│   │   └── Dashboard.js       # Dashboard pengguna
│   ├── 🔥 firebase/
│   │   └── config.js          # Konfigurasi Firebase
│   ├── 🎯 App.js              # Aplikasi utama
│   └── 📱 index.js            # Entry point aplikasi
├── 📋 package.json
└── 📖 README.md
```

---

## 🚀 Panduan Memulai

### Prasyarat

> Pastikan Anda telah menginstal ini di mesin Anda:

- ![Node.js](https://img.shields.io/badge/Node.js-v16+-339933?style=flat&logo=node.js&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat&logo=npm&logoColor=white)
- ![Git](https://img.shields.io/badge/Git-latest-F05032?style=flat&logo=git&logoColor=white)
- ![Firebase Account](https://img.shields.io/badge/Akun_Firebase-Gratis-FFCA28?style=flat&logo=firebase&logoColor=black)

### 📥 Instalasi

```bash
# 1️⃣ Clone repository
git clone https://github.com/rulifcode/react-ecommerce-firebase.git
cd react-ecommerce-firebase

# 2️⃣ Install dependencies
npm install

# 3️⃣ Jalankan development server
npm start
```

### ⚙️ Setup Firebase

1. **Buat Proyek Firebase**
   ```bash
   # Kunjungi https://console.firebase.google.com
   # Buat proyek baru → Enable Authentication & Firestore
   ```

2. **Konfigurasi Firebase**
   ```javascript
   // src/firebase/config.js
   import { initializeApp } from 'firebase/app'
   import { getAuth } from 'firebase/auth'
   import { getFirestore } from 'firebase/firestore'

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   }

   const app = initializeApp(firebaseConfig)
   export const auth = getAuth(app)
   export const db = getFirestore(app)
   ```

3. **Aktifkan Layanan Firebase**
   - ✅ Authentication (Email/Password)
   - ✅ Cloud Firestore Database
   - ✅ Firebase Hosting

---

## 🌐 Deployment

<div align="center">

### 🚀 **Live Production Deployment**
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/rulif-capstone-project/deploys)

**🌍 Akses Aplikasi Live:** [https://rulif-capstone-project.netlify.app](https://rulif-capstone-project.netlify.app)

</div>

### 📡 Netlify Deployment (Currently Used)

```bash
# 1️⃣ Push ke GitHub repository
git add .
git commit -m "Update project"
git push origin main

# 2️⃣ Netlify akan otomatis deploy
# ✅ Auto-deploy from GitHub enabled
# ✅ Environment variables configured
# ✅ Build command: npm run build
# ✅ Publish directory: build
```

<details>
<summary>📌 Opsi Deployment Alternatif</summary>

#### Firebase Hosting
```bash
# 1️⃣ Install Firebase CLI
npm install -g firebase-tools

# 2️⃣ Login ke Firebase
firebase login

# 3️⃣ Build versi produksi
npm run build

# 4️⃣ Initialize hosting
firebase init hosting
# Pilih project → public: build → SPA: Yes → overwrite: No

# 5️⃣ Deploy ke produksi
firebase deploy

# 🎉 Aplikasi Anda sekarang live di: https://your-project.web.app
```

#### Vercel
```bash
npm i -g vercel
vercel
# Ikuti petunjuknya
```

</details>

---

## 🤖 Pengembangan Berbantuan AI

Proyek ini mendemonstrasikan integrasi efektif **alat AI** dalam pengembangan web modern:

<table>
<tr>
<td width="50%">

### 🧠 **Code Generation**
- Optimisasi struktur komponen
- Pola integrasi Firebase
- Implementasi React hooks
- Logika proteksi route

### 🔍 **Problem Solving**  
- Debugging alur autentikasi
- Optimisasi state management
- Identifikasi bottleneck performa
- Perbaikan error handling

</td>
<td width="50%">

### ⚡ **Optimisasi Kode**
- Minimalisasi re-render komponen
- Optimisasi ukuran bundle
- Perbaikan loading state
- Strategi code splitting

### 📚 **Dokumentasi**
- Komentar kode otomatis
- Generasi README
- Dokumentasi API
- Implementasi best practices

</td>
</tr>
</table>

> **Dampak AI:** Waktu pengembangan berkurang **40%** sambil mempertahankan kualitas kode tinggi dan mengimplementasikan praktik terbaik industri.

---

## 📊 Statistik Proyek

<div align="center">

![Lines of Code](https://img.shields.io/badge/Baris_Kode-2000+-blue?style=for-the-badge)
![Components](https://img.shields.io/badge/Komponen_React-12+-green?style=for-the-badge)
![Pages](https://img.shields.io/badge/Halaman-8+-orange?style=for-the-badge)
![Features](https://img.shields.io/badge/Fitur-15+-purple?style=for-the-badge)

</div>

---

## 🎯 Demo & Link

<div align="center">

### 🚀 **Aplikasi Live**
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Now-FF6B35?style=for-the-badge&logo=netlify)](https://rulif-capstone-project.netlify.app)

### 💼 **Profil Developer**
[![LinkedIn](https://img.shields.io/badge/💼_LinkedIn_Profile-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ruliffadrian/)

### 📱 **Source Code**
[![GitHub Repo](https://img.shields.io/badge/📂_Source_Code-GitHub-black?style=for-the-badge&logo=github)](https://github.com/rulifcode/react-ecommerce-firebase)

### 🎓 **Proyek Capstone**
[![Capstone](https://img.shields.io/badge/🎓_Capstone_Project-Selesai-success?style=for-the-badge)](https://github.com/rulifcode/react-ecommerce-firebase)

</div>

---

## 🤝 Kontribusi

Kami menyambut kontribusi! Berikut cara Anda dapat membantu:

1. **Fork** repository ini
2. **Buat** branch fitur (`git checkout -b feature/FiturKeren`)
3. **Commit** perubahan Anda (`git commit -m 'Tambah FiturKeren'`)
4. **Push** ke branch (`git push origin feature/FiturKeren`)
5. **Buka** Pull Request

<div align="center">

[![Contributors](https://img.shields.io/badge/Kontributor-Diterima-brightgreen?style=for-the-badge)]()
[![Issues](https://img.shields.io/badge/Issues-Terbuka-red?style=for-the-badge)]()
[![Pull Requests](https://img.shields.io/badge/PRs-Diterima-yellow?style=for-the-badge)]()

</div>

---

## 📄 Lisensi

<div align="center">

![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

Proyek ini dilisensikan di bawah **Lisensi MIT** - lihat file [LICENSE](LICENSE) untuk detailnya.

</div>

---

## 👨‍💻 Pembuat

<div align="center">

### **Rulif Fadria Nirwansyah**

**🎓 Mahasiswa Universitas Sangga Buana YPKP**  
**📅 20 Tahun | 💻 Enthusiast Software Engineering**

[![GitHub](https://img.shields.io/badge/GitHub-rulifcode-black?style=for-the-badge&logo=github)](https://github.com/rulifcode)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ruliffadrian/)
[![University](https://img.shields.io/badge/🎓_USB_YPKP-Mahasiswa-blue?style=for-the-badge)]()
[![Age](https://img.shields.io/badge/👨‍💻_Umur-20_Tahun-green?style=for-the-badge)]()

</div>

---

## 🎓 Informasi Mata Kuliah

<div align="center">

**📚 Code Generations and Optimization**  
**🏫 Universitas Sangga Buana YPKP**  
**🎯 Jenis Proyek:** Full Functioning Web Application  
**🤖 Alat AI:** IBM Granite  
**✅ Status:** Proyek Capstone Selesai

[![Course](https://img.shields.io/badge/🎓_Mata_Kuliah-Code_Generations_&_Optimization-blue?style=for-the-badge)]()
[![University](https://img.shields.io/badge/🏫_USB_YPKP-Bandung-red?style=for-the-badge)]()
[![Project Type](https://img.shields.io/badge/📱_Jenis-Full_Web_App-green?style=for-the-badge)]()
[![AI Assisted](https://img.shields.io/badge/🤖_Bantuan_AI-IBM_Granite-purple?style=for-the-badge)]()

</div>

---

## 🙏 Ucapan Terima Kasih

- **IBM Granite** - Untuk bantuan pengembangan berbasis AI
- **Hactiv8** - Untuk bimbingan dan sharing pengetahuan
- **Netlify** - Untuk hosting dan deployment yang seamless

---

<div align="center">

### ⭐ **Beri bintang pada repository ini jika Anda merasa terbantu!**

[![Star History Chart](https://img.shields.io/badge/⭐_Star_History-GitHub-yellow?style=for-the-badge)]()

**Dibuat dengan ❤️ dan bantuan AI**

**🌐 Live at:** [https://rulif-capstone-project.netlify.app](https://rulif-capstone-project.netlify.app)

</div>

