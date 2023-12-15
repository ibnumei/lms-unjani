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
    select: `SELECT
      id,
      member_name,
      pin,
      tgl_join,
      CONCAT(
          CASE DAYOFWEEK(tgl_join)
            WHEN 1 THEN 'Minggu'
            WHEN 2 THEN 'Senin'
            WHEN 3 THEN 'Selasa'
            WHEN 4 THEN 'Rabu'
            WHEN 5 THEN 'Kamis'
            WHEN 6 THEN 'Jumat'
            WHEN 7 THEN 'Sabtu'
          END,
          ' - ',
          LPAD(DAY(tgl_join), 2, '0'), ' - ',
          LPAD(MONTH(tgl_join), 2, '0'), ' - ',
          YEAR(tgl_join)
        ) AS tanggalJoin,
        DATE_FORMAT(tgl_join,'%d %M %Y') AS tgl_join2
        FROM
      db_member`,
    count: `select count(*) from db_member`,
    orderby: "id asc",
    search: "",
    columns:[
        { id:"member_name", title: 'Member Name', sortable: false, align: 'left', type:"String", width: 200, column:"member_name"},
        { id:"pin", title: 'PIN', sortable: false, align: 'left', type:"String", width: 200, column:"pin" },
        { id:"tgl_join2", title: 'Tanggal Join', sortable: false, align: 'left', type:"String", width: 200, column:"tgl_join2" }
        // { id:"action", title: 'Action', sortable: false, align: 'center', type:"Button", width: 100, components:['View','Process','Continue'] }
    ],
    filters:[
      { id:"member_id", column: "member_id"},
      { id:"member_name", column: "member_name"}
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
          rent.location_order,
          DATE_FORMAT(rent.tgl_pinjam,'%d %M %Y') as tgl_pinjam_format,
          DATE_FORMAT(rent.tgl_kembali,'%d %M %Y') as tgl_kembali_format,
          CASE (rent.status_pinjam)
            WHEN 1 THEN 'Aktif'
            WHEN 0 THEN 'Done'
          END as status_pinjam_format
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
        { id:"title", title: 'Judul Buku', sortable: false, align: 'left', type:"String", width: 200, column:"book.title" },
        { id:"inventory_code", title: 'Inventory Code', sortable: false, align: 'left', type:"String", width: 200, column:"items.inventory_code" },
        { id:"tgl_pinjam_format", title: 'Tgl Pinjam', sortable: false, align: 'left', type:"String", width: 200, column:"tgl_pinjam_format" },
        { id:"tgl_kembali_format", title: 'Tgl Kembali', sortable: false, align: 'left', type:"String", width: 200, column:"tgl_kembali_format" },
        { id:"status_pinjam_format", title: 'Status Pinjam', sortable: false, align: 'left', type:"String", width: 200, column:"status_pinjam_format" },
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
  },
  pagingLatestRent : {
    select: `
    SELECT
      rent.kode_pinjam,
      rent.tgl_pinjam,
      rent.createdBy,
      CONCAT(
        CASE DAYOFWEEK(rent.tgl_pinjam)
          WHEN 1 THEN 'Minggu'
          WHEN 2 THEN 'Senin'
          WHEN 3 THEN 'Selasa'
          WHEN 4 THEN 'Rabu'
          WHEN 5 THEN 'Kamis'
          WHEN 6 THEN 'Jumat'
          WHEN 7 THEN 'Sabtu'
        END,
        ' - ',
        LPAD(DAY(rent.tgl_pinjam), 2, '0'), ' - ',
        LPAD(MONTH(rent.tgl_pinjam), 2, '0'), ' - ',
        YEAR(rent.tgl_pinjam)
      ) AS tanggalPinjam,
      GROUP_CONCAT(
        (SELECT book.title FROM db_book book WHERE book.id_book = rent.id_book )
        SEPARATOR ' & ') AS titles
    FROM
      db_rent rent
    GROUP BY
      rent.kode_pinjam, rent.tgl_pinjam, rent.createdBy`,
    count: `SELECT
      COUNT(DISTINCT kode_pinjam)
    FROM
      db_rent rent`,
    orderby: "rent.tgl_pinjam DESC",
    search: "",
    columns:[
        { id:"createdBy", title: 'Nama', sortable: false, align: 'left', type:"String", width: 200, column:"rent.kode_pinjam" },
        { id:"tanggalPinjam", title: 'Tanggal Pemimjaman', sortable: false, align: 'left', type:"String", width: 200, column:"rent.kode_pinjam" },
        { id:"titles", title: 'Nama Buku', sortable: false, align: 'left', type:"String", width: 200, column:"rent.kode_pinjam" },
    ],
    filters:[
    ]
  },
  pagingBebasPustaka : {
    select: `
      SELECT 
        id,
        member_id,
        member_name,
        bebas_pustaka,
        CASE
            WHEN bebas_pustaka = 1 THEN true
            ELSE false
        END AS  bebas_pustaka2,
        CASE
            WHEN bebas_pustaka = 1 THEN 'Bebas Pustaka'
            ELSE 'Ada Peminjaman'
        END AS status
        FROM
            db_member`,
    count: `SELECT COUNT(id) FROM db_member`,
    orderby: "id ASC",
    search: "",
    columns:[
      { id: 'checkbox', title: '', sortable: false, align: 'center', type: 'String', thStyle: { minWidth: '5px', border: '.5px solid #fff' }, width: 20, components: ['checkbox']},
      { id:"member_name", title: 'Member Name', sortable: false, align: 'left', type:"String", width: 200, column:"member_name" },
      { id:"status", title: 'Status Perpustakaan', sortable: false, align: 'left', type:"String", width: 200, column:"status" },
      { id: 'action', title: 'Action', sortable: false, align: 'center', type: 'Button', width: 200, components: ['detail'] }
    ],
    filters:[
      { id:"member_name", column: "member_name"},
      { id:"bebas_pustaka", column: "bebas_pustaka"}
    ]
  },
  pagingMemberRent : {
    select: `
    SELECT
      ROW_NUMBER() OVER () AS nomor,
      rent.id,
      rent.id_book,
      rent.id_member,
      rent.status_pinjam,
      (
        CASE 
          WHEN rent.status_pinjam = 0 THEN 'Sedang dipinjam'
          WHEN rent.status_pinjam = 1 THEN 'Sudah dikembalikan'
          ELSE ''
        END
      ) AS status_pinjam_deskripsi,
      book.title
    FROM db_rent rent
    INNER JOIN db_book book ON book.id_book = rent.id_book`,
    count: `select count(rent.id) FROM db_rent rent INNER JOIN db_book book ON book.id_book = rent.id_book`,
    orderby: "id DESC",
    search: "",
    columns:[
        { id:"nomor", title: 'No', sortable: false, align: 'left', type:"String", width: 200, column:"nomor"},
        { id:"title", title: 'Nama Buku', sortable: false, align: 'left', type:"String", width: 200, column:"title" },
        { id:"status_pinjam_deskripsi", title: 'Status', sortable: false, align: 'left', type:"String", width: 200, column:"tgl_join2" }
    ],
    filters:[
      { id:"id_member", column: "id_member"}
    ]
  }
};

// Mechanimes untuk render selectBox di ui
const dropdowns = {
  chartRent: {
    selectAll: `
      SELECT 
        months.month AS x,
        COALESCE(COUNT(rent.id), 0) AS y
      FROM 
          (SELECT 'Jan' AS month
          UNION SELECT 'Feb' AS month
          UNION SELECT 'Mar' AS month
          UNION SELECT 'Apr' AS month
          UNION SELECT 'May' AS month
          UNION SELECT 'Jun' AS month
          UNION SELECT 'Jul' AS month
          UNION SELECT 'Aug' AS month
          UNION SELECT 'Sep' AS month
          UNION SELECT 'Oct' AS month
          UNION SELECT 'Nov' AS month
          UNION SELECT 'Dec' AS month) AS months
      LEFT JOIN
      (
        SELECT *
        FROM db_rent 
        {where}
      ) rent ON DATE_FORMAT(rent.tgl_pinjam, '%b') = months.month 
      `,
    groupBy: 'months.month',
    custom: true,
    filters: [
      { id:"year", column: "YEAR(db_rent.tgl_pinjam)"},
    ]
  },
  chartMostBookRent: {
    selectAll: `
      SELECT
        book.title AS x ,
        COUNT(rent.id_book) AS y
      FROM db_rent rent
      INNER JOIN db_book book ON book.id_book = rent.id_book`,
    groupBy: 'rent.id_book, book.title',
    limit: '4',
    filters: [
      { id:"yearMonth", column: "DATE_FORMAT(rent.tgl_pinjam, '%Y-%m')"},
    ]
  },
  barChartMostUserRent: {
    selectAll:`
      SELECT 
        member.member_name AS x,
        COUNT(rent.id_member) AS y
      FROM db_rent rent
      INNER JOIN db_member member on member.id = rent.id_member`,
    groupBy: 'id_member',
    limit: 25,
    filters: [
      { id:"yearMonth", column: "DATE_FORMAT(rent.tgl_pinjam, '%Y-%m')"},
    ]
  },
  chartBookTransaction: {
    selectAll: `
      SELECT
        'Total Pemimjaman' AS x ,
        COUNT(rent.id) AS y
      FROM db_rent rent
      {where}
      UNION
      SELECT
        title.x AS x,
        COUNT(rents.id) AS y
      FROM (SELECT 'Total Pengembalian' AS x) AS title
      LEFT JOIN (
        SELECT * FROM
        db_rent rent
        {where}
      ) rents ON rents.status_pinjam = 0
      GROUP BY title.x`,
    custom: true,
    filters: [
      { id:"yearMonth", column: "DATE_FORMAT(rent.tgl_pinjam, '%Y-%m')"},
    ]
  },
  chartRentAndReturn: {
    selectAll: `
      SELECT
          months.month AS x,
          count(rent.id) AS y,
          COALESCE(SUM(CASE WHEN rent.status_pinjam = 0 THEN 1 ELSE 0 END), 0) AS y1,
          'Peminjaman,Pengembalian' AS labels
      FROM (
          SELECT 'Jan' AS month
          UNION SELECT 'Feb' AS month
          UNION SELECT 'Mar' AS month
          UNION SELECT 'Apr' AS month
          UNION SELECT 'May' AS month
          UNION SELECT 'Jun' AS month
          UNION SELECT 'Jul' AS month
          UNION SELECT 'Aug' AS month
          UNION SELECT 'Sep' AS month
          UNION SELECT 'Oct' AS month
          UNION SELECT 'Nov' AS month
          UNION SELECT 'Dec' AS month
      ) AS months
      LEFT JOIN (
          SELECT *
          FROM db_rent
          {where}
      ) rent ON DATE_FORMAT(rent.tgl_pinjam, '%b') = months.month 
      `,
    groupBy: 'months.month',
    custom: true,
    filters: [
      { id:"year", column: "YEAR(db_rent.tgl_pinjam)"},
    ]
  },
};

// Harus terdapat id, code dan description
// Mechanimes untuk render popup component di ui
const popups = {
};

module.exports = {
  pagings, dropdowns, popups
};
