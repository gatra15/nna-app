import { defineStore } from "pinia";

export const useFolderStore = defineStore("folderStore", {
  state: () => ({
    folders: [
      {
        name: "Bukti Keuangan",
        children: [
          { name: "Rekening Koran" },
          { name: "Faktur Pajak" },
          { name: "Asuransi" },
        ],
      },
      {
        name: "Surat",
        children: [
          { name: "Surat Keputusan" },
          { name: "Surat Edaran" },
          { name: "Peraturan Pemerintah" },
          { name: "Peraturan Lainnya" },
          { name: "Surat Masuk" },
          { name: "Surat Keluar" },
        ],
      },
      {
        name: "Memo",
        children: [{ name: "Memo Masuk" }, { name: "Memo Keluar" }],
      },
      {
        name: "Perjanjian",
        children: [
          { name: "Berita Acara" },
          { name: "Kontrak/ Perjanjian Bersama" },
          { name: "Surat Perintah" },
        ],
      },
      {
        name: "Laporan",
        children: [
          { name: "Laporan SPT" },
          { name: "Laporan Manajemen" },
          { name: "Laporan Tahunan" },
          { name: "Laporan Aspraisal" },
          { name: "Laporan Keuangan" },
        ],
      },
      {
        name: "Risalah Rapat",
        children: [
          { name: "RUPS" },
          { name: "RUPS-LB" },
          { name: "BOC & BOD" },
        ],
      },
      {
        name: "Sertifikat",
        children: [{ name: "Tanah" }, { name: "Rumah" }, { name: "Kendaraan" }],
      },
    ],
  }),
  actions: {
    addFolder(newFolder) {
      this.folders.push(newFolder);
    },
  },
});
