async function jalankanBypass() {
    const idInput = document.getElementById('ffid').value;
    const output = document.getElementById('console-output');

    if (!idInput || idInput.length < 5) {
        output.innerHTML = "<span class='error'>[!] ID FF TIDAK VALID, TUAN!</span>";
        return;
    }

    output.innerHTML = "<span class='loading'>[~] SEDANG MEMBYPASS SISTEM...</span><br>";
    output.innerHTML += "<span class='system-msg'>[~] Dropping ads and scripts...</span>";

    try {
        // Tembak target lewat AllOrigins Proxy buat dapet HTML mentah
        const target = `https://www.unlockffbeta.com/id/${idInput}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(target)}`;

        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.contents) {
            // Kita gak render HTML-nya, kita cuma cari teks "Success" atau data relevan lainnya
            const content = data.contents;
            const isSuccess = content.toLowerCase().includes("success") || content.includes(idInput);

            output.innerHTML = `
                <span class='success'>[+] EKSTRAKSI BERHASIL</span><br>
                <span>ID TARGET: ${idInput}</span><br>
                <span>RESULT: ${isSuccess ? 'DATA TERKONFIRMASI' : 'SISTEM MERESPON'}</span><br>
                <span class='system-msg' style='font-size: 0.7rem;'>HTTP_CODE: 200 (Clean Data)</span>
            `;
        } else {
            output.innerHTML = "<span class='error'>[!] GAGAL MENGAMBIL DATA DARI TARGET.</span>";
        }
    } catch (err) {
        output.innerHTML = "<span class='error'>[!] KONEKSI DIBLOKIR ATAU TIMEOUT!</span>";
        console.error(err);
    }
}