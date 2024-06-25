import { Fragment } from "react";

const Persiapan = () => {
  return (
    <Fragment>
      <section>
        <h2>## Apa Saja yang Perlu Disiapkan?</h2>
        <ul>
          <li>
            <ul>
            <span>Google</span>
              <li>Google Account</li>
              <li>Google Spreadsheet</li>
              <li>Dan Google Drive (jika ingin upload gambar)</li>
            </ul>
          </li>
          <li>
            <ul>
              <span>Script yang Ada di Website Ini!</span>
              <li>
                Script HTML (sebagai tampilan)
              </li>
              <li>Script JavaScript (yang ditempel pada spreadsheet kita)</li>
            </ul>
          </li>
        </ul>
      </section>
      <section>
        <h2>## Apa Saja yang Perlu Saya Edit Ketika Ingin Memasangnya?</h2>
      </section>
    </Fragment>
  );
};

export default Persiapan;
