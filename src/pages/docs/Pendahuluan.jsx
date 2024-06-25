import { Fragment } from "react";
import { ListGroup } from "react-bootstrap";

const Pendahuluan = () => {
  return (
    <Fragment>
      <section>
        <h2>## Apa Saja yang Dapat Dilakukan?</h2>
        <ul>
          <li>Menyimpan data interaksi dari website langsung ke spreadsheet</li>
          <li>Bahkan dapat menyimpan file gambar yang dapat disimpan di Google Drive</li>
        </ul>
      </section>
      <section>
        <h2>## Apa Saja yang Dapat Dibuat Dengannya?</h2>
        <small>Berikut adalah contoh ide yang dapat dilakukan!</small>
        <ul>
          <li>
            <span>Menyimpan data pendaftaran siswa, meliputi</span>
            <ul>
              <li>Nama</li>
              <li>Alamat</li>
              <li>Email</li>
              <li>Foto</li>
            </ul>
          </li>
          <li>Membuat fitur kritk dan saran</li>
        </ul>
      </section>
    </Fragment>
  );
};

export default Pendahuluan;
