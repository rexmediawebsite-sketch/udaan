import fs from 'fs';
import https from 'https';

const downloads = [
  {
    name: 'still_frame_digital_archive',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ZDA2Y2MwOWU5NTIwMmE5OWVjYTljMDE0ZmZhEgsSBxCK4_m_ogYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NTk5MjA5MDY0Njc3MDk3NDE5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1XgogUcSJq__D1fV3jPuiWKsI2OWbXrMeUy52Gwjn-7iYDmqfvXWM7dqqaXen0Mi_rLgScKM6reOxL1HaaVZbJ9QZqmQhQZO-5jz_qN59Le09aviJym1v7ahZcIlTvbbNj7IhK7ojOGm3_4iGhUQVWfHowxfqCg3dCseR1_qYDA2GcWCEcFZLCvJM8ooz0LbOq4rpvzFl3TVKPtDtP3-RsoXTXZex8ZTB0S4KE5FMLNgk3HbLYlHEAEMcI'
  },
  {
    name: 'still_frame_smooth_slides_transition',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ZDA2ZDRjOTRiZjQwMWE2MDNmZmMyMTdlY2Q4EgsSBxCK4_m_ogYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NTk5MjA5MDY0Njc3MDk3NDE5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1XO6jExlayhGWRBLdH1ybPRaZgO7Hi9xA3oGV8bG1eu993B8mtr7B7Da-LQyj4g4k9LoLh0xQ5Dgsc2W5woO6e42r9BVjZIf7azzAELp_EiPdvVHErM9EjKjlKz7xGW5MZw63TkJcvgWDXfhQe_A3IY_gd-dbcMlR-t3jlYqGkZxGeXdaLtEhObVR396IG0VqNN7UOP_VI-s4qoeBct50m38M4Pacfj55Mqy4jbXtKl2RUqTxE6zVIKb4g'
  },
  {
    name: 'still_frame_smooth_digital_archive',
    html: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1ZDA2ZDdmN2IzMDUwN2M0ZGMxZDFiMmEzOWUwEgsSBxCK4_m_ogYYAZIBIwoKcHJvamVjdF9pZBIVQhM3NTk5MjA5MDY0Njc3MDk3NDE5&filename=&opi=89354086',
    img: 'https://lh3.googleusercontent.com/aida/AEtjO1WJ6chSaTiekg_wKp1pdDg-15wSgZ6HJ9o1Bu4-vLI1v7mcPzdD7L89Kp_QSdbZimkAOEt9vXRf7qlRT-wJh9unTr15Ggex-5XaNUolNj5YWv6sEeXNFiNiZwAlouN-MlzfsniODJK_TF54_gpNRuRaiQ5wJJ_kOUqeeBuT4c863O_OkezBzNjRnwFD60RpTRKz2-C995wPPFkmmBjuSYA-W29mHWIXrALfkRnlLkOB-zg07vg5aegwVlk'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const item of downloads) {
    console.log(`Processing ${item.name}...`);
    await downloadFile(item.html, `d:/udaan/stitch_assets/${item.name}.html`);
    await downloadFile(item.img, `d:/udaan/stitch_assets/${item.name}.png`);
  }
  console.log('All downloads completed!');
}

run();
