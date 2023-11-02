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
  pagingPendingTaskMaintenance : {
    select: `SELECT id, member_id, member_name, gender, member_type_name, member_mail_address, member_email, pin FROM db_member`,
    count: `select count(*) from db_member`,
    orderby: "id asc",
    search: "",
    columns:[
        { id:"member_id", title: 'Member ID', sortable: false, align: 'left', type:"String", width: 200, column:"member_id" },
        { id:"member_name", title: 'Member Name', sortable: false, align: 'left', type:"String", width: 200, column:"member_name"},
        { id:"gender", title: 'Gender', sortable: false, align: 'left', type:"String", width: 200, column:"gender" },
        { id:"member_type_name", title: 'Member Type', sortable: false, align: 'left', type:"String", width: 200, column:"member_type_name" },
        { id:"member_mail_address", title: 'Member Mail Address', sortable: false, align: 'left', type:"String", width: 200, column:"member_mail_address" },
        { id:"member_email", title: 'Member Email', sortable: false, align: 'left', type:"String", width: 200, column:"member_email" },
        { id:"pin", title: 'PIN', sortable: false, align: 'left', type:"String", width: 200, column:"pin" }
        // { id:"action", title: 'Action', sortable: false, align: 'center', type:"Button", width: 100, components:['View','Process','Continue'] }
    ],
    filters:[
      { id:"member_id", column: "member_id"},
      { id:"member_name", column: "member_name"},
    ]
  },
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
