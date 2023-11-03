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
  pagingMemberList : {
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
  pagingBookList : {
    select: `SELECT
        book.id_book,
        book.title,
        book.isbn_issn,
        book.publisher_name,
        book.publish_year,
        book.collation,
        items.item_code,
        items.inventory_code,
        items.stock,
        author.full_author
      FROM db_book book
        INNER JOIN db_items items on items.id_book = book.id_book
        INNER JOIN (
          SELECT id_book, GROUP_CONCAT(author_name  separator ', ') as full_author from db_author group by id_book
        ) as author on author.id_book = book.id_book`,
    count: `SELECT
        count(*)
        FROM db_book book
          INNER JOIN db_items items on items.id_book = book.id_book
          INNER JOIN (
            SELECT id_book, GROUP_CONCAT(author_name  separator ', ') as full_author from db_author group by id_book
          ) as author on author.id_book = book.id_book`,
    orderby: "book.id_book asc",
    search: "",
    columns:[
        { id:"title", title: 'Title Buku', sortable: false, align: 'left', type:"String", width: 200, column:"book.title" },
        { id:"isbn_issn", title: 'ISBN ISSN', sortable: false, align: 'left', type:"String", width: 200, column:"book.isbn_issn"},
        { id:"publisher_name", title: 'Publisher', sortable: false, align: 'left', type:"String", width: 200, column:"book.publisher_name" },
        { id:"publish_year", title: 'Publish Year', sortable: false, align: 'left', type:"String", width: 200, column:"book.publish_year" },
        { id:"collation", title: 'Collation', sortable: false, align: 'left', type:"String", width: 200, column:"book.collation" },
        { id:"item_code", title: 'Item Code', sortable: false, align: 'left', type:"String", width: 200, column:"items.item_code" },
        { id:"inventory_code", title: 'Inventory Code', sortable: false, align: 'left', type:"String", width: 200, column:"items.inventory_code" },
        { id:"stock", title: 'Stock', sortable: false, align: 'left', type:"String", width: 200, column:"items.stock" },
        { id:"full_author", title: 'Author', sortable: false, align: 'left', type:"String", width: 200, column:"author.full_author" }
    ],
    filters:[
      { id:"title", column: "book.title"},
      { id:"isbn_issn", column: "book.isbn_issn"},
      { id:"publisher_name", column: "book.publisher_name"},
      { id:"publish_year", column: "book.publish_year"},
      { id:"collation", column: "book.collation"},
      { id:"item_code", column: "items.item_code"},
      { id:"inventory_code", column: "items.inventory_code"},
      { id:"stock", column: "items.stock"},
      { id:"full_author", column: "author.full_author"}
    ]
  },
  pagingRentList : {
    select: `SELECT
        rent.id,
        rent.kode_pinjam,
        member.member_name,
        book.title,
        items.inventory_code,
        rent.tgl_pinjam,
        rent.tgl_kembali,
        rent.status_pinjam,
        rent.location_order
      FROM
        db_rent rent 
      INNER JOIN db_member member ON member.id = rent.id_member
      INNER JOIN db_book book ON book.id_book = rent.id_book
      INNER JOIN db_items items ON items.item_code = rent.id_item_stock`,
    count: `SELECT
        count(*)
      FROM
        db_rent rent 
      INNER JOIN db_member member ON member.id = rent.id_member
      INNER JOIN db_book book ON book.id_book = rent.id_book
      INNER JOIN db_items items ON items.item_code = rent.id_item_stock`,
    orderby: "rent.id asc",
    search: "",
    columns:[
        { id:"kode_pinjam", title: 'Kode Pinjam', sortable: false, align: 'left', type:"String", width: 200, column:"rent.kode_pinjam" },
        { id:"member_name", title: 'Member Name', sortable: false, align: 'left', type:"String", width: 200, column:"member.member_name"},
        { id:"title", title: 'Title Buku', sortable: false, align: 'left', type:"String", width: 200, column:"book.title" },
        { id:"inventory_code", title: 'Inventory Code', sortable: false, align: 'left', type:"String", width: 200, column:"items.inventory_code" },
        { id:"tgl_pinjam", title: 'Tgl Pinjam', sortable: false, align: 'left', type:"String", width: 200, column:"rent.tgl_pinjam" },
        { id:"tgl_kembali", title: 'Tgl Kembali', sortable: false, align: 'left', type:"String", width: 200, column:"rent.tgl_kembali" },
        { id:"status_pinjam", title: 'Status Pinjam', sortable: false, align: 'left', type:"String", width: 200, column:"rent.status_pinjam" },
        { id:"location_order", title: 'Location Order', sortable: false, align: 'left', type:"String", width: 200, column:"rent.location_order" }
    ],
    filters:[
      { id:"kode_pinjam", column: "rent.kode_pinjam"},
      { id:"member_name", column: "memberL.member_name"},
      { id:"title", column: "book.title"},
      { id:"inventory_code", column: "items.inventory_code"},
      { id:"tgl_pinjam", column: "rent.tgl_pinjam"},
      { id:"tgl_kembali", column: "rent.tgl_kembali"},
      { id:"status_pinjam", column: "rent.status_pinjam"},
      { id:"location_order", column: "rent.location_order"}
    ]
  }
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
