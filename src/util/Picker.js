// pagingUser : nama pagging di awali dgn kata paging
// .select : Query untuk mendapatkan list data
// .count : Query untuk mendapatkan count data
// .orderby : Order default untuk pertama kali, bis di overwrite oleh ui
// .search : Multipe search column
// .column : Property data columns
// .filter : Filter mapping antara ui dgn db
// .columns.id : id dari column yang akan di gunakan untuk mendapat column, untuk kepentingan ordering
// .columns.title : Nama column table
// .columns.align : Sisi Menampilkan data (right, left, center)
// .columns.type : Tipe data untuk server paging secara default String, lakukan format di bagian query
// .columns.width : Ukuran width dari column kelipatan 50, terbesar adalah 500
// .columns.column : Colum yang akan di gunakan buat order by, ini tidak boleh ke bawa ke ui
// .columns.components: Untuk render table (edit, delete) so far hanya dukung edit dan delete

// Peging Mechanisme, untuk render table di ui
const pagings = {
};

// Mechanimes untuk render selectBox di ui
const dropdowns = {
};

// Harus terdapat id, code dan description
// Mechanimes untuk render popup component di ui
const popups = {
};

module.exports = {
  pagings, dropdowns, popups
};
