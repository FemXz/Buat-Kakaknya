const WA_NUMBER = "6285771166153";
const IG_USERNAME = "rifiansyhfemas";
let noClickCount = 0;
let isPlayingKasih = false;
let isPlayingHappy = false;

const audioKasih = document.getElementById('audioKasih');
const audioHappy = document.getElementById('audioHappy');
const overlay = document.getElementById('start-overlay');
const startBtn = document.getElementById('start-btn');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const questionContent = document.getElementById('question-content');
const successContent = document.getElementById('success-content');
const mainQuestion = document.getElementById('main-question');
const subtitleText = document.getElementById('subtitle-text');

// Set volume
audioKasih.volume = 0.5;
audioHappy.volume = 0.5;

// Fungsi untuk memulai musik "kasih"
function startKasihMusic() {
  if (!isPlayingKasih) {
    audioKasih.currentTime = 0;
    // Menggunakan promise untuk menangani autoplay policy
    audioKasih.play().then(() => {
      isPlayingKasih = true;
    }).catch(err => {
      console.log('Autoplay blocked, waiting for user interaction:', err);
      // Jika autoplay diblokir, biarkan user klik tombol start
    });
  }
}

// Fungsi untuk menampilkan Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(function() {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// Fungsi untuk membuat Confetti
function createConfetti() {
  const emojis = ['🎉', '🎊', '😄', '🤣', '😎', '👍', '🙌', '✨', '💫', '🌟'];
  const container = document.querySelector('.container');
  // Hapus emoji float yang sudah ada agar tidak menumpuk
  document.querySelectorAll('.emoji-float').forEach(el => el.remove());

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'emoji-float';
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = Math.random() * 100 + '%';
      confetti.style.fontSize = (Math.random() * 2 + 1) + 'rem';
      confetti.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite`;
      confetti.style.animationDelay = Math.random() * 4 + 's';
      confetti.style.pointerEvents = 'none';
      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }, i * 40);
  }
}

// Event Listener untuk tombol "Mulai" di Overlay
startBtn.addEventListener('click', () => {
  startKasihMusic(); // Panggil fungsi musik utama
  overlay.classList.add('hidden'); // Sembunyikan overlay
});

// Event Listener untuk tombol "Iya Dong!"
btnYes.addEventListener('click', function() {
  showToast("Yeay! Sekarang kita temenan !! 🎉");
  
  // Hentikan lagu kasih
  audioKasih.pause();
  isPlayingKasih = false;
  
  // Mulai lagu happy
  audioHappy.currentTime = 0;
  audioHappy.play().catch(err => console.log('Happy music error:', err));
  isPlayingHappy = true;
  
  questionContent.classList.add('hidden');
  successContent.classList.remove('hidden'); // Gunakan remove('hidden') untuk menampilkan
  successContent.classList.add('visible');
  createConfetti();
});

// Event Listener untuk tombol "Gak Deh"
btnNo.addEventListener('click', function() {
  noClickCount++;
  
  // Pastikan tombol 'No' memiliki posisi 'relative' atau 'absolute' di CSS agar pergerakan berfungsi
  // Karena di CSS sudah ada 'position: relative' di .btn-no, kita bisa langsung atur posisi
  const container = document.querySelector('.container');
  const containerRect = container.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();

  // Hitung batas maksimum pergerakan di dalam container
  // Menggunakan offsetWidth/Height dari container untuk perhitungan yang lebih akurat
  const maxX = container.offsetWidth - btnNo.offsetWidth - 40; // 40px padding/margin
  const maxY = container.offsetHeight - btnNo.offsetHeight - 40;

  // Pastikan posisi absolut dihitung relatif terhadap container
  // Kita perlu mengubah posisi tombol menjadi 'absolute' dan parent 'container' menjadi 'relative'
  // Ini sudah dilakukan di CSS, tapi kita perlu pastikan tombol 'No' menggunakan 'position: absolute'
  btnNo.style.position = 'absolute';
  btnNo.style.transition = 'all 0.15s ease-out';
  
  // Generate posisi acak
  const randomX = Math.max(0, Math.random() * maxX);
  const randomY = Math.max(0, Math.random() * maxY);

  btnNo.style.left = randomX + 'px';
  btnNo.style.top = randomY + 'px';

  // Ubah teks tombol
  const noTextSpan = btnNo.querySelector('span');
  if (noClickCount === 1) {
    noTextSpan.textContent = 'Yakin gak? 🥺';
  } else if (noClickCount === 3) {
    noTextSpan.textContent = 'Coba lagi deh... 😢';
  } else if (noClickCount === 5) {
    noTextSpan.textContent = 'Aku sedih lho... 😭';
  } else if (noClickCount === 7) {
    noTextSpan.textContent = 'Pleaseeee! 🙏';
  } else if (noClickCount > 9) {
    btnNo.style.display = 'none';
    mainQuestion.textContent = 'Yah, kok gitu sih? 😢';
    subtitleText.textContent = 'Klik "Iya Dong!" aja ya! Dijamin seru! 🎉';
  }
});

// Panggil startKasihMusic() setelah user berinteraksi dengan overlay
// Ini menggantikan logic autoplay yang sering diblokir browser
// startKasihMusic(); // Dihapus karena sudah dipanggil di startBtn click
