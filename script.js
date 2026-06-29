document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const pageOne = document.getElementById("page-one");
    const pageTwo = document.getElementById("page-two");
    const pageThree = document.getElementById("page-three");
    
    const startBtn = document.getElementById("startBtn");
    const bgMusic = document.getElementById("bgMusic");
    
    const lyric1 = document.getElementById("lyric-1");
    const lyric2 = document.getElementById("lyric-2");
    const lyric3 = document.getElementById("lyric-3");
    
    const envelope = document.getElementById("envelope");
    const letter = document.getElementById("letter");
    const letterFooter = document.getElementById("letter-footer");
    const envelopeWrapper = document.querySelector(".envelope-wrapper");

    // 1. SETUP BACKGROUND CANVAS PARTICLES (Hearts & Sparkles)
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    let particlesArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 12 + 4;
            this.speedY = Math.random() * 0.4 + 0.2; // Gerakan lambat dan tenang
            this.speedX = Math.sin(Math.random() * 2) * 0.2;
            this.type = Math.random() > 0.6 ? 'heart' : 'sparkle';
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.y -= this.speedY;
            this.x += this.speedX;
            if (this.y < -20) {
                this.y = canvas.height + 20;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = "#FFC1D6";
            if (this.type === 'heart') {
                ctx.beginPath();
                let topY = this.y - this.size / 2;
                ctx.moveTo(this.x, this.y);
                ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 2, this.x - this.size, topY, this.x - this.size, this.y - this.size * 0.75);
                ctx.bezierCurveTo(this.x - this.size, this.y - this.size * 1.3, this.x - this.size * 0.5, this.y - this.size * 1.5, this.x, this.y - this.size * 0.9);
                ctx.bezierCurveTo(this.x + this.size * 0.5, this.y - this.size * 1.5, this.x + this.size, this.y - this.size * 1.3, this.x + this.size, this.y - this.size * 0.75);
                ctx.bezierCurveTo(this.x + this.size, this.y - this.size / 2, this.x + this.size / 2, this.y - this.size / 2, this.x, this.y);
                ctx.closePath();
                ctx.fill();
            } else {
                // Draw Soft Sparkle
                ctx.fillStyle = "#FFF3E9";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size / 4, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function initParticles() {
        for (let i = 0; i < 40; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    initParticles();
    animateParticles();


    // 2. TIMING DAN PENGATURAN MUSIK & LIRIK
    // Catatan untuk pengguna: Atur lagu dipotong langsung dari bagian lirik "Tanpa banyak..." 
    // agar sinkronisasi detik di bawah ini langsung akurat sejak tombol ditekan.
    
    startBtn.addEventListener("click", () => {
        // Pindah Halaman Lembut (Fade Out Halaman 1)
        pageOne.classList.remove("active");
        pageOne.classList.add("hidden");
        
        // Putar Musik Otomatis dengan Volume Lembut (30%)
        bgMusic.volume = 0.3;
        bgMusic.play().catch(e => console.log("Audio play diblokir oleh browser, butuh interaksi user tambahan."));

        // Masuk Halaman 2 (Lirik) setelah Halaman 1 menghilang perlahan
        setTimeout(() => {
            pageTwo.classList.remove("hidden");
            pageTwo.classList.add("active");
            startLyricsTimeline();
        }, 2000);
    });

    function startLyricsTimeline() {
        // Detik 0: Lirik 1 sudah muncul otomatis karena kelas default

        // Detik 4: Sembunyikan Lirik 1, Munculkan Klimaks Lirik 2 (Blueberry & Pastry)
        setTimeout(() => {
            lyric1.classList.add("hidden-element");
            setTimeout(() => {
                lyric1.style.display = "none";
                lyric2.classList.remove("hidden-element");
                lyric2.classList.add("show-element");
            }, 1500);
        }, 4000);

        // Detik 11: Sembunyikan Lirik 2, Munculkan Lirik 3 (Toko Roti - Lebih Dramatis)
        setTimeout(() => {
            lyric2.classList.remove("show-element");
            lyric2.classList.add("hidden-element");
            
            setTimeout(() => {
                lyric2.style.display = "none";
                lyric3.classList.remove("hidden-element");
                lyric3.classList.add("show-element");
            }, 1500);
        }, 11000);

        // Detik 18: Hilangkan Semua Lirik, Alihkan ke Halaman 3 (Amplop Surat)
        setTimeout(() => {
            lyric3.classList.remove("show-element");
            lyric3.classList.add("hidden-element");

            setTimeout(() => {
                pageTwo.classList.remove("active");
                pageTwo.classList.add("hidden");

                // Transisi masuk ke Halaman 3 (Amplop)
                setTimeout(() => {
                    pageThree.classList.remove("hidden");
                    pageThree.classList.add("active");
                }, 1500);
            }, 2000);
        }, 18000);
    }


    // 3. LOGIKA INTERAKSI SURAT CINTA
    const fullText = "Kamu adalah blueberry yang membawa kemanisan, dan aku adalah pastry yang menjadi dasarnya. Kita adalah perpaduan rasa yang saling melengkapi dan menyeimbangkan. Saking lucunya, aku bahkan bermimpi ingin membangun sebuah toko roti kecil, menyatukan nama depanmu dan nama belakangku di pintunya.";
    let textIndex = 0;

    envelope.addEventListener("click", () => {
        // Jalankan animasi buka amplop
        envelope.classList.add("open-envelope");

        // Tampilkan Box Surat setelah amplop selesai meluncur keluar
        setTimeout(() => {
            envelope.style.display = "none";
            letter.classList.remove("hidden-element");
            letter.classList.add("show-element");
            
            // Efek Opsional: Kamera sedikit zoom-in fokus ke isi surat
            envelopeWrapper.classList.add("zoom-in-camera");
            
            // Mulai efek Typewriter setelah kertas terbuka sempurna
            setTimeout(typeWriterEffect, 1000);
        }, 1200);
    });

    function typeWriterEffect() {
        if (textIndex < fullText.length) {
            document.getElementById("typewriter-text").innerHTML += fullText.charAt(textIndex);
            textIndex++;
            // Durasi ketikan disesuaikan agar terasa tenang (55ms per karakter)
            setTimeout(typeWriterEffect, 55);
        } else {
            // Setelah selesai mengetik, munculkan penutup & ledakan partikel ekstra
            setTimeout(() => {
                letterFooter.classList.remove("hidden-element");
                letterFooter.classList.add("show-element");
                triggerSparkleBurst();
            }, 1000);
        }
    }

    // Efek Tambahan: Ledakan partikel kecil saat surat selesai diketik
    function triggerSparkleBurst() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                let p = new Particle();
                p.y = canvas.height / 2 + (Math.random() * 200 - 100);
                p.x = canvas.width / 2 + (Math.random() * 200 - 100);
                p.speedY = Math.random() * 2 - 1;
                p.speedX = Math.random() * 2 - 1;
                p.opacity = 0.8;
                particlesArray.push(p);
            }, i * 30);
        }
    }
});